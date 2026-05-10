// Button — single component covering every variant the
// platform needs. Replaces 227 inline-styled `<button>`
// definitions scattered across the codebase.
//
// Variants:
//   - primary:   filled accent — main CTA per surface
//   - secondary: outlined — supporting CTA
//   - ghost:     text-only — toolbar / icon-button rows
//   - danger:    filled red — destructive action
//   - unstyled:  zero built-in styles — operator passes the
//                full className. Use when the button is
//                non-canonical: a hidden focus target, a
//                circular colour swatch, a clickable backdrop
//                overlay, a layout row that happens to be
//                clickable. Drops every built-in class so
//                operator-supplied `className` wins without
//                conflict.
//
// Sizes: sm (compact toolbar / chip) | md (default) | lg
// (hero CTA inside an empty state). Ignored on `unstyled`.

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { Loader2 } from "lucide-react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "danger"
  | "unstyled";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Optional leading icon (lucide-react ~14-16px). Render
   *  null when carrying only text. */
  leadingIcon?: ReactNode;
  /** Optional trailing icon — typically a chevron / arrow. */
  trailingIcon?: ReactNode;
  /** When `true`, swaps the leading icon for a spinner and
   *  forces `disabled` so the operator can't double-fire. */
  busy?: boolean | undefined;
  /** Children are optional because the `unstyled` variant
   *  is occasionally used as a bare clickable surface
   *  (backdrop overlay, hidden focus target, colour swatch).
   *  Standard variants should always pass a label. */
  children?: ReactNode;
}

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary: "bg-accent text-white hover:bg-accent-hover disabled:bg-text-meta",
  secondary:
    "border bg-panel text-text-primary hover:bg-panel-hover disabled:opacity-50",
  ghost:
    "bg-transparent text-text-secondary hover:bg-panel-alt hover:text-text-primary disabled:opacity-50",
  danger: "bg-danger text-white hover:bg-danger/90 disabled:bg-text-meta",
  unstyled: "",
};

const SIZE_CLASS: Record<ButtonSize, string> = {
  sm: "px-2 py-1 text-[11px] gap-1",
  md: "px-3 py-1.5 text-sm gap-1.5",
  lg: "px-4 py-2 text-sm gap-2",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = "primary",
    size = "md",
    leadingIcon,
    trailingIcon,
    busy,
    disabled,
    children,
    className = "",
    type = "button",
    ...rest
  },
  ref,
) {
  const iconSize = size === "sm" ? 11 : size === "lg" ? 14 : 12;
  // The unstyled variant strips every built-in class so the
  // operator's `className` is the only styling — useful for
  // backdrop overlays, hidden focus targets, colour-swatch
  // pickers, layout rows that happen to be clickable.
  const baseClasses =
    variant === "unstyled"
      ? className
      : [
          "inline-flex items-center justify-center rounded font-medium transition-colors",
          "disabled:cursor-not-allowed",
          SIZE_CLASS[size],
          VARIANT_CLASS[variant],
          className,
        ].join(" ");
  return (
    <button
      ref={ref}
      type={type}
      disabled={busy || disabled}
      className={baseClasses}
      {...rest}
    >
      {busy ? (
        <Loader2 size={iconSize} className="animate-spin" />
      ) : (
        leadingIcon
      )}
      {children}
      {!busy && trailingIcon}
    </button>
  );
});

export default Button;
