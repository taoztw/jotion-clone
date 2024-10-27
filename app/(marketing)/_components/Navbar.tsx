"use client";
import { cn } from "@/lib/utils";
import Logo from "./Logo";
import { useScrollTop } from "@/hooks/useScrollTop";
import { ModeToggle } from "@/components/ModeToggle";
import { useConvexAuth } from "convex/react";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/spinner";
import Link from "next/link";

function Navbar() {
  const scrolled = useScrollTop();
  const { isLoading, isAuthenticated } = useConvexAuth();

  return (
    <div
      className={cn(
        "flex items-center p-6 w-full fixed top-0 z-50 bg-background dark:bg-[#1F1F1F]",
        scrolled && "border-b shadow-sm"
      )}
    >
      <div className="hidden md:block">
        <Logo />
      </div>

      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
        {isLoading && <Spinner />}

        {!isAuthenticated && !isLoading && (
          <>
            <SignInButton mode="modal">
              <Button variant="ghost">Log in</Button>
            </SignInButton>

            <SignInButton mode="modal">
              <Button>Get Joshion free</Button>
            </SignInButton>
          </>
        )}
        {isAuthenticated && !isLoading && (
          <>
            <Button variant="ghost" asChild>
              <Link href="/documents">Enter Jotion</Link>
            </Button>
            <UserButton />
          </>
        )}
        <ModeToggle />
      </div>
    </div>
  );
}

export default Navbar;
