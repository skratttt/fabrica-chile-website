'use client';

import Image from 'next/image';
import { useReducedMotion } from 'framer-motion';
import { AnimatedPageTitle, AnimatedWord } from '@/app/components/AnimatedTitle';
import { FadeInScroll } from '@/app/components/FadeInScroll';
import HeroPixelTrail from '@/app/components/HeroPixelTrail';

export default function EcosystemHero() {
  const reducedMotion = useReducedMotion();
  const brand = <div className="flex items-center gap-3 mb-8"><div className="w-10 h-px bg-[#F48FB1]" /><span className="text-[#F48FB1] text-xs tracking-[0.35em] uppercase font-medium">Fábrica Chile</span></div>;
  const description = <><p className="text-[#F5F5F5]/60 text-lg max-w-xl leading-relaxed">Evaluación presidencial, fuente por fuente. Una mirada a las mediciones y a cómo cambian en el tiempo.</p><p className="text-[#F5F5F5]/60 text-xs leading-relaxed mt-6">Matriz de origen: 02-11-2026 · 126 mediciones · 5 encuestadoras<br />Última medición registrada: 01-11-2026 · Sin actualización automática</p></>;

  return <header className="min-h-[60vh] bg-[#880E4F] flex flex-col justify-end pt-32 pb-20 px-6 relative">
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="absolute left-0 top-0 w-1 h-full bg-[#D81B60]" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.05]" style={{ width:'clamp(16rem, 38vw, 38rem)', height:'clamp(16rem, 38vw, 38rem)' }}>
        <Image src="/assets/gear.png" alt="" fill sizes="(max-width: 768px) 100vw, 38vw" className="object-contain object-left -scale-x-100" />
      </div>
    </div>
    {!reducedMotion && <HeroPixelTrail />}
    <div className="max-w-7xl mx-auto w-full relative z-10 pl-4 pointer-events-none">
      {reducedMotion ? brand : <FadeInScroll direction="right" delay={0.1}>{brand}</FadeInScroll>}
      {reducedMotion ? <h1 className="serif font-bold text-[#F5F5F5] leading-[1.08] mb-6" style={{fontSize:'clamp(2.5rem, 6vw, 5.5rem)'}}>El pulso de la<br /><span className="text-[#F48FB1]">opinión pública.</span></h1> : <AnimatedPageTitle className="serif font-bold text-[#F5F5F5] leading-[1.08] mb-6" scrollFade>
        <div className="overflow-hidden" style={{fontSize:'clamp(2.5rem, 6vw, 5.5rem)'}}><AnimatedWord>El</AnimatedWord>{' '}<AnimatedWord>pulso</AnimatedWord>{' '}<AnimatedWord>de</AnimatedWord>{' '}<AnimatedWord>la</AnimatedWord></div>
        <div className="overflow-hidden" style={{fontSize:'clamp(2.5rem, 6vw, 5.5rem)'}}><AnimatedWord className="text-[#F48FB1]">opinión</AnimatedWord>{' '}<AnimatedWord className="text-[#F48FB1]">pública.</AnimatedWord></div>
      </AnimatedPageTitle>}
      {reducedMotion ? description : <FadeInScroll delay={0.6}>{description}</FadeInScroll>}
    </div>
  </header>;
}
