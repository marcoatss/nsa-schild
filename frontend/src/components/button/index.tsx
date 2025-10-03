import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  `
    inline-flex select-none items-center justify-center whitespace-nowrap
    text-sm font-bold uppercase ring-offset-background transition-colors

    disabled:pointer-events-none disabled:opacity-50

    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
    focus-visible:ring-offset-2
  `,
  {
    variants: {
      variant: {
        default: `
          bg-primary text-primary-foreground

          active:brightness-150

          disabled:bg-primary/10 disabled:text-primary disabled:opacity-100

          hover:brightness-125
        `,
        destructive: `
          border border-destructive bg-background text-destructive
          text-foreground

          active:bg-destructive/20

          hover:bg-destructive/10
        `,
        outline: `
          border border-input bg-background

          hover:bg-accent hover:text-accent-foreground
        `,
        secondary: `
          border border-border/25 bg-secondary text-secondary-foreground

          active:brightness-90

          hover:brightness-95
        `,
        accent: `
          border border-border/25 bg-accent text-accent-foreground

          active:brightness-90

          hover:brightness-95
        `,
        link: `
          text-primary underline-offset-4

          hover:underline
        `,
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const ButtonComponent = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
ButtonComponent.displayName = "Button";

export { ButtonComponent, buttonVariants };
