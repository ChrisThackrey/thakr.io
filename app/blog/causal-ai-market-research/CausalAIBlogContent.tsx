"use client"

import { BlogImage } from "@/components/blog-image"
import { RelatedPosts } from "@/components/related-posts"
import { ReadingTime } from "@/components/reading-time"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, List } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

// TOC entry type
type TOCEntry = {
  id: string
  text: string
  level: number
  element?: HTMLElement | null
}

// Floating TOC component
function FloatingTOC() {
  const [activeId, setActiveId] = useState<string>("")
  const [toc, setToc] = useState<TOCEntry[]>([])
  const observer = useRef<IntersectionObserver | null>(null)
  const [isOpen, setIsOpen] = useState(true)

  // Generate Table of Contents from headings
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

      // Set the ID on the heading if it doesn't have one
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

  // Set up intersection observer to track visible headings
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

    // Observe all heading elements
    toc.forEach((entry) => {
      if (entry.element) {
        observer.current?.observe(entry.element)
      }
    })

    return () => {
      observer.current?.disconnect()
    }
  }, [toc])

  // Scroll to section when TOC item is clicked
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

export function CausalAIBlogContent() {
  // Calculate approximate word count based on the content
  const wordCount = 3200 // Estimated word count of the article
  const readingTimeMinutes = Math.ceil(wordCount / 200) // Average reading speed of 200 words per minute

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 relative">
      {/* Add Floating Table of Contents */}
      <FloatingTOC />

      <h1 className="text-4xl font-bold mt-8 mb-4 text-gray-900 dark:text-gray-50">
        The &apos;Why&apos; Behind the Buy: How Causal AI is Revolutionizing Market Research
      </h1>

      {/* Add reading time estimate */}
      <div className="flex items-center mb-6">
        <ReadingTime
          minutes={readingTimeMinutes}
          wordCount={wordCount}
          showWordCount={true}
          className="text-gray-600 dark:text-gray-400"
        />
      </div>

      {/* Featured Hero Image */}
      <BlogImage
        src="/images/blog/causal-ai-hero.png"
        alt="Abstract visualization of causal AI analyzing market research data"
        caption="Causal AI uncovers the hidden relationships between consumer behavior variables"
        className="my-8 rounded-xl shadow-lg"
        width={1200}
        height={630}
      />

      {/* Key Takeaways Section */}
      <Card className="my-8 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold text-blue-700 dark:text-blue-400">Key Takeaways</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-start">
              <Check className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
              <span>
                Synthetic data and causal AI are transforming market research by revealing <strong>why</strong>{" "}
                consumers make decisions, not just what they choose.
              </span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
              <span>
                Research timelines are being compressed from months to minutes, enabling rapid experimentation and
                business decision-making.
              </span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
              <span>
                Synthetic respondents allow ethical testing of scenarios that would be harmful to human participants,
                potentially enabling new regulatory frameworks.
              </span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
              <span>
                Despite limitations like hallucination and bias, the market for synthetic data generation is projected
                to grow from $123 million in 2021 to $1.15 billion by 2027.
              </span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
              <span>
                The most effective approaches combine AI-generated insights with human validation, leveraging the speed
                and scale of the former with the lived reality of the latter.
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>

      <div className="space-y-6 text-lg blog-content">
        <p className="lead">
          Understanding why consumers make the decisions they do has been the holy grail of market research for decades.
          Companies spend billions annually trying to uncover the complex web of motivations, preferences, and
          influences that drive purchasing behavior. Yet traditional approaches—surveys, focus groups, and panel
          studies—are often slow, expensive, and limited by human availability and honesty. What if there was a faster,
          more scalable way to gain these critical insights?
        </p>

        <p>
          Enter synthetic data—AI-generated responses that simulate human behavior and decision-making. While the
          concept isn&apos;t new, recent advances in large language models (LLMs) have transformed what was once considered
          an unreliable approach into what many now see as an inevitable evolution of the market research industry. At
          the forefront of this transformation is a growing understanding that synthetic respondents can do more than
          just describe preferences—they can help reveal causal relationships that explain why consumers make the
          choices they do.
        </p>

        <p>
          This revolutionary approach isn&apos;t just changing how research is conducted; it&apos;s compressing decision cycles
          from months to days, enabling experimentation that would be unethical with human subjects, and potentially
          overcoming long-standing biases in traditional research methods. As the line between synthetic and human
          responses becomes increasingly blurred, market researchers are being forced to reconsider fundamental
          assumptions about how consumer insights are generated and validated.
        </p>

        <BlogImage
          src="/images/blog/synthetic-respondents.png"
          alt="Digital avatars representing synthetic respondents for market research"
          caption="Synthetic respondents can provide insights at a fraction of the time and cost of traditional research methods"
          className="my-10"
        />

        <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-gray-50">
          The Evolution of Synthetic Data in Market Research
        </h2>

        <p>
          For nearly three decades, researchers have attempted to use synthetic data in market research, but these
          efforts consistently fell short. The fundamental issue was the &quot;out-of-sample&quot; problem—models trained on
          specific data would fail when applied to new scenarios outside their training domain.
        </p>

        <blockquote className="pl-4 border-l-4 border-blue-500 italic my-6 text-gray-700 dark:text-gray-300">
          <p>
            &quot;People have been trying to sell synthetic data for like 30 years. And for 30 years it&apos;s been ineffective
            because when you train some sort of model on in-sample data and then try to apply it out-of-sample, it fails
            in these very obvious ways.&quot;
          </p>
        </blockquote>

        <p>
          Large language models have changed this equation fundamentally. By being trained on vast amounts of
          human-generated content covering countless domains and contexts, these models effectively eliminate the
          out-of-sample problem. This has triggered a remarkable shift in industry perception—from dismissing synthetic
          data as &quot;impossible&quot; just two years ago to now viewing it as &quot;inevitable.&quot;
        </p>

        <p>
          Companies like Subconscious, founded by Avi Eisenberger, are at the forefront of this transition. By creating
          &quot;synthetic respondents&quot; that can participate in research studies, these companies are promising insights at a
          fraction of the cost and time of traditional methods. The market for synthetic data generation is projected to
          grow from $123 million in 2021 to $1.15 billion by 2027, representing a compound annual growth rate of 45.7%,
          according to industry reports.
        </p>

        <p>Other significant players in this space include:</p>

        <ul className="list-disc pl-6 my-4 space-y-2">
          <li>
            Mostly AI: Offering synthetic data platforms that preserve statistical patterns while ensuring privacy
          </li>
          <li>Delvify: Applying AI to market research with synthetic data generation</li>
          <li>Synthesis AI: Specializing in synthetic data for visual applications and consumer behavior</li>
          <li>Hazy: Providing synthetic data solutions that maintain statistical properties of original datasets</li>
        </ul>

        <p>
          The rapid evolution has caught even veteran market researchers by surprise: &quot;The big market research companies
          were saying this is impossible. We need humans. And now people are saying [panel research] is already mostly
          synthetic. And we&apos;re paying human prices for synthetic panels.&quot;
        </p>

        <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-gray-50">
          Causal Modeling: Understanding the &quot;Why&quot; Behind Decisions
        </h2>

        <BlogImage
          src="/images/blog/causal-modeling-diagram.png"
          alt="Causal modeling diagram showing relationships between variables"
          caption="Causal modeling establishes the relationships between variables that drive consumer decisions"
          className="my-10"
        />

        <p>
          Traditional market research often focuses on descriptive data—what people say they prefer, what they report
          they&apos;ve purchased, or how they describe their opinions. But description alone doesn&apos;t answer the crucial &quot;why&quot;
          questions that drive business decisions.
        </p>

        <p>
          Causal modeling attempts to establish the relationships between variables that actually drive decisions. As
          Eisenberger explains:
        </p>

        <blockquote className="pl-4 border-l-4 border-blue-500 italic my-6 text-gray-700 dark:text-gray-300">
          <p>
            &quot;You cannot answer why something happens without causal understanding. Why did something happen? Because of
            this. The ability to ask why and understand why is kind of what separates us from the animals."
          </p>
        </blockquote>

        <p>
          This ability to understand "why" is what separates humans from other beings—even highly trained animals like
          Koko the gorilla could learn to communicate but never asked "why."
        </p>

        <p>
          Interestingly, this limitation also applies to current AI systems. "The big limitations of language models
          today, one of the limitations is they do not have causal understanding. They don't understand why," notes
          Eisenberger. His company is attempting to overcome this by creating a "layer on top of the causal models"
          where through self-inquiry and running experiments on themselves, they can begin to understand causal
          relationships.
        </p>

        <p>The methodology involves designing experiments—not just surveys—that can establish causal links:</p>

        <ol className="list-decimal pl-6 my-4 space-y-2">
          <li>Design the experiment (identifying competing products, companies, features, etc.)</li>
          <li>Design a synthetic population with varied traits</li>
          <li>Run multivariate tests where variables change across hundreds of iterations</li>
          <li>Build causal models to explain why different types of people make different choices</li>
        </ol>

        <p>
          By performing these tests hundreds of times across hundreds of synthetic people, researchers can identify why
          different demographic groups purchase different products, how much they're willing to pay, what messaging
          works with which segments, and even demand elasticity.
        </p>

        <p>
          This approach represents the "gold standard" for quantitative research, providing insights that go beyond mere
          correlation to establish genuine causation—answering not just what happens, but why it happens.
        </p>

        <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-gray-50">
          The Speed Advantage: From Months to Minutes
        </h2>

        <p>
          Perhaps the most immediately compelling benefit of synthetic respondents is the dramatic compression of
          research timelines. Traditional research cycles often stretch across months or even years. A typical process
          might involve designing an experiment, finding appropriate respondents, collecting data over weeks or months,
          analyzing results, and finally implementing changes based on findings.
        </p>

        <blockquote className="pl-4 border-l-4 border-blue-500 italic my-6 text-gray-700 dark:text-gray-300">
          <p>
            "Now you can perform a study in an hour. You can set up the change in your business in a couple of weeks,
            and you can measure if that change had impact... Now you've understood in a couple of weeks, you've made a
            decision in two weeks what would have taken you six months."
          </p>
        </blockquote>

        <p>
          This acceleration enables a fundamentally different approach to business experimentation. Companies can test
          multiple hypotheses rapidly, fail quickly, and iterate before committing significant resources. The speed
          advantage is particularly valuable when traditional research cycles are so long that the market may have
          changed substantially by the time results are available.
        </p>

        <p>
          While synthetic data advocates acknowledge they "might not be as accurate as humans," they argue that the
          speed advantage often outweighs this limitation. In fast-moving markets, being 95% right today is typically
          more valuable than being 100% right six months from now.
        </p>

        <p>
          As one industry expert puts it, "Are you willing to accept slightly less accurate results to change your
          business faster and learn faster than waiting 18 months for a study to run? By the time you get two years down
          the road, the market will have changed."
        </p>

        <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-gray-50">
          The Ethical Dimension: Testing for Harm Without Causing Harm
        </h2>

        <p>
          Perhaps the most provocative potential of synthetic respondents lies in their ability to participate in
          studies that would be unethical to conduct with humans. Research ethics are governed by the principle of
          "beneficence"—studies must benefit participants and avoid causing harm. This creates a significant blind spot
          in our understanding of what causes psychological harm.
        </p>

        <blockquote className="pl-4 border-l-4 border-blue-500 italic my-6 text-gray-700 dark:text-gray-300">
          <p>
            "If I wanted to prove that TikTok caused depression, I would have to run a randomized controlled study. I'd
            have to take a bunch of 12-year-olds and force them to watch enough TikTok until they got depressed. That's
            an unethical study. You can't run that study."
          </p>
        </blockquote>

        <p>
          This ethical constraint has allowed companies from Philip Morris to Meta to claim there's "no causal proof"
          that their products cause harm—because it would be unethical to design studies specifically testing for harm.
          Correlation studies abound, but causal proof remains elusive.
        </p>

        <p>
          Synthetic respondents could change this equation. "Assuming that language models are not conscious and do not
          feel pain, we may be able to run causal studies for harm," suggests Eisenberger. This could potentially enable
          the creation of something akin to "an FDA for mental health"—a regulatory framework based on causal evidence
          about what digital experiences might cause psychological harm.
        </p>

        <p>
          Of course, this raises profound questions about AI consciousness and consent. Some researchers go so far as to
          ask language models for consent before conducting studies. Interestingly, older models typically say "I don't
          have feelings, no problem," while newer models sometimes refuse consent altogether—raising questions about how
          we should interpret and respect such refusals.
        </p>

        <p>
          Regardless of these philosophical questions, the potential to ethically test scenarios that might cause harm
          represents a significant new frontier in understanding human psychology and behavior.
        </p>

        <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-gray-50">Limitations and Challenges</h2>

        <p>For all its promise, synthetic data in market research faces several important limitations:</p>

        <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-gray-50">
          The Necessity of Human Validation
        </h3>

        <p>
          Researchers are unanimous that synthetic data cannot stand alone: "You can't trust synthetic data only. You
          really need humans to validate." Companies like Subconscious use a hybrid approach, with the majority of data
          being synthetic but validated against human responses.
        </p>

        <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-gray-50">Bias in Language Models</h3>

        <p>
          Research has uncovered interesting biases in language models. For example, when replicating immigration
          studies, language models show a strong preference for "educated women" across domains—a bias that exists
          across geographies and cultures. Different models also show different biases: the European Mistral model, for
          instance, displays a more positive bias toward Iraqi immigrants than human respondents.
        </p>

        <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-gray-50">Hallucination Control</h3>

        <p>
          A critical challenge with synthetic data is avoiding hallucination—where models generate plausible-sounding
          but incorrect information. To address this, companies like Subconscious constrain response formats:
        </p>

        <blockquote className="pl-4 border-l-4 border-blue-500 italic my-6 text-gray-700 dark:text-gray-300">
          <p>
            "We don't let the language model generate really anything. There's natural language understanding and
            natural language generation. In my experience, the natural language understanding portion is much more
            powerful than the generation. When we perform a task... we say here's your options A and B, understand this
            scenario as best as you can and give me a single response. Give me one character. You don't get to
            hallucinate."
          </p>
        </blockquote>

        <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-gray-50">
          Trust and Adoption Barriers
        </h3>

        <p>
          Many market research professionals remain skeptical about replacing human respondents with synthetic ones. The
          industry is gradually moving toward acceptance, with hybrid approaches being most common. Transparency in
          methodology and reproducibility of results are crucial for building trust in synthetic approaches.
        </p>

        <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-gray-50">
          The Future of Market Research: Human-AI Collaboration
        </h2>

        <p>
          The integration of causal AI and synthetic respondents into market research represents more than just an
          incremental improvement in methodology—it signals a fundamental shift in how we understand human
          decision-making. By compressing research cycles from months to minutes, enabling ethical testing of
          potentially harmful scenarios, and providing access to populations that traditional research struggles to
          reach, these technologies are expanding the boundaries of what's possible in consumer insights.
        </p>

        <p>
          Yet for all their promise, synthetic respondents are not a wholesale replacement for human research. The most
          effective approaches combine AI-generated insights with human validation, leveraging the speed and scale of
          the former while grounding results in the lived reality of the latter.
        </p>

        <p>
          As this field continues to evolve, the ethical frameworks governing it will need to keep pace. Questions about
          AI consent, the nature of synthetic consciousness, and the appropriate boundaries of experimentation will
          become increasingly important as the line between human and synthetic responses continues to blur.
        </p>

        <p>
          What remains clear is that understanding the "why" behind human decisions—the causal mechanisms that drive
          choice—remains the central challenge of market research. Whether those insights come from humans, synthetic
          respondents, or a combination of both, the businesses that can answer "why" most effectively will ultimately
          gain the competitive edge in understanding and serving their customers.
        </p>

        <p>
          The synthetic revolution in market research is just beginning, but its implications for business
          decision-making, consumer understanding, and even our conception of research ethics are already profound. As
          one researcher concludes, "It is now possible to understand why any human makes any decision, at least to a
          first approximation." That possibility represents nothing less than a transformation in our approach to the
          most fundamental question in business: why do people choose what they choose?
        </p>

        <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-gray-50">Sources:</h2>

        <ol className="list-decimal pl-6 my-4 space-y-2">
          <li>Podcast interview with Avi Eisenberger, Co-Founder & CEO of Subconscious</li>
          <li>MarketsandMarkets Research. "Synthetic Data Generation Market - Global Forecast to 2027"</li>
          <li>
            Subconscious company information -{" "}
            <a
              href="https://www.scs.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              https://www.scs.ai/
            </a>
          </li>
          <li>
            Nature article: "Will synthetic data transform behavioral research?" -{" "}
            <a
              href="https://www.nature.com/articles/d41586-023-03278-x"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              https://www.nature.com/articles/d41586-023-03278-x
            </a>
          </li>
          <li>
            Harvard Business Review Podcast: "Ethics of Synthetic Humans: New Considerations in the AI Age" - December
            2023
          </li>
        </ol>

        {/* Add Related Posts section */}
        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
          <RelatedPosts
            currentSlug="causal-ai-market-research"
            tags={["artificial intelligence", "market research", "synthetic data", "causal modeling", "AI ethics"]}
            maxPosts={3}
          />
        </div>
      </div>
    </div>
  )
}
