import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const TextareaComponent = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          `
            flex min-h-[80px] w-full border border-input bg-background px-3 py-2
            text-sm font-medium ring-offset-background

            disabled:cursor-not-allowed disabled:opacity-50

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

TextareaComponent.displayName = "Textarea";

export { TextareaComponent };
