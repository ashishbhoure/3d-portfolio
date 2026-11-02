import Contact from "../components/Contact";
import { usePageTitle } from "../components/ui";

export default function ContactPage() {
  usePageTitle("Contact", "Get in touch with Ashish Bhoure about freelance work or a full-time role.");
  return <Contact />;
}
