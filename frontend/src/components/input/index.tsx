import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const InputComponent = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          `
            flex h-10 w-full border border-input bg-background px-3 py-2 text-sm
            font-medium ring-offset-background

            disabled:cursor-not-allowed disabled:opacity-50

            file:border-0 file:bg-transparent file:text-sm file:font-medium

            focus-visible:outline-none focus-visible:ring-2
            focus-visible:ring-ring focus-visible:ring-offset-2

            placeholder:text-muted-foreground
          `,
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
InputComponent.displayName = "Input";

export { InputComponent };
