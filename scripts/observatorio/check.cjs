// Run with: node scripts/observatorio/check.cjs [path/to/FabricaChile_codigo_original.zip]
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');
const filename = path.resolve('src/lib/observatorio/model.ts');
const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true, resolveJsonModule: true } });
const mod = new Module(filename, module); mod.filename = filename; mod.paths = module.paths; mod._compile(compiled.outputText, filename);
const m = mod.exports;
let checks = 0;
function check(fn) { fn(); checks++; }
check(() => assert.deepEqual(m.surveys.map(s => s.data.length), [65, 34, 13, 8, 6]));
check(() => assert.equal(m.surveys.flatMap(s => s.data).length, 126));
check(() => assert.deepEqual(m.interval('2026-11-01', '15'), {start:'2026-10-18',end:'2026-11-01'}));
for (const period of ['15', '30', '90', 'all']) check(() => {
 const {start,end} = m.interval('2026-11-01', period);
 assert.equal(end, '2026-11-01');
 assert.equal(start, period === 'all' ? m.FIRST_DATE : m.shift(end, 1 - Number(period)));
});
const fixture = [{id:'a',name:'A',data:[['2026-09-30',1,2,3],['2026-10-01',20,null,0],['2026-10-30',90,8,2],['2026-11-01',99,1,0]]}, {id:'b',name:'B',data:[['2026-10-01',40,50,null]]}];
check(() => { const a=m.average('2026-10-30',fixture); assert.deepEqual(a.values,[65,29,2]); assert.deepEqual(a.counts,[2,2,1]); });
check(() => { const a=m.average('2026-10-31',fixture); assert.deepEqual(a.values,[90,8,2]); assert.equal(a.excluded[0].survey.id,'b'); });
check(() => assert.deepEqual(m.average('2026-09-01',fixture).values,[null,null,null]));
check(() => assert.deepEqual(m.average('2026-11-01').values,[24.525,64.875,10.625]));
check(() => assert.equal(m.average('2026-11-01').excluded[0].survey.id,'panel'));
// Independent oracle over every day: inclusive string bounds, latest per source, never future data.
for(let d=m.FIRST_DATE;d<=m.MATRIX_DATE;d=m.shift(d,1)) check(() => {
 const start=m.shift(d,-29);
 const points=m.surveys.map(s=>s.data.filter(p=>p[0]>=start&&p[0]<=d).at(-1)).filter(Boolean);
 const expected=[1,2,3].map(i=>{const vals=points.map(p=>p[i]).filter(v=>v!==null);return vals.length?vals.reduce((a,b)=>a+b,0)/vals.length:null;});
 assert.deepEqual(m.average(d).values,expected);
});
check(() => {const h=m.history('2026-10-18','2026-11-01');assert.equal(h.length,15);for(const p of h) assert.deepEqual(p.slice(1),m.average(p[0]).values);});
check(() => assert.deepEqual(m.variation(m.surveys[0], '2026-03-17').deltas,[0,2,-2]));
check(() => assert.equal(m.variation(m.surveys[0], '2026-03-13').previous,undefined));
check(() => assert.equal(m.variation(m.surveys[4], '2026-11-01').stale,true));
check(() => assert.deepEqual([m.deltaLabel(2),m.deltaLabel(-1.5),m.deltaLabel(0),m.deltaLabel(null)],['↑ +2,0 pp','↓ −1,5 pp','— 0,0 pp','Sin dato para comparar']));
check(() => assert.equal(m.variation(m.surveys[0], '2026-11-01').previous[0], '2026-10-25'));
check(() => {const csv=m.csv(m.surveys.map(s=>s.id),'2026-11-01'); assert.equal(csv.split('\r\n').length,127);assert(csv.includes('22,1;67,5;10,5'));});
check(() => assert.equal(m.csv(['cadem'],'2026-03-13').split('\r\n').length,2));
if (process.argv[2]) {
 const {execFileSync}=require('node:child_process');
 for (const [name,dest] of [['measurements.json','src/lib/observatorio'],['workbook_averages.json','public/observatorio'],['MATRIZ_actualizada_02-11-2026.xlsx','public/observatorio']]) check(()=> assert.deepEqual(fs.readFileSync(`${dest}/${name}`),execFileSync('unzip',['-p',process.argv[2],`FabricaChile/dist/${name}`],{maxBuffer:1024*1024})));
}
// Render the actual React chart: all five sources must share one SVG.
const chartFile = path.resolve('src/app/observatorio/Chart.tsx');
const chartModule = new Module(chartFile, module); chartModule.filename = chartFile; chartModule.paths = module.paths;
const appearanceFile=path.resolve('src/lib/observatorio/appearance.ts');
const appearanceModule=new Module(appearanceFile,module);appearanceModule._compile(ts.transpileModule(fs.readFileSync(appearanceFile,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText,appearanceFile);
const deltaFile=path.resolve('src/app/observatorio/Delta.tsx');
const deltaModule=new Module(deltaFile,module);deltaModule.paths=module.paths;deltaModule.require=name=>name==='@/lib/observatorio/model'?m:require(name);
deltaModule._compile(ts.transpileModule(fs.readFileSync(deltaFile,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX}}).outputText,deltaFile);
chartModule.require = name => name === './Delta' ? deltaModule.exports : name === '@/lib/observatorio/model' ? m : name === '@/lib/observatorio/appearance' ? appearanceModule.exports : require(name);
chartModule._compile(ts.transpileModule(fs.readFileSync(chartFile, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText, chartFile);
const React = require('react');
const render = require('react-dom/server').renderToStaticMarkup;
const chartProps = { series:m.surveys.map((s,i)=>({...s,marker:i})),start:'2026-10-18',end:'2026-11-01',visible:[true,true,true] };
check(()=>{const html=render(React.createElement(chartModule.exports.default,chartProps));assert.equal((html.match(/<svg /g)||[]).length,1);for(const s of m.surveys)assert(html.includes(s.name));for(const survey of m.surveys)assert(html.includes(appearanceModule.exports.sourceColors[survey.id]));assert(!html.includes('obs-inspector'));assert(html.includes('Recorre las fechas'));});
check(()=>{const html=render(React.createElement(chartModule.exports.default,{...chartProps,series:[]}));assert(html.includes('Selecciona una encuestadora'));});
check(()=>{const html=render(React.createElement(chartModule.exports.default,{...chartProps,visible:[false,false,false]}));assert(html.includes('Active al menos un indicador'));});
const viewFile=path.resolve('src/app/observatorio/Observatory.tsx');
const viewModule=new Module(viewFile,module);viewModule.filename=viewFile;viewModule.paths=module.paths;
viewModule.require=name=>name==='./Chart'?chartModule.exports:chartModule.require(name);
viewModule._compile(ts.transpileModule(fs.readFileSync(viewFile,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true}}).outputText,viewFile);
check(()=>{const html=render(React.createElement(viewModule.exports.default));assert.equal((html.match(/<figure /g)||[]).length,1);assert(html.includes('Indicadores visibles'));assert(html.includes('Una mirada, todas las fuentes.'));assert(html.includes('stroke-dasharray="9 4"'));assert(html.includes('stroke-dasharray="2 5"'));assert(!html.includes('download='));assert(!html.includes('Diferencias con el demo'));assert(!html.includes('Método y fuentes'));assert(html.includes('Fuentes'));});
check(()=>{const html=render(React.createElement(chartModule.exports.default,{...chartProps,series:chartProps.series.filter(s=>s.id==='cadem'),legendSeries:chartProps.series,selectedIds:['cadem'],onToggleSource:()=>{}}));for(const survey of m.surveys)assert(html.includes(survey.name));assert(html.includes('aria-label="Ocultar Cadem"'));assert(html.includes('aria-label="Mostrar Criteria"'));assert.equal((html.match(/obs-legend-toggle is-off/g)||[]).length,4);assert.equal((html.match(/obs-legend-toggle is-on/g)||[]).length,1);});
console.log(`${checks} comprobaciones correctas: integridad, ventanas, historia sin futuro, faltantes, variaciones y CSV.`);
