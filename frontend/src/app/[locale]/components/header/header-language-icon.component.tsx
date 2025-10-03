import { useLocale } from "next-intl";

import {
  DropdownMenuComponent,
  DropdownMenuContentComponent,
  DropdownMenuItemComponent,
  DropdownMenuLabelComponent,
  DropdownMenuSeparatorComponent,
  DropdownMenuTriggerComponent,
} from "@/components/dropdown-menu";
import { usePathname, useRouter } from "@/components/navigation";

export interface HeaderLanguageIconProps {
  className?: string;
}

export const HeaderLanguageIconComponent: React.FC<HeaderLanguageIconProps> = ({
  className,
}: HeaderLanguageIconProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  return (
    <DropdownMenuComponent>
      <DropdownMenuTriggerComponent
        className={`
          flex items-center justify-center text-xs font-semibold uppercase

          hover:bg-foreground hover:text-white

          ${className}
        `}
      >
        {locale == "en" ? "en" : "de"}
      </DropdownMenuTriggerComponent>
      <DropdownMenuContentComponent>
        <DropdownMenuLabelComponent>Language</DropdownMenuLabelComponent>
        <DropdownMenuSeparatorComponent />
        <DropdownMenuItemComponent
          onClick={() => router.push(pathname, { locale: "en" })}
        >
          English
        </DropdownMenuItemComponent>
        <DropdownMenuItemComponent
          onClick={() => router.push(pathname, { locale: "de" })}
        >
          German
        </DropdownMenuItemComponent>
      </DropdownMenuContentComponent>
    </DropdownMenuComponent>
  );
};
