"use client";

import { useId, useState } from "react";
import { contact, enquiry } from "@/data/site";
import { Diamond } from "./Print";

type Errors = Partial<Record<"name" | "email" | "goal", string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Enquiry form with no backend: on submit it composes a ready-to-send email to
 * Trayang in the visitor's own mail app.
 */
export default function EnquiryForm() {
  const id = useId();
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (key: string) => String(data.get(key) ?? "").trim();
    const next: Errors = {};
    if (!get("name")) next.name = "Add your name so we know who to reply to.";
    if (!get("email")) next.email = "Add an email address so we can reply.";
    else if (!EMAIL.test(get("email"))) next.email = "That email address looks incomplete. Check it and try again.";
    if (!get("goal")) next.goal = "Tell us a little about what you're working towards.";
    setErrors(next);
    if (Object.keys(next).length) {
      const first = Object.keys(next)[0];
      e.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    const support = data.getAll("support").map(String);
    const details = [
      `Name: ${get("name")}`,
      `Email: ${get("email")}`,
      get("company") && `Business or idea: ${get("company")}`,
      support.length > 0 && `Support needed: ${support.join(", ")}`,
      get("timeline") && `Timeline: ${get("timeline")}`,
      get("budget") && `Approximate budget: ${get("budget")}`,
      get("link") && `Website or social profile: ${get("link")}`,
    ].filter(Boolean);
    const body = `${details.join("\n")}\n\n${get("goal")}`;
    const subject = `Enquiry from ${get("name")}${get("company") ? ` · ${get("company")}` : ""}`;
    setSent(body);
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  async function copy() {
    if (!sent) return;
    try {
      await navigator.clipboard.writeText(sent);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  const field = (name: keyof Errors) => ({
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${id}-${name}-error` : undefined,
  });

  return (
    <form className="enquiry" onSubmit={onSubmit} noValidate>
      <div className="enquiry-row two">
        <label className="fieldset">
          <span className="label">Your name</span>
          <input name="name" autoComplete="name" required {...field("name")} />
          {errors.name && <span className="field-error" id={`${id}-name-error`}>{errors.name}</span>}
        </label>
        <label className="fieldset">
          <span className="label">Email</span>
          <input name="email" type="email" autoComplete="email" inputMode="email" required {...field("email")} />
          {errors.email && <span className="field-error" id={`${id}-email-error`}>{errors.email}</span>}
        </label>
      </div>

      <label className="fieldset">
        <span className="label">Business or idea</span>
        <input name="company" autoComplete="organization" placeholder="Company name, or the idea you're developing" />
      </label>

      <fieldset className="fieldset">
        <legend className="label">Support you&apos;re looking for</legend>
        <div className="chips">
          {enquiry.support.map((s) => (
            <label className="chip" key={s}>
              <input type="checkbox" name="support" value={s} />
              <span>{s}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="enquiry-row two">
        <label className="fieldset">
          <span className="label">Timeline</span>
          <span className="select">
            <select name="timeline" defaultValue="">
              <option value="">Choose one</option>
              {enquiry.timelines.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </span>
        </label>
        <label className="fieldset">
          <span className="label">Approximate budget</span>
          <input name="budget" placeholder="A rough range is fine" />
        </label>
      </div>

      <label className="fieldset">
        <span className="label">Website or social profile</span>
        <input name="link" type="url" inputMode="url" placeholder="https://" />
      </label>

      <label className="fieldset">
        <span className="label">What are you working towards?</span>
        <textarea name="goal" rows={5} required placeholder="Your goal, the challenge you're facing, or what you'd like to create" {...field("goal")} />
        {errors.goal && <span className="field-error" id={`${id}-goal-error`}>{errors.goal}</span>}
      </label>

      <div className="enquiry-submit">
        <button type="submit" className="ink-btn ink-btn-solid">
          <Diamond />
          <span>Send enquiry</span>
          <Diamond />
        </button>
        <p className="enquiry-note">Opens your email app with everything filled in, addressed to {contact.email}.</p>
      </div>

      <div className="enquiry-status" role="status" aria-live="polite">
        {sent && (
          <p>
            Your enquiry is ready in your email app. If nothing opened, email{" "}
            <a href={`mailto:${contact.email}`}>{contact.email}</a> or{" "}
            <button type="button" className="text-btn" onClick={copy}>
              {copied ? "copied to clipboard" : "copy your enquiry"}
            </button>
            .
          </p>
        )}
      </div>
    </form>
  );
}
