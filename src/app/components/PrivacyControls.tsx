"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/react";
import { PRIVACY_VERSION } from "@/lib/privacy";
import { PREFERENCE_KEY, parsePrivacyChoice, type PrivacyChoice } from "@/lib/privacy-preferences";

function readChoice(): PrivacyChoice | null {
  try { return parsePrivacyChoice(localStorage.getItem(PREFERENCE_KEY)); }
  catch { return null; }
}
export function CookieSettingsButton() {
  return <button type="button" className="underline cursor-pointer" onClick={() => window.dispatchEvent(new Event("privacy:open"))}>Configurar cookies</button>;
}
export default function PrivacyControls() {
  const [choice, setChoice] = useState<PrivacyChoice | null>(null);
  const [open, setOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    function sync() { const stored = readChoice(); setChoice(stored); setAnalytics(stored?.analytics ?? false); setOpen(!stored); }
    function show() { setAnalytics(readChoice()?.analytics ?? false); setOpen(true); }
    sync();
    window.addEventListener("privacy:open", show);
    window.addEventListener("storage", sync);
    const timer = window.setInterval(sync, 60_000);
    return () => { window.removeEventListener("privacy:open", show); window.removeEventListener("storage", sync); window.clearInterval(timer); };
  }, []);
  function save(enabled: boolean) {
    const next = { version: PRIVACY_VERSION, analytics: enabled, savedAt: Date.now() };
    try { localStorage.setItem(PREFERENCE_KEY, JSON.stringify(next)); }
    catch { setChoice(null); setError("No pudimos guardar tu elección. La analítica sigue desactivada. Permite almacenamiento local para guardar tus preferencias."); return; }
    // A full navigation also stops any analytics runtime loaded by a previous choice.
    window.location.reload();
  }
  return <>
    {choice?.analytics && <Analytics beforeSend={(event) => readChoice()?.analytics ? { ...event, url: event.url.split(/[?#]/)[0] } : null} />}
    {open && <section aria-label="Preferencias de privacidad" className="fixed bottom-0 inset-x-0 z-[1000] bg-white text-[#424242] border-t-4 border-[#880E4F] shadow-2xl p-5 sm:p-8 max-h-[85vh] overflow-y-auto">
      <div className="max-w-5xl mx-auto space-y-4">
        <h2 className="serif text-2xl font-bold">Tu privacidad, tu elección</h2>
        <p className="text-sm leading-relaxed">Guardamos tu elección en este navegador durante 180 días. Solo activamos la analítica opcional de Vercel si la autorizas. Rechazarla no limita el acceso. Puedes cambiar o retirar tu autorización desde el pie de página.</p>
        <p className="text-sm"><Link className="underline" href="/privacidad">Privacidad</Link> · <Link className="underline" href="/cookies">Cookies y almacenamiento</Link></p>
        <p className="text-sm">Necesarias: siempre activas para recordar esta elección y prestar el servicio.</p>
        <label className="flex gap-3 items-center text-sm"><input type="checkbox" checked={analytics} onChange={e => setAnalytics(e.target.checked)} className="h-5 w-5 accent-[#880E4F]" /> Analítica opcional: medición de visitas con Vercel, sin cookies de analítica.</label>
        <div className="flex flex-wrap gap-3">
          <button onClick={() => save(false)} className="border-2 border-[#880E4F] text-[#880E4F] px-5 py-3 font-semibold">Rechazar opcionales</button>
          <button onClick={() => save(true)} className="border-2 border-[#880E4F] text-[#880E4F] px-5 py-3 font-semibold">Aceptar opcionales</button>
          <button onClick={() => save(analytics)} className="bg-[#880E4F] text-white px-5 py-3 font-semibold">Guardar selección</button>
        </div>
        {choice && <button className="underline text-sm" onClick={() => setOpen(false)}>Cerrar sin cambiar</button>}
        {error && <p role="alert">{error}</p>}
      </div>
    </section>}
  </>;
}
