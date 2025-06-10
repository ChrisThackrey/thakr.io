"use client"
import { ReadingTime } from "@/components/reading-time"
import { RemainingReadingTime } from "@/components/remaining-reading-time"
import dynamic from "next/dynamic"
import { BlogLayout } from "@/components/blog-layout"

// Add the import for our new component
import { BlogPostTracker } from "@/components/blog-post-tracker"
import { useReadingTimeCalculator } from "@/hooks/use-reading-time-calculator"
import { useState, useEffect } from "react"

// Add the import for our new ColoredTag component:
import { ColoredTag } from "@/components/colored-tag"

// Dynamically import the MDX content to prevent hydration issues
const MDXContent = dynamic(() => import("./page.mdx"))

function DynamicReadingTime({
  slug,
  fallbackTime,
  className,
}: { slug: string; fallbackTime?: number; className?: string }) {
  const { readingTime } = useReadingTimeCalculator()
  const [isClient, setIsClient] = useState(false)

  // Add useEffect to set isClient to true after mount
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Use the calculated time if available and we're client-side, otherwise fall back to the static time
  const displayTime = isClient && readingTime > 0 ? readingTime : fallbackTime || 1

  return <ReadingTime minutes={displayTime} className={className} />
}

// Update the component to provide a consistent ID for the speed reader to target
import { MDXSpeedReading } from "@/components/mdx-speed-reading"

// Update the DeepSeaAIPostPage component to include the tracker
export default function DeepSeaAIPostPageClient({ post }: { post: any }) {
  if (!post) {
    return null
  }

  return (
    <BlogLayout>
      <BlogPostTracker slug="the-rise-of-deep-sea-ai" title={post.title}>
        <div>
          <div className="mb-8 mt-8">
            <h1 className="text-4xl font-bold tracking-tight mb-6">{post.title}</h1>
            <div className="flex items-center justify-between mb-3">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <ColoredTag key={tag} tag={tag} href={`/blog/categories/${encodeURIComponent(tag)}`} />
                ))}
              </div>
              <time className="text-foreground/80 font-medium text-sm flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1 opacity-70"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {post.date}
              </time>
            </div>
            <div className="flex items-center gap-4 mb-8">
              <DynamicReadingTime slug={post.slug} fallbackTime={post.readingTime} />
              <RemainingReadingTime slug={post.slug} variant="detailed" />
            </div>
          </div>

          <div className="h-px bg-border/60 w-full my-8" aria-hidden="true" />

          {/* Rest of the content remains the same */}
          <div id="deep-sea-ai-content" className="blog-content with-drop-cap">
            <h2 id="introduction">Introduction: A New Player in the AI Landscape</h2>
            <p>
              The artificial intelligence community has been buzzing about a new model called Deep Sea (also referred to
              as Deep Seek), developed in China. This model has quickly captured attention for its impressive
              performance, low reported training costs, and the geopolitical context surrounding its release. In today's
              post, we'll explore what Deep Sea is, how it works, and why it matters in the broader AI
              ecosystem—especially for organizations developing AI applications.
            </p>

            <h2 id="what-is-deep-sea">What Is Deep Sea and How Does It Perform?</h2>
            <p>
              Deep Sea is a large language model that originated as "Deep Sea Coder" about a year ago and has since
              evolved through multiple iterations. The current version being discussed is Deep Sea R3, which according
              to early testing, performs comparably to established models like Claude Sonnet for code generation tasks.
            </p>

            <p>One of the podcast participants describes experimenting with Deep Sea:</p>

            <blockquote>
              "I had used it a little bit in Cursor before I knew it was from China. It was about on par with Claude
              Sonnet on the type of code it could generate. I was doing a little experiment where you can turn Deep Sea
              R3 into a V0-like environment on localhost, and it does have really good answers and responses."
            </blockquote>

            <p>
              Beyond code generation, benchmarks from Meta suggest Deep Sea may even outperform some of their Llama
              models on certain metrics. This is particularly noteworthy given the reported development cost.
            </p>

            <h2 id="economics">The Economics: A $5 Million Final Training Run</h2>
            <p>
              One of the most striking claims about Deep Sea is its relatively low training cost. The developers have
              reportedly stated that the final training run cost approximately $5 million—an astoundingly low figure
              compared to the hundreds of millions that companies like OpenAI and Anthropic are estimated to spend on
              training their frontier models.
            </p>

            <p>As one speaker noted:</p>

            <blockquote>
              "They claim that it costs them $5 million to train. They have said that's only the cost of the final
              training run, which is a fun little statement because, you know, how many training runs were there?"
            </blockquote>

            <p>
              This cost efficiency appears to be driven by focused performance optimization and could signal a future
              trend where AI model development becomes more accessible to smaller players with more limited resources.
            </p>

            <h2 id="technical-implementation">Technical Implementation: Distillation and Hardware Strategy</h2>
            <p>Deep Sea's technical implementation includes two particularly interesting aspects:</p>

            <h3 id="distillation">1. Distillation from Existing Models</h3>
            <p>According to the discussion, Deep Sea was reportedly built using a distillation method:</p>

            <blockquote>
              "My understanding is that on some level, it was built using GPT-4 or some other type of model in this
              distillation type process where essentially they ask the model questions to train the other model."
            </blockquote>

            <p>
              This approach—using an existing powerful model to train a new one—can be more efficient than training from
              scratch. It's essentially having one AI teach another, which can reduce the amount of raw data and
              computation needed.
            </p>

            <h3 id="hardware-strategy">2. Strategic Hardware Choices</h3>
            <p>
              Perhaps more significantly, Deep Sea was trained using approximately 800 Nvidia chips that were
              specifically not the H100 chips targeted by US export controls:
            </p>

            <blockquote>
              "They did it using chips from Nvidia, like 800 chips, which are distinctly not the H100 chips that
              everybody is using nowadays, which allows them to skirt the chip ban that the US had in place."
            </blockquote>

            <p>
              This hardware strategy enabled the development team to circumvent US export restrictions while still
              achieving competitive performance. It represents a clever technical workaround to geopolitical
              constraints, though it also raises questions about the implications of such approaches.
            </p>

            <h2 id="geopolitical-context">The Geopolitical Context</h2>
            <p>
              The development and release of Deep Sea cannot be understood in isolation from its geopolitical context.
              Several speakers in the podcast pointed out connections to broader US-China technology relations,
              particularly noting the timing:
            </p>

            <blockquote>
              "There was no accident that the TikTok ban and the launch of Deep Sea that upends the American AI market
              are sort of happening synchronously... it's very much a part of the geopolitical landscape."
            </blockquote>

            <p>
              The speakers also discussed how technology companies and their leaders have become increasingly central to
              global politics:
            </p>

            <blockquote>
              "The tech companies are the largest by market share companies ever built. And those four dudes that run
              them are standing right next to Donald Trump when he's elected president of the United States."
            </blockquote>

            <p>
              This integration of AI development with geopolitics creates a complex landscape where technical decisions
              have political implications and vice versa.
            </p>

            <h2 id="ethical-considerations">Ethical Considerations: Data Sources and Privacy</h2>
            <p>The podcast participants raised several ethical concerns that merit careful consideration:</p>

            <h3 id="data-provenance">1. Data Provenance</h3>
            <p>There's limited transparency about the data used to train Deep Sea:</p>

            <blockquote>
              "We have no indication of the data that was actually used to train it, other than the fact that OpenAI has
              said that they have verifiable proof that GPT-4 was utilized in the distillation method."
            </blockquote>

            <p>
              This lack of clarity about data sources is problematic, though as one speaker noted, it's an issue that
              affects many AI models:
            </p>

            <blockquote>
              "It is an open source model, but it's not necessarily an ethically sourced one. And that should cause
              concerns. Although the counterargument is none of these models were ethically sourced. Arguably, or at
              least we don't actually know."
            </blockquote>

            <h3 id="privacy-concerns">2. Privacy and Telemetry Concerns</h3>
            <p>There are reports that Deep Sea might track user data:</p>

            <blockquote>
              "There's definitely concerns because I've seen also where it does track your data. It has telemetry."
            </blockquote>

            <p>This raises questions about privacy, especially for applications handling sensitive information:</p>

            <blockquote>
              "One of our projects, we work with schools—we're not going to start piping student data into this."
            </blockquote>

            <h3 id="content-moderation">3. Content Moderation Differences</h3>
            <p>The speakers noted variations in content moderation between the local and cloud versions:</p>

            <blockquote>
              "Depending on which version you're using, the local model has less censorship. But when you go to the
              cloud version, you can talk to it about things that are historically taboo."
            </blockquote>

            <p>
              These differences in content moderation reflect the different regulatory environments across countries and
              add complexity for organizations evaluating the model for global use.
            </p>

            <h2 id="implementation-challenges">Model Behavior and Business Implementation Challenges</h2>
            <p>
              A significant portion of the discussion focused on the practical challenges of implementing AI models in
              business applications:
            </p>

            <h3 id="unpredictable-updates">1. Unpredictable Model Updates</h3>
            <p>The speakers emphasized how model updates can cause dramatic shifts in behavior:</p>

            <blockquote>
              "Going from 3.5 to 4 to 4 Turbo, we saw dramatic behavior shifts in our applications into how they
              perform, what prompts we use, and how we were structuring our chains of reasoning."
            </blockquote>

            <p>These shifts can disrupt applications built on the models:</p>

            <blockquote>
              "We had to pin to the August version of four right now to maintain consistency as we did get users saying
              all of a sudden the AI is performing wildly differently."
            </blockquote>

            <h3 id="api-dependencies">2. API Dependencies</h3>
            <p>Relying on external APIs creates dependencies that can be problematic:</p>

            <blockquote>
              "Having such a critical function of your application go out to a third party in an API call where they
              could push an update to that API and honestly not tell us—they probably do that all the time."
            </blockquote>

            <p>
              This lack of control represents a significant business risk for applications that depend heavily on AI
              capabilities.
            </p>

            <h2 id="model-agnosticism">The Case for Model Agnosticism</h2>
            <p>
              In response to these challenges, the speakers strongly advocated for model-agnostic development
              approaches:
            </p>

            <blockquote>
              "When we're building and designing these generative AI applications, this only underscores the relevance
              and importance of model agnostic development right now. The pace of change is ridiculous. The behaviors
              are unpredictable. We need to be able to quickly adapt."
            </blockquote>

            <p>Model agnosticism offers several advantages:</p>

            <ol>
              <li>
                <strong>Flexibility</strong>: The ability to swap models as technology evolves
              </li>
              <li>
                <strong>Risk mitigation</strong>: Reduced dependency on any single provider
              </li>
              <li>
                <strong>Performance optimization</strong>: Using different models for different types of tasks
              </li>
              <li>
                <strong>Control</strong>: Being able to pin to specific versions when necessary
              </li>
            </ol>

            <p>As one speaker explained, different models may have different strengths:</p>

            <blockquote>
              "I could very clearly see a use case for one model that can answer really hard questions versus one that
              can answer a long sequence of simple questions. Those are useful in two different ways."
            </blockquote>

            <p>This approach of specialization could lead to applications that combine multiple models:</p>

            <blockquote>
              "If you think about a web page, you could have five different calls going out to five different models
              doing five different things."
            </blockquote>

            <h2 id="future-predictions">Future Predictions: Hardware Economics and Local Models</h2>
            <p>
              The discussion included some thought-provoking predictions about where AI development might be heading:
            </p>

            <h3 id="hardware-costs">1. Decreasing Hardware Costs</h3>
            <p>As chip production scales up, the economics of AI will likely shift:</p>

            <blockquote>
              "Eventually these H100s will have such a low cost to either produce or to buy because there are just too
              many of them. One of those two things with supply and demand will happen."
            </blockquote>

            <p>This could democratize access to advanced AI capabilities:</p>

            <blockquote>
              "I think it's going to go towards this lower-end market, people doing crazier and crazier things on
              cheaper and cheaper hardware. Until eventually there's a proliferation to where this costs basically
              pennies to run."
            </blockquote>

            <h3 id="on-premises">2. On-Premises Control</h3>
            <p>
              The ability to run models locally or within controlled infrastructure could become increasingly important:
            </p>

            <blockquote>
              "If we could control that and have it in our own infrastructure, it makes the application safer, likely
              faster, and the cost more maintainable and predictable as well."
            </blockquote>

            <h3 id="specialized-models">3. Specialized Model Roles</h3>
            <p>Different AI models might serve different functions within the same ecosystem:</p>

            <blockquote>
              "If OpenAI then could differentiate themselves in the specialist models or the ones that can do the more
              intense reasoning, they could still make just as much money."
            </blockquote>

            <h2 id="practical-advice">Practical Advice for Organizations</h2>
            <p>Based on the discussion, here are some key recommendations for organizations working with AI:</p>

            <ol>
              <li>
                <strong>Exercise Caution with New Models</strong>: As one speaker succinctly put it, "Play with Deep
                Sea. Don't build enterprise businesses with it." New models require thorough evaluation before being
                implemented in critical applications.
              </li>

              <li>
                <strong>Version Pinning</strong>: When you find a model version that works well for your application,
                pin to that specific version to maintain consistency and prevent unexpected behavior changes.
              </li>

              <li>
                <strong>Focus on the Application Layer</strong>: Rather than getting caught up in foundational model
                debates, focus on creating valuable human-computer interfaces:
                <blockquote>
                  "Staying close to the application layer is like where we can make the greatest impact in our talent
                  and for the businesses that we work for."
                </blockquote>
              </li>

              <li>
                <strong>Plan for Model Swapping</strong>: Design your AI implementations with the expectation that
                you'll need to change models over time:
                <blockquote>
                  "Maintaining the ability to hot swap models for different purposes, whether they're in the same model
                  family or across different providers, is of utmost importance."
                </blockquote>
              </li>
            </ol>

            <h2 id="conclusion">Conclusion: Navigating Complexity</h2>
            <p>
              The emergence of Deep Sea represents more than just a new AI model—it's a reflection of how AI development
              has become intertwined with global politics, economic factors, and competing visions for the future of
              technology.
            </p>

            <p>
              For developers and organizations, the key lesson is adaptability. The AI landscape will continue to evolve
              rapidly, and those who build flexible, model-agnostic systems will be best positioned to navigate these
              changes while delivering consistent value.
            </p>

            <p>
              As one of the speakers summarized: "Let the wars play out at the foundational layer and the domain layers.
              And I think staying close to the application layer is where we can make the greatest impact."
            </p>

            <hr />

            <p>
              <em>
                What are your thoughts on Deep Sea and the changing AI landscape? Have you implemented model-agnostic
                approaches in your AI applications? Share your experiences in the comments below.
              </em>
            </p>

            <hr />

            <p>
              <strong>Tags:</strong> #AI #DeepSea #ModelAgnostic #AIEthics #TechTrends #AIEngineering
            </p>
          </div>
        </div>
        {/* Add MDX speed reading component specifically for this page */}
        <MDXSpeedReading contentId="deep-sea-ai-content" className="hidden" />
      </BlogPostTracker>
    </BlogLayout>
  )
}
