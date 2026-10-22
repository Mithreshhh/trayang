import Link from "next/link";
import { faq, questions } from "@/data/site";
import { InkLink, Pass, RegCorners } from "../Print";

/** Stage 6: cream sheet with the questions people ask first; the footer slides up over it at the very end. */
export default function Questions() {
  const preview = questions.preview.map((id) => faq.items.find((item) => item.id === id)).filter((item) => item !== undefined);

  return (
    <section id="trayang-questions" className="questions-section stock-cream">
      <RegCorners />
      <div className="main-container">
        <div className="content-container">
          <Pass as="h2" className="display">
            {questions.heading}
          </Pass>
          <p>{questions.body}</p>
          <InkLink href={questions.href} className="link-button">
            {questions.button}
          </InkLink>
        </div>

        <ul className="question-index">
          {preview.map((item) => (
            <li key={item.id}>
              <Link href={`/faq/#${item.id}`}>
                <span className="q">{item.q}</span>
                <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17 17 7M8 7h9v9" />
                </svg>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
