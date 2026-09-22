import { images, questions } from "@/data/site";

/** Stage 6: cream "Have any questions?" panel; the footer slides up over it at the very end. */
export default function Questions() {
  return (
    <section id="trayang-questions" className="questions-section">
      <div className="main-container">
        <div className="content-container">
          <h1>{questions.heading}</h1>
          <p>{questions.body}</p>
          <div className="button-container">
            <a href={questions.href} className="link-button">
              {questions.button}
            </a>
          </div>
        </div>
        <img alt="" src={images.question} loading="lazy" className="question-img" />
      </div>
    </section>
  );
}
