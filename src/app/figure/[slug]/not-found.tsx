import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function FigureNotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <div className="text-8xl font-bold text-muted-foreground/20 mb-4">404</div>
      <h1 className="text-3xl font-bold mb-2">Figure Not Found</h1>
      <p className="text-muted-foreground mb-8 max-w-md mx-auto">
        We couldn&apos;t find this public figure. They may not be tracked yet
        or the URL may be incorrect.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button asChild>
          <Link href="/directory">Browse Directory</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/contribute">Suggest a Figure</Link>
        </Button>
      </div>
    </div>
  );
}
