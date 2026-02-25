"use client";

import { useState } from "react";
import { Link, Linkedin, Share2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ShareButtonsProps {
  url: string;
  title: string;
  description?: string;
}

export function ShareButtons({ url, title, description }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description ?? "");

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;

  function openShareWindow(shareUrl: string) {
    window.open(shareUrl, "_blank", "noopener,noreferrer,width=600,height=400");
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = url;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-muted-foreground">
        Share this article
      </span>
      <div className="flex items-center gap-1.5">
        {/* Twitter / X */}
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => openShareWindow(twitterUrl)}
          aria-label="Share on X (Twitter)"
          className="rounded-full text-muted-foreground hover:text-foreground hover:bg-muted"
        >
          <svg
            viewBox="0 0 24 24"
            className="size-4"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </Button>

        {/* Facebook */}
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => openShareWindow(facebookUrl)}
          aria-label="Share on Facebook"
          className="rounded-full text-muted-foreground hover:text-foreground hover:bg-muted"
        >
          <Share2 className="size-4" />
        </Button>

        {/* LinkedIn */}
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => openShareWindow(linkedinUrl)}
          aria-label="Share on LinkedIn"
          className="rounded-full text-muted-foreground hover:text-foreground hover:bg-muted"
        >
          <Linkedin className="size-4" />
        </Button>

        {/* Copy Link */}
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={copyLink}
          aria-label={copied ? "Link copied" : "Copy link"}
          className="rounded-full text-muted-foreground hover:text-foreground hover:bg-muted"
        >
          {copied ? (
            <Check className="size-4 text-green-600" />
          ) : (
            <Link className="size-4" />
          )}
        </Button>
        {copied && (
          <span className="text-xs text-green-600 font-medium animate-in fade-in">
            Copied!
          </span>
        )}
      </div>
    </div>
  );
}
