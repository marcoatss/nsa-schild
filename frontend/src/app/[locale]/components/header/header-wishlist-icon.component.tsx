import HeartIcon from "@heroicons/react/24/outline/HeartIcon";
import { useEffect, useRef, useState } from "react";

import { Link } from "@/components/navigation";
import { useWishlistContext } from "@/contexts/wishlist";

export interface HeaderWishlistIconProps {
  className?: string;
}

export const HeaderWishlistIconComponent: React.FC<HeaderWishlistIconProps> = ({
  className,
}: HeaderWishlistIconProps) => {
  const {
    state: { count },
  } = useWishlistContext();

  const [show, setShow] = useState<boolean>(false);

  const prev = useRef(count);
  const timeout = useRef(setTimeout(() => null, 0));

  useEffect(() => {
    clearTimeout(timeout.current);

    if (count != prev.current) {
      setShow(true);
      timeout.current = setTimeout(() => setShow(false), 1000);
    }

    prev.current = count;
  }, [count]);

  return (
    <Link href="/wishlist" className={className}>
      <div className="group relative h-full w-full overflow-hidden">
        <div
          className={`
            absolute left-0 top-0 flex h-full w-full items-center justify-center
            transition-transform

            group-hover:translate-y-[-100%]

            ${show && `translate-y-[-100%]`}
          `}
        >
          <HeartIcon className="h-6 w-6" />
        </div>
        <div
          className={`
            absolute left-0 top-full flex h-full w-full items-center
            justify-center bg-foreground text-white transition-transform

            group-hover:translate-y-[-100%]

            ${show && `translate-y-[-100%]`}
          `}
        >
          <span className="text-sm font-semibold">{count}</span>
        </div>
      </div>
    </Link>
  );
};
