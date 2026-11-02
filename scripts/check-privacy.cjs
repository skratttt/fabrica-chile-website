// Verifica decisiones y API sin red ni correos reales.
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const ts = require('typescript');
function load(path, dependencies = {}) {
  const exports = {};
  const code = ts.transpileModule(fs.readFileSync(path, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true } }).outputText;
  vm.runInNewContext(code, { exports, require: name => {
    if (!(name in dependencies)) throw Error(`Dependencia no simulada: ${name}`);
    return dependencies[name];
  }, process: { env: {} }, console, Date });
  return exports;
}
const privacy = load('src/lib/privacy.ts');
const { parsePrivacyChoice, PREFERENCE_MAX_AGE } = load('src/lib/privacy-preferences.ts', { './privacy': privacy });
const now = Date.now();
for (const raw of [null, '{', '{}', JSON.stringify({ version: 'old', analytics: true, savedAt: now }), JSON.stringify({ version: privacy.PRIVACY_VERSION, analytics: 'true', savedAt: now }), JSON.stringify({ version: privacy.PRIVACY_VERSION, analytics: true, savedAt: now + 1 }), JSON.stringify({ version: privacy.PRIVACY_VERSION, analytics: true, savedAt: now - PREFERENCE_MAX_AGE })]) {
  assert.equal(parsePrivacyChoice(raw, now), null);
}
for (const analytics of [false, true]) assert.equal(parsePrivacyChoice(JSON.stringify({version: privacy.PRIVACY_VERSION, analytics, savedAt: now}), now).analytics, analytics);
let sends = [];
const api = load('src/app/api/contact/route.ts', {
  'next/server': { NextResponse: { json: (body, options) => ({body, status: options?.status || 200}) } },
  resend: { Resend: class { emails = { send: async value => { sends.push(value); return { data: {} }; } }; } },
  '@/lib/privacy': privacy,
  '@/emails/ContactEmail': { __esModule: true, default: props => props },
  '@/emails/AutoReplyEmail': { __esModule: true, default: props => props },
});
(async () => {
  const valid = { nombre:'Prueba', email:'prueba@example.com', mensaje:'Consulta', privacyConsent:true, privacyVersion:privacy.PRIVACY_VERSION };
  for (const body of [null, {...valid, privacyConsent:false}, {...valid, privacyConsent:'true'}, {...valid, privacyVersion:'old'}, {...valid, nombre:42}, {...valid, mensaje:' '.repeat(4)}, {...valid, mensaje:'x'.repeat(5001)}]) {
    assert.equal((await api.POST({ headers:new Headers(), json:async () => body })).status, 400);
  }
  assert.equal((await api.POST({ headers:new Headers({origin:'https://otro.example'}), json:async () => valid })).status, 403);
  assert.equal(sends.length, 0);
  assert.equal((await api.POST({ headers:new Headers({origin:'https://fabricachile.cl'}), json:async () => valid })).status, 200);
  assert.equal(sends.length, 1);
  assert.ok(sends[0].react.mensaje.includes(privacy.CONTACT_CONSENT_TEXT));
  assert.ok(sends[0].react.mensaje.includes(privacy.PRIVACY_VERSION));
  assert.ok(sends[0].react.mensaje.includes('seis meses después del cierre'));
  console.log('OK: preferencias inválidas/caducadas rechazadas, aceptación y rechazo válidos; API y evidencia verificadas sin red ni envíos reales.');
})().catch(error => { console.error(error); process.exitCode = 1; });
