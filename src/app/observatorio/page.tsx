import type { Metadata } from 'next';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import Observatory from './Observatory';
import EcosystemHero from '@/app/ecosistema/EcosystemHero';
import './observatorio.css';

export const metadata: Metadata = {
  title: 'Ecosistema | Fábrica Chile',
  description: 'Mediciones de cinco encuestadoras, promedios con vigencia de 30 días y variaciones. Matriz de origen del 02-11-2026.',
};
export default function Page() {
  return <><Navbar /><main className="observatory"><EcosystemHero /><Observatory /></main><Footer /></>;
}
