import Navbar from "./Navbar";
import Footer from "./Footer";
export default function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return <><Navbar /><main className="bg-[#FAF9F6] text-[#424242] px-6 pt-36 pb-24"><article className="max-w-3xl mx-auto space-y-6 leading-relaxed [&_h2]:text-xl [&_h2]:font-semibold [&_a]:underline"><h1 className="serif text-4xl text-[#880E4F] font-bold">{title}</h1><p>Versión: 1 de noviembre de 2026.</p>{children}</article></main><Footer /></>;
}
