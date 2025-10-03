import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as React from "react";

import { cn } from "@/lib/utils";

const DialogComponent = DialogPrimitive.Root;

const DialogTriggerComponent = DialogPrimitive.Trigger;

const DialogPortalComponent = DialogPrimitive.Portal;

const DialogCloseComponent = DialogPrimitive.Close;

const DialogOverlayComponent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      `
        fixed inset-0 z-[150] bg-black/80

        data-[state=closed]:animate-out data-[state=closed]:fade-out-0

        data-[state=open]:animate-in data-[state=open]:fade-in-0
      `,
      className,
    )}
    {...props}
  />
));

DialogOverlayComponent.displayName = DialogPrimitive.Overlay.displayName;

const DialogContentComponent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortalComponent>
    <DialogOverlayComponent />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        `
          fixed left-[50%] top-[50%] z-[150] grid translate-x-[-50%]
          translate-y-[-50%] gap-4 duration-200

          data-[state=closed]:animate-out data-[state=closed]:fade-out-0
          data-[state=closed]:zoom-out-95
          data-[state=closed]:slide-out-to-left-1/2
          data-[state=closed]:slide-out-to-top-[48%]

          data-[state=open]:animate-in data-[state=open]:fade-in-0
          data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-left-1/2
          data-[state=open]:slide-in-from-top-[48%]
        `,
        className,
      )}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  </DialogPortalComponent>
));

DialogContentComponent.displayName = DialogPrimitive.Content.displayName;

const DialogHeaderComponent = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      `
        flex flex-col space-y-1.5 text-center

        sm:text-left
      `,
      className,
    )}
    {...props}
  />
);

DialogHeaderComponent.displayName = "DialogHeader";

const DialogFooterComponent = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      `
        flex flex-col-reverse

        sm:flex-row sm:justify-end sm:space-x-2
      `,
      className,
    )}
    {...props}
  />
);

DialogFooterComponent.displayName = "DialogFooter";

const DialogTitleComponent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className,
    )}
    {...props}
  />
));

DialogTitleComponent.displayName = DialogPrimitive.Title.displayName;

const DialogDescriptionComponent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));

DialogDescriptionComponent.displayName =
  DialogPrimitive.Description.displayName;

export {
  DialogComponent,
  DialogPortalComponent,
  DialogOverlayComponent,
  DialogCloseComponent,
  DialogTriggerComponent,
  DialogContentComponent,
  DialogHeaderComponent,
  DialogFooterComponent,
  DialogTitleComponent,
  DialogDescriptionComponent,
};
