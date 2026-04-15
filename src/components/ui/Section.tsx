import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  id?: string;
  dark?: boolean;
};

export function Section({
  as: Tag = "section",
  children,
  className,
  innerClassName,
  id,
  dark = false,
}: SectionProps) {
  return (
    <Tag
      id={id}
      className={cn(
        "relative py-24 md:py-32",
        dark ? "bg-navy text-ivory" : "bg-ivory text-navy",
        className
      )}
    >
      <div
        className={cn(
          "mx-auto w-full max-w-7xl px-6 md:px-10",
          innerClassName
        )}
      >
        {children}
      </div>
    </Tag>
  );
}
