export interface Reference {
  name: string
  title: string
  linkedin: string
  image?: string
  text: string
}

export const references: Reference[] = [
  {
    name: "Chris Ivester",
    title: "Founder at Dialog",
    linkedin: "https://www.linkedin.com/in/chrisivester/",
    image: "/images/references/chris-ivester.jpg",
    text: "Chris is fast, focused, and gets things done—no hand-holding required. He sees the path forward and executes with clarity, precision, and zero drama. On every project, he brings a rare blend of sharp thinking, practical intuition, and momentum. He doesn’t get bogged down in ambiguity—he breaks it down, makes smart calls, and moves. His work is thoughtful, his code is clean, and his bias toward action consistently pushes things over the finish line. If you need someone who can take an idea—any idea—and turn it into something real without the usual friction or fluff, Chris is your guy.",
  },
  {
    name: "Amir Sorhan Karimloo",
    title: "Co-Founder & CEO at ELU",
    linkedin: "https://www.linkedin.com/in/sorhanft/",
    image: "/images/references/amir-sorhan-karimloo.jpg",
    text: "Having known Chris since our days at Texas A&M, I've had the privilege of watching him evolve from a talented architect into one of the most formidable full-stack engineers I've encountered. Our friendship spanning years transformed into a powerful professional partnership this past year, revealing depths of technical excellence and creative problem-solving that continue to elevate every project we tackle together.\n\nThe defining moment of our collaboration came during an intensive hackathon where we pushed ourselves beyond conventional limits. For 48 straight hours, Chris and I architected a solution that merged his instinctive grasp of TypeScript and NextJS with innovative AI integration patterns. While I focused on the core algorithmic challenges, Chris orchestrated the entire system architecture. Our victory wasn't just about technical execution- it was Chris's ability to envision the end user experience and reverse-engineer the entire domain model that set our solution apart from dozens of competing teams.\n\nWhat distinguishes Chris in the technical realm is his mastery across the entire stack combined with an architect's creativity and precision. His proficiency with modern frameworks like NextJS, combined with deep understanding of computer science principles as they apply to problem-solving enables him to build systems that are both performant and maintainable. Where many engineers get trapped in technical complexity, Chris navigates with the clarity of someone who truly understands system design from first principles.\n\nThe creative dimension Chris brings to engineering problems has been transformative for our partnership. I've seen him sketch out user flows that become the blueprint for entire applications, visualize data relationships in ways that reveal hidden optimization opportunities, and design interfaces that make complex systems feel intuitive. This creative lens, combined with his technical rigor, produces solutions that are both innovative and pragmatic.\n\nOur ongoing collaboration has yielded consistent successes across diverse challenges. Chris brings the same intensity and excellence to every project. His ability to context-switch between projects while maintaining deep focus on each has been crucial to our ability to deliver concurrent solutions. Chris represents the rare engineer who combines battle-tested technical skills with visionary thinking and genuine collaborative spirit. His expertise in many different frameworks, ecosystems and modern deployment strategies is matched only by his ability to see the bigger picture and guide teams toward elegant solutions. Any organization seeking a senior engineer or systems architect who can bridge the gap between ambitious vision and flawless execution will find in Chris a professional who consistently transforms complexity into clarity and ideas into reality. I cannot recommend him highly enough.",
  },
  {
    name: "Ryan St. Pierre",
    title: "Mapping Social Networks with Threshold",
    linkedin: "https://www.linkedin.com/in/ryanastpierre/",
    image: "/images/references/ryan-st-pierre.jpg",
    text: "Chris and I worked together coming implementing RAG systems and learning the fast changing ecosystem of AI tools. He was a pleasure to work with the whole way through. He would consistently deliver features end to end that worked well and looked great. Far more importantly though he was a great teammate who added energy and brought good ideas to the project at every turn. I look forward to working with him again.",
  },
  {
    name: "Joe Williamson",
    title: "Founder at Silver Bow Technology Group",
    linkedin: "https://www.linkedin.com/in/williamsonjoe/",
    image: "/images/references/joe-williamson.jpg",
    text: "Chris came to our team as part of an outsourced development effort, quickly revealing himself as the kind of coder you can rely on. Amid the tangled complexities of our biggest product at Silverbow, Chris brought clarity and sharpness to the chaos, making the difficult look effortless. While others got lost in the weeds, Chris zeroed in, turning vague ideas into real, elegant solutions with deceptive ease.\n\nHe's the kind of developer you want in a crunch: calm under pressure, surgically precise in execution, and remarkably intuitive in his grasp of what really matters. Chris didn't just write good code—he wrote code that mattered, swiftly cutting through noise and inertia to deliver results. If you're looking for someone who transforms uncertainty into clarity, and chaos into a finished product, Chris is your guy.",
  },
  {
    name: "Eli Wood",
    title: "Team Captain at BFD",
    linkedin: "https://www.linkedin.com/in/notthatactor/",
    image: "/images/references/eli-wood.jpg",
    text: "What stands out about Chris is his ability to adapt seamlessly—contributing valuable features in record time, often within mere hours or days across 4 of our projects at Black Flag Design over the past year.\n\nChris thrives in ambiguity, embracing uncertainty as an opportunity to explore cutting-edge tools and technologies. Whether it’s mastering LangGraph, LangChain, Vercel, React, Supabase, Next.js, Vite, or Vue, he consistently demonstrates an eagerness to learn and a proactive approach to applying his knowledge for maximum impact. His ability to leverage AI to accelerate delivery and enhance code quality has been instrumental to our success.\n\nBeyond his technical acumen, Chris has a remarkable ability to identify and prioritize high-value tasks, stepping up wherever needed to ensure project goals are met. He’s also committed to fostering growth—not just for himself, but for the business—by engaging in local meetups, coworking jam sessions, and keeping Black Flag Design’s broader priorities in focus.\n\nChris excels at clean, well-documented pull requests and adheres to code quality standards, making collaboration seamless. His creativity and resilience shine in client interactions and team dynamics, especially when tackling adversity and driving innovation.\n\nSimply put, Chris is the fastest learner I’ve ever worked with, and his dedication, adaptability, and creativity make him an exceptional teammate and engineer.",
  },
]

export function getReferenceInitials(name: string): string {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

export function getReferenceExcerpt(text: string, maxChars = 220): string {
  const firstParagraph = text.split("\n\n")[0]
  const sentences = firstParagraph.match(/[^.!?]+[.!?]+(?:\s|$)/g) ?? [firstParagraph]
  let excerpt = ""
  for (const sentence of sentences) {
    if (excerpt && excerpt.length + sentence.length > maxChars) break
    excerpt += sentence
  }
  excerpt = excerpt.trim()
  return excerpt.length < firstParagraph.trim().length || text.includes("\n\n") ? `${excerpt}…` : excerpt
}
