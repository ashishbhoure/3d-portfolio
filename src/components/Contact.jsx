import { useState } from "react";
import emailjs from "@emailjs/browser";
import { profile } from "../data";

const env = import.meta.env;
const configured =
  env.VITE_APP_EMAILJS_SERVICE_ID && env.VITE_APP_EMAILJS_TEMPLATE_ID && env.VITE_APP_EMAILJS_PUBLIC_KEY;

const empty = { name: "", email: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!configured) {
      // No EmailJS keys in this build: hand off to the visitor's mail app.
      const body = encodeURIComponent(`${form.message}\n\n${form.name} <${form.email}>`);
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
        `Hello from ${form.name}`
      )}&body=${body}`;
      return;
    }
    setStatus("sending");
    try {
      await emailjs.send(
        env.VITE_APP_EMAILJS_SERVICE_ID,
        env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "Ashish",
          from_email: form.email,
          to_email: profile.email,
          message: form.message,
        },
        env.VITE_APP_EMAILJS_PUBLIC_KEY
      );
      setStatus("sent");
      setForm(empty);
    } catch (err) {
      console.error("EmailJS send failed:", err?.text ?? err);
      setStatus("error");
    }
  };

  return (
    <section className="section contact" id="contact" aria-labelledby="contact-title">
      <div className="contact-intro">
        <h1 id="contact-title">Have something to build?</h1>
        <p>
          Tell me what you are working on and when you need it. I usually reply within a day.
        </p>
        <p>
          Or write directly to{" "}
          <a className="text-link" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
          .
        </p>
      </div>

      <form className="contact-form" onSubmit={submit}>
        <label>
          Name
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
        <label>
          Message
          <textarea name="message" rows={5} required value={form.message} onChange={update} />
        </label>
        <div className="contact-submit">
          <button className="btn btn--primary" type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Send message"}
          </button>
          <p className="form-status" role="status">
            {status === "sent" && "Message sent. I'll get back to you soon."}
            {status === "error" && (
              <>
                Message not sent: the mail service didn&apos;t respond.{" "}
                <a
                  className="text-link"
                  href={`mailto:${profile.email}?subject=${encodeURIComponent(
                    `Hello from ${form.name}`
                  )}&body=${encodeURIComponent(form.message)}`}
                >
                  Send it from your email app
                </a>{" "}
                instead. Your message is still in the form.
              </>
            )}
          </p>
        </div>
      </form>
    </section>
  );
}
