import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "light" | "dark" | "gold" | "outline";

const variants: Record<Variant, string> = {
  light: "bg-cream text-navy border border-navy/5",
  dark: "bg-navy text-ivory",
  gold: "bg-gold text-navy",
  outline: "border border-navy/15 text-navy",
};

type Props = {
  children: ReactNode;
  className?: string;
  variant?: Variant;
  interactive?: boolean;
};

export function Card({
  children,
  className,
  variant = "light",
  interactive = false,
}: Props) {
  return (
    <div
      className={cn(
        "relative rounded-sm p-8 md:p-10 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        variants[variant],
        interactive &&
          "hover:-translate-y-1 hover:shadow-[0_24px_50px_-24px_rgba(11,26,46,0.25)] cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
}
