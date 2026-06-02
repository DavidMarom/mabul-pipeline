import { Navbar, Hero, Personas, Footer } from "@/components";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Personas />
      </main>
      <Footer />
    </>
  );
}
