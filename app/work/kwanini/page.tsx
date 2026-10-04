import { permanentRedirect } from "next/navigation";

// Keep old inbound links useful while giving this project one canonical page.
export default function KwaniniCaseStudy() {
  permanentRedirect("/work/ssaru-fathermoh-kwanini");
}
