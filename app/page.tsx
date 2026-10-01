import { Header } from "@/components/Header";
import {
  ApiFirst,
  BusinessModels,
  ConsoleSection,
  Ecosystem,
  FinalCta,
  Footer,
  Hero,
  HowItWorks,
  Problem,
  Product,
  Why,
} from "@/components/Sections";

export default function Home() {
  return (
    <>
      <Header />
      <main id="conteudo" tabIndex={-1}>
        <Hero />
        <Problem />
        <Product />
        <BusinessModels />
        <ApiFirst />
        <ConsoleSection />
        <Why />
        <HowItWorks />
        <Ecosystem />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
