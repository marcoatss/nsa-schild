import ChevronRightIcon from "@heroicons/react/24/outline/ChevronRightIcon";
import EllipsisHorizontalIcon from "@heroicons/react/24/outline/EllipsisHorizontalIcon";
import { Slot } from "@radix-ui/react-slot";
import {
  forwardRef,
  ComponentProps,
  ComponentPropsWithoutRef,
  ReactNode,
} from "react";

import { cn } from "@/lib/utils";

/* Breadcrumb Component */

const BreadcrumbComponent = forwardRef<
  HTMLElement,
  ComponentPropsWithoutRef<"nav"> & {
    separator?: ReactNode;
  }
>(({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />);

BreadcrumbComponent.displayName = "Breadcrumb";

/* Breadcrumb List Component */

const BreadcrumbListComponent = forwardRef<
  HTMLOListElement,
  ComponentPropsWithoutRef<"ol">
>(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn(
      `
        flex flex-wrap items-center gap-1.5 break-words text-sm
        text-muted-foreground

        sm:gap-2.5
      `,
      className,
    )}
    {...props}
  />
));

BreadcrumbListComponent.displayName = "BreadcrumbList";

/* Breadcrumb Item Component */

const BreadcrumbItemComponent = forwardRef<
  HTMLLIElement,
  ComponentPropsWithoutRef<"li">
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn("inline-flex items-center gap-1.5", className)}
    {...props}
  />
));

BreadcrumbItemComponent.displayName = "BreadcrumbItem";

/* Breadcrumb Link Component */

const BreadcrumbLinkComponent = forwardRef<
  HTMLAnchorElement,
  ComponentPropsWithoutRef<"a"> & {
    asChild?: boolean;
  }
>(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a";

  return (
    <Comp
      ref={ref}
      className={cn(
        `
          font-medium transition-colors

          hover:text-foreground
        `,
        className,
      )}
      {...props}
    />
  );
});

BreadcrumbLinkComponent.displayName = "BreadcrumbLink";

/* Breadcrumb Page Component */

const BreadcrumbPageComponent = forwardRef<
  HTMLSpanElement,
  ComponentPropsWithoutRef<"span">
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    role="link"
    aria-disabled="true"
    aria-current="page"
    className={cn("font-medium text-foreground", className)}
    {...props}
  />
));

BreadcrumbPageComponent.displayName = "BreadcrumbPage";

/* Breadcrumb Separator Component */

const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}: ComponentProps<"li">) => (
  <li role="presentation" aria-hidden="true" {...props}>
    {children ?? <ChevronRightIcon className="h-3 w-3" />}
  </li>
);

BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

/* Breadcrumb Ellipsis Component */

const BreadcrumbEllipsis = ({
  className,
  ...props
}: ComponentProps<"span">) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <EllipsisHorizontalIcon className="h-4 w-4" />
    <span className="sr-only">More</span>
  </span>
);

BreadcrumbEllipsis.displayName = "BreadcrumbElipssis";

export {
  BreadcrumbComponent,
  BreadcrumbListComponent,
  BreadcrumbItemComponent,
  BreadcrumbLinkComponent,
  BreadcrumbPageComponent,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};
