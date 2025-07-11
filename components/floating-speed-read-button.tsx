"use client";

import { useState } from "react";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SpeedReadingMode } from "@/components/speed-reading/speed-reading-mode";
import { cn } from "@/lib/utils";
import { useScrollPosition } from "@/hooks/use-scroll-position";

interface FloatingSpeedReadButtonProps {
  slug?: string;
  className?: string;
  contentSelector?: string;
  selector?: string;
}

export function FloatingSpeedReadButton(
  { slug, className }: FloatingSpeedReadButtonProps,
) {
  const [showSpeedReader, setShowSpeedReader] = useState(false);
  const [content, setContent] = useState("");
  const scrollPosition = useScrollPosition();
  const showButton = scrollPosition.y > 100;

  // Extract content from the blog post when the button is clicked
  const handleOpenSpeedReader = () => {
    // Find the blog content element
    const contentElement = document.querySelector(
      `[data-blog-slug="${slug}"], [data-blog-content], .speed-reading-content, .prose, article`,
    );

    if (contentElement) {
      // Get the text content
      const extractedContent = contentElement.textContent || "";
      setContent(extractedContent);
      setShowSpeedReader(true);
    } else {
      console.error("Could not find blog content element");
    }
  };

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className={cn(
          "fixed bottom-6 right-6 z-40 rounded-full shadow-md transition-all duration-300",
          showButton
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none",
          className,
        )}
        onClick={handleOpenSpeedReader}
        aria-label="Speed Read"
      >
        <BookOpen className="h-5 w-5" />
      </Button>

      {showSpeedReader && (
        <SpeedReadingMode
          content={content}
          onClose={() => setShowSpeedReader(false)}
          blogSlug={slug}
          contentSelector={`[data-blog-slug="${slug}"], [data-blog-content], .speed-reading-content`}
        />
      )}
    </>
  );
}
