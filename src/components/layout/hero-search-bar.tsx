"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export function HeroSearchBar() {
  const [focused, setFocused] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative max-w-lg mx-auto">
      <motion.div
        className="absolute -inset-1 rounded-xl bg-[image:var(--gradient-hero)] opacity-0 blur-lg"
        animate={{ opacity: focused ? 0.3 : 0 }}
        transition={{ duration: 0.3 }}
      />
      <div className="relative flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            type="search"
            name="q"
            placeholder="Search public figures, statements, actions..."
            className="h-12 pl-10 text-base backdrop-blur-md border-[color:var(--glass-border)] bg-[color:var(--glass-bg)]"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
        </div>
        <Button type="submit" size="lg" className="h-12 px-6">
          Search
        </Button>
      </div>
    </form>
  );
}
