import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import ChapterRail from "@/components/story/ChapterRail";
import Hero from "@/components/story/Hero";
import Purpose from "@/components/story/Purpose";
import Approach from "@/components/story/Approach";
import Capabilities from "@/components/story/Capabilities";
import Touchpoints from "@/components/story/Touchpoints";
import Questions from "@/components/story/Questions";

/** The home page: one sheet of stock per chapter, stacked down an ordinary scrolling page. */
export default function Home() {
  return (
    <>
      <Preloader />
      <div className="home">
        <Navbar />
        <main id="main">
          <Hero />
          <Purpose />
          <Approach />
          <Capabilities />
          <Touchpoints />
          <Questions />
        </main>
        <Footer />
        <ChapterRail />
        <Reveal />
      </div>
    </>
  );
}
