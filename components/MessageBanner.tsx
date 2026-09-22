import { bannerMessage } from "@/data/site";

/** Cream promo strip under the navbar. Visible for 9 s, then fades out (CSS animation). */
export default function MessageBanner() {
  return (
    <div className="message-banner element-fade-out" role="status">
      <p className="message">{bannerMessage}</p>
    </div>
  );
}
