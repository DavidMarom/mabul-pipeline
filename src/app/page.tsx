import { Navbar, Hero, Personas, DiscordBanner, Footer } from "@/components";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Personas />
        <DiscordBanner />
      </main>
      <Footer />
    </>
  );
}
