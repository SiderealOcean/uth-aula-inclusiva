import PhaseIndicator from "@/components/layout/PhaseIndicator";
import HeroSection from "@/components/sections/HeroSection";
import ContextoSection from "@/components/sections/ContextoSection";
import SolucionSection from "@/components/sections/SolucionSection";
import DemoWhatsAppSection from "@/components/sections/DemoWhatsAppSection";
import DemoLMSSection from "@/components/sections/DemoLMSSection";
import CreacionIASection from "@/components/sections/CreacionIASection";
import AccesibilidadSection from "@/components/sections/AccesibilidadSection";
import GobernanzaSection from "@/components/sections/GobernanzaSection";
import ActoresSection from "@/components/sections/ActoresSection";
import ViabilidadSection from "@/components/sections/ViabilidadSection";
import CierreSection from "@/components/sections/CierreSection";

export default function Home() {
  return (
    <>
      <PhaseIndicator />

      {/* Fase 01 */}
      <HeroSection />
      <ContextoSection />

      {/* Fase 02 */}
      <SolucionSection />
      <DemoLMSSection />
      <DemoWhatsAppSection />
      <CreacionIASection />

      {/* Fase 03 */}
      <AccesibilidadSection />
      <GobernanzaSection />
      <ActoresSection />

      {/* Fase 04 */}
      <ViabilidadSection />

      {/* Fase 05 */}
      <CierreSection />
    </>
  );
}
