import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check, ChevronRight, Circle } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

const DropdownMenuComponent = DropdownMenuPrimitive.Root;

const DropdownMenuTriggerComponent = DropdownMenuPrimitive.Trigger;

const DropdownMenuGroupComponent = DropdownMenuPrimitive.Group;

const DropdownMenuPortalComponent = DropdownMenuPrimitive.Portal;

const DropdownMenuSubComponent = DropdownMenuPrimitive.Sub;

const DropdownMenuRadioGroupComponent = DropdownMenuPrimitive.RadioGroup;

const DropdownMenuSubTriggerComponent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      `
        flex cursor-default select-none items-center px-2 py-1.5 text-sm
        outline-none

        data-[state=open]:bg-secondary

        focus:bg-secondary
      `,
      inset && "pl-8",
      className,
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </DropdownMenuPrimitive.SubTrigger>
));

DropdownMenuSubTriggerComponent.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName;

const DropdownMenuSubContentComponent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      `
        z-[110] min-w-[8rem] overflow-hidden border bg-popover p-1
        text-popover-foreground

        data-[side=bottom]:slide-in-from-top-2

        data-[side=left]:slide-in-from-right-2

        data-[side=right]:slide-in-from-left-2

        data-[side=top]:slide-in-from-bottom-2

        data-[state=closed]:animate-out data-[state=closed]:fade-out-0
        data-[state=closed]:zoom-out-95

        data-[state=open]:animate-in data-[state=open]:fade-in-0
        data-[state=open]:zoom-in-95
      `,
      className,
    )}
    {...props}
  />
));

DropdownMenuSubContentComponent.displayName =
  DropdownMenuPrimitive.SubContent.displayName;

const DropdownMenuContentComponent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        `
          z-[110] min-w-[8rem] overflow-hidden border border-border bg-popover
          p-1 text-popover-foreground

          data-[side=bottom]:slide-in-from-top-2

          data-[side=left]:slide-in-from-right-2

          data-[side=right]:slide-in-from-left-2

          data-[side=top]:slide-in-from-bottom-2

          data-[state=closed]:animate-out data-[state=closed]:fade-out-0
          data-[state=closed]:zoom-out-95

          data-[state=open]:animate-in data-[state=open]:fade-in-0
          data-[state=open]:zoom-in-95
        `,
        className,
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));

DropdownMenuContentComponent.displayName =
  DropdownMenuPrimitive.Content.displayName;

const DropdownMenuItemComponent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      `
        relative flex cursor-default select-none items-center px-2 py-1.5
        text-sm font-medium outline-none transition-colors

        data-[disabled]:pointer-events-none data-[disabled]:opacity-50

        focus:bg-secondary focus:text-secondary-foreground
      `,
      inset && "pl-8",
      className,
    )}
    {...props}
  />
));

DropdownMenuItemComponent.displayName = DropdownMenuPrimitive.Item.displayName;

const DropdownMenuCheckboxItemComponent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      `
        relative flex cursor-default select-none items-center py-1.5 pl-8 pr-2
        text-sm outline-none transition-colors

        data-[disabled]:pointer-events-none data-[disabled]:opacity-50

        focus:bg-secondary focus:text-secondary-foreground
      `,
      className,
    )}
    checked={checked}
    {...props}
  >
    <span
      className={`absolute left-2 flex h-3.5 w-3.5 items-center justify-center`}
    >
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
));

DropdownMenuCheckboxItemComponent.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName;

const DropdownMenuRadioItemComponent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      `
        relative flex cursor-default select-none items-center py-1.5 pl-8 pr-2
        text-sm outline-none transition-colors

        data-[disabled]:pointer-events-none data-[disabled]:opacity-50

        focus:bg-secondary focus:text-secondary-foreground
      `,
      className,
    )}
    {...props}
  >
    <span
      className={`absolute left-2 flex h-3.5 w-3.5 items-center justify-center`}
    >
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
));

DropdownMenuRadioItemComponent.displayName =
  DropdownMenuPrimitive.RadioItem.displayName;

const DropdownMenuLabelComponent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className,
    )}
    {...props}
  />
));

DropdownMenuLabelComponent.displayName =
  DropdownMenuPrimitive.Label.displayName;

const DropdownMenuSeparatorComponent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-border-light", className)}
    {...props}
  />
));

DropdownMenuSeparatorComponent.displayName =
  DropdownMenuPrimitive.Separator.displayName;

const DropdownMenuShortcutComponent = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
      {...props}
    />
  );
};

DropdownMenuShortcutComponent.displayName = "DropdownMenuShortcut";

export {
  DropdownMenuComponent,
  DropdownMenuTriggerComponent,
  DropdownMenuContentComponent,
  DropdownMenuItemComponent,
  DropdownMenuCheckboxItemComponent,
  DropdownMenuRadioItemComponent,
  DropdownMenuLabelComponent,
  DropdownMenuSeparatorComponent,
  DropdownMenuShortcutComponent,
  DropdownMenuGroupComponent,
  DropdownMenuPortalComponent,
  DropdownMenuSubComponent,
  DropdownMenuSubContentComponent,
  DropdownMenuSubTriggerComponent,
  DropdownMenuRadioGroupComponent,
};
