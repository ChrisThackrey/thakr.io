"use client"

import { BlogImage } from "@/components/blog-image"
import { RelatedPosts } from "@/components/related-posts"
import { ReadingTime } from "@/components/reading-time"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, List } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

type TOCEntry = {
  id: string
  text: string
  level: number
  element?: HTMLElement | null
}

function FloatingTOC() {
  const [activeId, setActiveId] = useState<string>("")
  const [toc, setToc] = useState<TOCEntry[]>([])
  const observer = useRef<IntersectionObserver | null>(null)
  const [isOpen, setIsOpen] = useState(true)

  useEffect(() => {
    const article = document.querySelector(".blog-content")
    if (!article) return

    const headings = article.querySelectorAll("h2, h3")
    const tocEntries: TOCEntry[] = []

    headings.forEach((heading) => {
      const id =
        heading.textContent
          ?.toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]/g, "") || ""
      if (!heading.id) {
        heading.id = id
      }
      tocEntries.push({
        id: heading.id,
        text: heading.textContent || "",
        level: heading.tagName === "H2" ? 2 : 3,
        element: heading as HTMLElement,
      })
    })
    setToc(tocEntries)
  }, [])

  useEffect(() => {
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id)
        }
      })
    }
    observer.current = new IntersectionObserver(handleObserver, {
      rootMargin: "0px 0px -80% 0px",
      threshold: 0.1,
    })
    toc.forEach((entry) => {
      if (entry.element) {
        observer.current?.observe(entry.element)
      }
    })
    return () => {
      observer.current?.disconnect()
    }
  }, [toc])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: "smooth",
      })
    }
  }

  if (toc.length === 0) return null

  return (
    <div className="fixed right-4 top-1/4 z-20 hidden xl:block">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-4 max-w-[240px] border border-gray-200 dark:border-gray-800">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 flex items-center">
            <List className="h-4 w-4 mr-1" />
            Contents
          </h3>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 text-xs"
          >
            {isOpen ? "Hide" : "Show"}
          </button>
        </div>
        {isOpen && (
          <nav className="toc-nav">
            <ul className="space-y-1 text-sm">
              {toc.map((entry) => (
                <li
                  key={entry.id}
                  className={cn(
                    "transition-colors duration-200",
                    entry.level === 3 ? "ml-3" : "",
                    activeId === entry.id
                      ? "text-blue-600 dark:text-blue-400 font-medium"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200",
                  )}
                >
                  <button onClick={() => scrollToSection(entry.id)} className="block py-1 text-left w-full truncate">
                    {entry.text}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </div>
  )
}

export function DeepSeaAIBlogContent() {
  const wordCount = 2400
  const readingTimeMinutes = Math.ceil(wordCount / 200)

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 relative">
      <FloatingTOC />

      <h1 className="text-4xl font-bold mt-8 mb-4 text-gray-900 dark:text-gray-50">
        The Rise of Deep Sea AI: Geopolitics, Open Source Models, and the Future of AI Development
      </h1>

      <div className="flex items-center mb-6">
        <ReadingTime
          minutes={readingTimeMinutes}
          wordCount={wordCount}
          showWordCount={true}
          className="text-gray-600 dark:text-gray-400"
        />
      </div>

      <BlogImage
        src="/images/blog/geopolitical-ai-chess.png"
        alt="A chess board with AI-themed pieces, symbolizing the geopolitical strategy in AI development"
        caption="The development of AI models like Deep Sea is a key move in the global technology landscape."
        className="my-8 rounded-xl shadow-lg"
        width={1200}
        height={630}
      />

      <Card className="my-8 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold text-blue-700 dark:text-blue-400">Key Takeaways</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-start">
              <Check className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
              <span>
                Deep Sea AI, a Chinese model, shows competitive performance at a fraction of the training cost of
                Western models.
              </span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
              <span>
                It was trained using a distillation method and non-restricted Nvidia chips, bypassing US export
                controls.
              </span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
              <span>
                The model's release is seen in a geopolitical context, highlighting the tech race between the US and
                China.
              </span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
              <span>Ethical concerns exist regarding data provenance, privacy, and content moderation.</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
              <span>
                The rapid evolution of models underscores the need for model-agnostic development to ensure application
                stability and flexibility.
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>

      <div className="space-y-6 text-lg blog-content">
        <p className="lead">
          The artificial intelligence community has been buzzing about a new model called Deep Sea (also referred to as
          Deep Seek), developed in China. This model has quickly captured attention for its impressive performance, low
          reported training costs, and the geopolitical context surrounding its release. In today's post, we'll explore
          what Deep Sea is, how it works, and why it matters in the broader AI ecosystem—especially for organizations
          developing AI applications.
        </p>

        <h2 id="what-is-deep-sea">What Is Deep Sea and How Does It Perform?</h2>
        <p>
          Deep Sea is a large language model that originated as "Deep Sea Coder" about a year ago and has since evolved
          through multiple iterations. The current version being discussed is Deep Sea R3, which according to early
          testing, performs comparably to established models like Claude Sonnet for code generation tasks.
        </p>
        <blockquote className="pl-4 border-l-4 border-blue-500 italic my-6 text-gray-700 dark:text-gray-300">
          <p>
            "I had used it a little bit in Cursor before I knew it was from China. It was about on par with Claude
            Sonnet on the type of code it could generate. I was doing a little experiment where you can turn Deep Sea R3
            into a V0-like environment on localhost, and it does have really good answers and responses."
          </p>
        </blockquote>
        <p>
          Beyond code generation, benchmarks from Meta suggest Deep Sea may even outperform some of their Llama models
          on certain metrics. This is particularly noteworthy given the reported development cost.
        </p>

        <BlogImage
          src="/images/blog/deepseek-ai-model.png"
          alt="Abstract visualization of the Deep Sea AI model architecture"
          caption="Deep Sea's efficient architecture allows for competitive performance with lower training costs."
          className="my-10"
        />

        <h2 id="economics">The Economics: A $5 Million Final Training Run</h2>
        <p>
          One of the most striking claims about Deep Sea is its relatively low training cost. The developers have
          reportedly stated that the final training run cost approximately $5 million—an astoundingly low figure
          compared to the hundreds of millions that companies like OpenAI and Anthropic are estimated to spend on
          training their frontier models.
        </p>
        <blockquote className="pl-4 border-l-4 border-blue-500 italic my-6 text-gray-700 dark:text-gray-300">
          <p>
            "They claim that it costs them $5 million to train. They have said that's only the cost of the final
            training run, which is a fun little statement because, you know, how many training runs were there?"
          </p>
        </blockquote>
        <p>
          This cost efficiency appears to be driven by focused performance optimization and could signal a future trend
          where AI model development becomes more accessible to smaller players with more limited resources.
        </p>

        <h2 id="technical-implementation">Technical Implementation: Distillation and Hardware Strategy</h2>
        <p>Deep Sea's technical implementation includes two particularly interesting aspects:</p>
        <h3 id="distillation">1. Distillation from Existing Models</h3>
        <p>According to the discussion, Deep Sea was reportedly built using a distillation method:</p>
        <blockquote className="pl-4 border-l-4 border-blue-500 italic my-6 text-gray-700 dark:text-gray-300">
          <p>
            "My understanding is that on some level, it was built using GPT-4 or some other type of model in this
            distillation type process where essentially they ask the model questions to train the other model."
          </p>
        </blockquote>
        <p>
          This approach—using an existing powerful model to train a new one—can be more efficient than training from
          scratch. It's essentially having one AI teach another, which can reduce the amount of raw data and computation
          needed.
        </p>
        <h3 id="hardware-strategy">2. Strategic Hardware Choices</h3>
        <p>
          Perhaps more significantly, Deep Sea was trained using approximately 800 Nvidia chips that were specifically
          not the H100 chips targeted by US export controls:
        </p>
        <blockquote className="pl-4 border-l-4 border-blue-500 italic my-6 text-gray-700 dark:text-gray-300">
          <p>
            "They did it using chips from Nvidia, like 800 chips, which are distinctly not the H100 chips that everybody
            is using nowadays, which allows them to skirt the chip ban that the US had in place."
          </p>
        </blockquote>
        <p>
          This hardware strategy enabled the development team to circumvent US export restrictions while still achieving
          competitive performance. It represents a clever technical workaround to geopolitical constraints, though it
          also raises questions about the implications of such approaches.
        </p>

        <h2 id="geopolitical-context">The Geopolitical Context</h2>
        <p>
          The development and release of Deep Sea cannot be understood in isolation from its geopolitical context.
          Several speakers in the podcast pointed out connections to broader US-China technology relations, particularly
          noting the timing:
        </p>
        <blockquote className="pl-4 border-l-4 border-blue-500 italic my-6 text-gray-700 dark:text-gray-300">
          <p>
            "There was no accident that the TikTok ban and the launch of Deep Sea that upends the American AI market are
            sort of happening synchronously... it's very much a part of the geopolitical landscape."
          </p>
        </blockquote>
        <p>
          This integration of AI development with geopolitics creates a complex landscape where technical decisions have
          political implications and vice versa.
        </p>

        <h2 id="ethical-considerations">Ethical Considerations: Data Sources and Privacy</h2>
        <p>The podcast participants raised several ethical concerns that merit careful consideration:</p>
        <h3 id="data-provenance">1. Data Provenance</h3>
        <p>There's limited transparency about the data used to train Deep Sea:</p>
        <blockquote className="pl-4 border-l-4 border-blue-500 italic my-6 text-gray-700 dark:text-gray-300">
          <p>
            "We have no indication of the data that was actually used to train it, other than the fact that OpenAI has
            said that they have verifiable proof that GPT-4 was utilized in the distillation method."
          </p>
        </blockquote>
        <p>
          This lack of clarity about data sources is problematic, though as one speaker noted, it's an issue that
          affects many AI models.
        </p>
        <h3 id="privacy-concerns">2. Privacy and Telemetry Concerns</h3>
        <p>There are reports that Deep Sea might track user data:</p>
        <blockquote className="pl-4 border-l-4 border-blue-500 italic my-6 text-gray-700 dark:text-gray-300">
          <p>"There's definitely concerns because I've seen also where it does track your data. It has telemetry."</p>
        </blockquote>
        <p>This raises questions about privacy, especially for applications handling sensitive information.</p>

        <h2 id="model-agnosticism">The Case for Model Agnosticism</h2>
        <p>
          In response to these challenges, the speakers strongly advocated for model-agnostic development approaches:
        </p>
        <blockquote className="pl-4 border-l-4 border-blue-500 italic my-6 text-gray-700 dark:text-gray-300">
          <p>
            "When we're building and designing these generative AI applications, this only underscores the relevance and
            importance of model agnostic development right now. The pace of change is ridiculous. The behaviors are
            unpredictable. We need to be able to quickly adapt."
          </p>
        </blockquote>
        <p>
          Model agnosticism offers several advantages: flexibility, risk mitigation, performance optimization, and
          control. This approach of specialization could lead to applications that combine multiple models.
        </p>

        <h2 id="conclusion">Conclusion: Navigating Complexity</h2>
        <p>
          The emergence of Deep Sea represents more than just a new AI model—it's a reflection of how AI development has
          become intertwined with global politics, economic factors, and competing visions for the future of technology.
          For developers and organizations, the key lesson is adaptability. The AI landscape will continue to evolve
          rapidly, and those who build flexible, model-agnostic systems will be best positioned to navigate these
          changes while delivering consistent value.
        </p>

        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
          <RelatedPosts
            currentSlug="the-rise-of-deep-sea-ai"
            tags={["AI", "Deep Sea", "Geopolitics", "Open Source", "Model Agnostic"]}
            maxPosts={3}
          />
        </div>
      </div>
    </div>
  )
}
