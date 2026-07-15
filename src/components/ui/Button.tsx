import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type Variant = "primary" | "secondary" | "ghost";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-ifood-darkBlue text-white hover:bg-ifood-royalBlue focus-visible:outline-ifood-royalBlue",
  secondary:
    "bg-ifood-lightBlue text-ifood-darkBlue hover:bg-[#7ed4f8] focus-visible:outline-ifood-darkBlue",
  ghost:
    "bg-transparent border border-ifood-darkBlue text-ifood-darkBlue hover:bg-ifood-darkBlue/5 focus-visible:outline-ifood-darkBlue",
};

const baseClasses =
  "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-[8px] px-6 py-3 font-display text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-soft active:translate-y-0 active:shadow-none motion-reduce:hover:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-none";

interface CommonProps {
  variant?: Variant;
  className?: string;
  children: ReactNode;
}

type ButtonAsLinkProps = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type ButtonAsButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

export type ButtonProps = ButtonAsLinkProps | ButtonAsButtonProps;

export function Button(props: ButtonProps) {
  const { variant = "primary", className, children, ...rest } = props;
  const classes = cn(baseClasses, variantClasses[variant], className);

  if ("href" in rest && rest.href) {
    const { href, ...anchorRest } = rest as ButtonAsLinkProps;
    const isAnchor = href.startsWith("#") || href.startsWith("http");
    if (isAnchor) {
      return (
        <a href={href} className={classes} {...anchorRest}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...anchorRest}>
        {children}
      </Link>
    );
  }

  const buttonRest = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button className={classes} {...buttonRest}>
      {children}
    </button>
  );
}
