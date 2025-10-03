import MagnifyingGlassIcon from "@heroicons/react/24/outline/MagnifyingGlassIcon";

import { Link } from "@/components/navigation";

export interface HeaderSearchIconProps {
  className?: string;
}

export const HeaderSearchIconComponent: React.FC<HeaderSearchIconProps> = ({
  className,
}: HeaderSearchIconProps) => {
  return (
    <Link
      href=""
      className={`
        flex items-center justify-center

        hover:bg-foreground hover:text-white

        ${className}
      `}
    >
      <MagnifyingGlassIcon className="h-5 w-5" />
    </Link>
  );
};
