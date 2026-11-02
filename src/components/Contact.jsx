import { useState } from "react";
import emailjs from "@emailjs/browser";
import { profile, channels, projectTypes, budgets, timelines } from "../data";
import { Availability } from "./ui";

const env = import.meta.env;
const web3formsKey = env.VITE_WEB3FORMS_KEY;
const emailjsReady =
  env.VITE_APP_EMAILJS_SERVICE_ID && env.VITE_APP_EMAILJS_TEMPLATE_ID && env.VITE_APP_EMAILJS_PUBLIC_KEY;

const empty = {
  name: "",
  email: "",
  company: "",
  type: projectTypes[0],
  budget: budgets[0],
  timeline: timelines[timelines.length - 1],
  message: "",
  botcheck: "",
};

/** One readable block, so any mail template shows every field. */
function compose(f) {
  return [
    `Project type: ${f.type}`,
    `Budget: ${f.budget}`,
    `Timeline: ${f.timeline}`,
    f.company ? `Company: ${f.company}` : null,
    "",
    f.message,
  ]
    .filter((l) => l !== null)
    .join("\n");
}

async function viaWeb3Forms(f) {
  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: web3formsKey,
      subject: `New project enquiry from ${f.name}`,
      from_name: "Portfolio enquiry",
      name: f.name,
      email: f.email,
      replyto: f.email,
      message: compose(f),
      botcheck: f.botcheck,
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.success) throw new Error(data.message || `Web3Forms ${res.status}`);
}

async function viaEmailJS(f) {
  await emailjs.send(
    env.VITE_APP_EMAILJS_SERVICE_ID,
    env.VITE_APP_EMAILJS_TEMPLATE_ID,
    {
      from_name: f.name,
      to_name: "Ashish",
      from_email: f.email,
      to_email: profile.email,
      message: compose(f),
    },
    env.VITE_APP_EMAILJS_PUBLIC_KEY
  );
}

/** Configured senders, most reliable first. */
const senders = [
  web3formsKey && ["Web3Forms", viaWeb3Forms],
  emailjsReady && ["EmailJS", viaEmailJS],
].filter(Boolean);

const TIMEOUT_MS = 15000;
const withTimeout = (p) =>
  Promise.race([p, new Promise((_, rej) => setTimeout(() => rej(new Error("timed out")), TIMEOUT_MS))]);

/** Tries each sender until one succeeds. */
async function send(f) {
  if (!senders.length) throw new Error("No mail service configured");
  const errors = [];
  for (const [name, fn] of senders) {
    try {
      await withTimeout(fn(f));
      return;
    } catch (err) {
      errors.push(`${name}: ${err?.text ?? err?.message ?? err}`);
    }
  }
  throw new Error(errors.join(" | "));
}

export default function Contact() {
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(
    `Project enquiry from ${form.name || "your website"}`
  )}&body=${encodeURIComponent(compose(form))}`;

  const submit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await send(form);
      setStatus("sent");
      setForm(empty);
    } catch (err) {
      console.error("Contact form send failed:", err?.text ?? err?.message ?? err);
      setStatus("error");
    }
  };

  return (
    <section className="section contact" aria-labelledby="contact-title">
      <div className="contact-intro">
        <Availability />
        <h1 id="contact-title">Let&apos;s build something</h1>
        <p>
          Tell me a little about your project. I reply within a day, usually with a few questions
          and a time for a short call.
        </p>

        <ul className="channels">
          <li>
            <span>Email</span>
            <a className="text-link" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
          </li>
          {channels.whatsapp && (
            <li>
              <span>WhatsApp</span>
              <a className="text-link" href={channels.whatsapp} target="_blank" rel="noopener noreferrer">
                Send a message
              </a>
            </li>
          )}
          <li>
            <span>LinkedIn</span>
            <a className="text-link" href={profile.linkedin} target="_blank" rel="noopener noreferrer">
              Connect with me
            </a>
          </li>
        </ul>

        <h2 className="contact-next-title">What happens next</h2>
        <ol className="contact-next">
          <li>I read your message and reply within a day.</li>
          <li>We talk for 20–30 minutes about what you need.</li>
          <li>You get a written plan with price and dates.</li>
        </ol>
      </div>

      {status === "sent" ? (
        <div className="contact-done" role="status">
          <h2>Thanks, your message is on its way</h2>
          <p>I&apos;ll reply to the email you gave within a day.</p>
          <button type="button" className="btn btn--ghost" onClick={() => setStatus("idle")}>
            Send another message
          </button>
        </div>
      ) : (
        <form className="contact-form" onSubmit={submit}>
          <div className="form-row">
            <label>
              Your name
              <input name="name" autoComplete="name" required value={form.name} onChange={update} />
            </label>
            <label>
              Email
              <input
                type="email"
                name="email"
                autoComplete="email"
                required
                value={form.email}
                onChange={update}
              />
            </label>
          </div>
          <label>
            <span>
              Company <span className="optional">(optional)</span>
            </span>
            <input name="company" autoComplete="organization" value={form.company} onChange={update} />
          </label>
          <label>
            What do you need?
            <select name="type" value={form.type} onChange={update}>
              {projectTypes.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>
          <div className="form-row">
            <label>
              Budget
              <select name="budget" value={form.budget} onChange={update}>
                {budgets.map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </select>
            </label>
            <label>
              Timeline
              <select name="timeline" value={form.timeline} onChange={update}>
                {timelines.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </label>
          </div>
          <label>
            About the project
            <textarea
              name="message"
              rows={5}
              required
              placeholder="What should it do, who will use it, and is anything already built?"
              value={form.message}
              onChange={update}
            />
          </label>
          {/* spam trap: hidden from people, bots fill it in */}
          <input
            type="checkbox"
            name="botcheck"
            className="sr-only"
            tabIndex={-1}
            autoComplete="off"
            checked={!!form.botcheck}
            onChange={(e) => setForm({ ...form, botcheck: e.target.checked ? "on" : "" })}
            aria-hidden="true"
          />
          <div className="contact-submit">
            <button className="btn btn--primary" type="submit" disabled={status === "sending"}>
              {status === "sending" ? "Sending…" : "Send enquiry"}
            </button>
            <p className="form-status" role="status">
              {status === "error" && (
                <>
                  Your enquiry wasn&apos;t sent because the mail service is unavailable. Your details
                  are still in the form.{" "}
                  <a className="text-link" href={mailto}>
                    Send it from your email app
                  </a>
                  {channels.whatsapp && (
                    <>
                      {" "}or{" "}
                      <a className="text-link" href={channels.whatsapp} target="_blank" rel="noopener noreferrer">
                        message me on WhatsApp
                      </a>
                    </>
                  )}
                  .
                </>
              )}
            </p>
          </div>
        </form>
      )}
    </section>
  );
}
