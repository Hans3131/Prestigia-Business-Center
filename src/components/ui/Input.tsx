import { forwardRef } from "react";
import type {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  SelectHTMLAttributes,
  ReactNode,
} from "react";
import { cn } from "@/lib/utils";

const fieldBase =
  "w-full bg-transparent border-b border-navy/20 px-0 py-3 font-sans text-sm text-navy placeholder:text-warmgray focus:border-gold focus:outline-none transition-colors duration-300";

const fieldDark =
  "w-full bg-transparent border-b border-ivory/25 px-0 py-3 font-sans text-sm text-ivory placeholder:text-ivory/50 focus:border-gold focus:outline-none transition-colors duration-300";

type FieldWrapProps = {
  label?: string;
  children: ReactNode;
  dark?: boolean;
  className?: string;
};

export function Field({ label, children, dark = false, className }: FieldWrapProps) {
  return (
    <label className={cn("block space-y-2", className)}>
      {label && (
        <span
          className={cn(
            "block text-[11px] font-sans uppercase tracking-[0.22em]",
            dark ? "text-ivory/70" : "text-warmgray"
          )}
        >
          {label}
        </span>
      )}
      {children}
    </label>
  );
}

type InputProps = InputHTMLAttributes<HTMLInputElement> & { dark?: boolean };

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, dark = false, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(dark ? fieldDark : fieldBase, className)}
      {...props}
    />
  )
);
Input.displayName = "Input";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  dark?: boolean;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, dark = false, rows = 4, ...props }, ref) => (
    <textarea
      ref={ref}
      rows={rows}
      className={cn(
        dark ? fieldDark : fieldBase,
        "resize-none",
        className
      )}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  dark?: boolean;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, dark = false, children, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(
        dark ? fieldDark : fieldBase,
        "appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23C9A84C%22 stroke-width=%221.5%22><path d=%22M6 9l6 6 6-6%22/></svg>')] bg-[right_0_center] bg-no-repeat pr-8",
        className
      )}
      {...props}
    >
      {children}
    </select>
  )
);
Select.displayName = "Select";
