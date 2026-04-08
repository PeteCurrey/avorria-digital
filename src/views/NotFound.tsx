'use client';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Home, FileText } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background via-secondary to-background px-6">
      <div className="max-w-2xl text-center space-y-8">
        {/* 404 Large Text */}
        <div className="relative">
          <h1 className="text-9xl font-light text-foreground/10 select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-2xl font-semibold text-accent">Page not found</div>
          </div>
        </div>

        {/* Message */}
        <div className="space-y-4">
          <h2 className="text-3xl lg:text-4xl font-semibold text-foreground">
            You've found a dead URL.
          </h2>
          <p className="text-lg text-muted-foreground max-w-lg mx-auto">
            The good news is we're much better at fixing websites than maintaining this one. Let's get you back on track.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <Button variant="accent" size="lg" asChild>
            <Link href="/">
              <Home className="mr-2" size={20} />
              Back to Home
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/services">
              View Services
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/resources">
              <FileText className="mr-2" size={20} />
              Browse Resources
            </Link>
          </Button>
        </div>

        {/* Help Text */}
        <p className="text-sm text-muted-foreground pt-8">
          If you think this page should exist,{" "}
          <Link href="/contact" className="text-accent hover:underline">
            let us know
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default NotFound;


