import { Hero } from "@/components/hero";
import { Header } from "@/components/header";
import { WorkSection } from "@/components/work-section";
import { ContactForm } from "@/components/contact-form";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      
      <WorkSection 
        id="film"
        title="Filmmaking"
        description="Crafting compelling visual stories through the lens"
        type="film"
      />
      
      <ContactForm />
    </div>
  );
}
