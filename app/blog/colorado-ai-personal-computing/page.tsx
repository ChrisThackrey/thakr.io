import type { Metadata } from "next"
import { ColoradoAIBlogContent } from "./ColoradoAIBlogContent"

export const metadata: Metadata = {
  title: "From Mainframes to Microapplications: Colorado's AI Community Leads the Shift to Personal AI",
  description:
    "Explore how Colorado's thriving AI community is leading the shift from centralized cloud services to personal AI applications running on local devices.",
}

export default function ColoradoAIPage() {
  return <ColoradoAIBlogContent />
}
