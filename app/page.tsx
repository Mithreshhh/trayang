import Preloader from "@/components/Preloader";
import TrayangScroller from "@/components/TrayangScroller";

export default function Home() {
  return (
    <>
      <Preloader />
      <main id="trayang-app-home" className="trayang-app">
        <TrayangScroller />
      </main>
    </>
  );
}
