import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  align?: "left" | "center";
};

export function SectionLabel({ children, className, align = "left" }: Props) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 text-gold font-sans text-[11px] font-medium uppercase tracking-[0.3em]",
        align === "center" && "justify-center",
        className
      )}
    >
      <span aria-hidden className="h-px w-8 bg-gold/60" />
      <span>{children}</span>
    </div>
  );
}
