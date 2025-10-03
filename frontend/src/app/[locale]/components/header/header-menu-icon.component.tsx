import Bars3Icon from "@heroicons/react/24/outline/Bars3Icon";

import { Link } from "@/components/navigation";

export interface HeaderMenuIconProps {
  className?: string;
  onClick?: () => void;
  open?: boolean;
}

export const HeaderMenuIconComponent: React.FC<HeaderMenuIconProps> = ({
  className,
  onClick,
  open,
}: HeaderMenuIconProps) => {
  return (
    <Link
      href=""
      className={`
        flex items-center justify-center

        hover:bg-foreground hover:text-white

        ${open && `bg-foreground text-background`}
        ${className}
      `}
      onClick={onClick}
    >
      <Bars3Icon className="h-5 w-5" />
    </Link>
  );
};
