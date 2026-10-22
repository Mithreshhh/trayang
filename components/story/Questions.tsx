import { chapterLabel, faq, questions } from "@/data/site";
import FaqList from "../FaqList";
import { InkLink, Pass, RegCorners } from "../Print";

/** Chapter 6: the questions people ask first, answered in place. */
export default function Questions() {
  const preview = questions.preview.map((id) => faq.items.find((item) => item.id === id)).filter((item) => item !== undefined);

  return (
    <section id="questions" className="home-sheet questions-sheet stock-cream" aria-labelledby="questions-title">
      <RegCorners />
      <div className="sheet-inner questions-layout">
        <div className="questions-copy">
          <p className="label">{chapterLabel("questions")}</p>
          <Pass id="questions-title" className="display questions-title" reveal>
            {questions.heading}
          </Pass>
          <p>{questions.body}</p>
          <InkLink href={questions.href}>{questions.button}</InkLink>
        </div>
        <FaqList items={preview} level="h3" />
      </div>
    </section>
  );
}
