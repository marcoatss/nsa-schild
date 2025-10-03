import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const ToasterComponent = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "relative p-4 rounded-none border border-border bg-background flex items-center gap-4 right-3 bottom-3 select-none",
          title: "text-sm font-medium",
          description: "text-sm text-muted-foreground font-medium",
          actionButton:
            "shrink-0 text-nowrap p-2 border border-border-light text-xs font-bold uppercase hover:bg-foreground/20 active:bg-foreground/40",
          closeButton:
            "absolute left-[calc(100%-1.25rem)] top-1 h-4 w-4 border-none translate-x-0 translate-y-0",
        },
      }}
      {...props}
    />
  );
};

export { ToasterComponent };
