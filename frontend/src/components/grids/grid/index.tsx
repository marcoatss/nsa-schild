import { cloneElement, isValidElement, useMemo } from "react";

import styles from "./style.module.css";

export interface GridProps {
  children: React.ReactElement<{ className?: string }>[];
  className?: string;
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
}

export const GridComponent: React.FC<GridProps> = ({
  children,
  className,
  cols = 4,
}: GridProps) => {
  const gridColsClassName = useMemo(() => {
    switch (cols) {
      case 1:
        return "grid-cols-1";
      case 2:
        return "grid-cols-2";
      case 3:
        return "grid-cols-3";
      case 4:
        return "grid-cols-4";
      case 5:
        return "grid-cols-5";
      case 6:
        return "grid-cols-6";
      case 7:
        return "grid-cols-7";
      case 8:
        return "grid-cols-8";
      case 9:
        return "grid-cols-9";
      case 10:
        return "grid-cols-10";
      case 11:
        return "grid-cols-11";
      case 12:
        return "grid-cols-12";
    }
  }, [cols]);

  const cells = children.map((child) => {
    if (isValidElement(child)) {
      return cloneElement<{ className?: string }>(child, {
        className: `${styles.grid_item} ${child.props.className ?? ""}`,
      });
    }

    return child;
  });

  return (
    <div
      className={`
        grid grid-cols-1

        ${gridColsClassName}
        ${styles.grid}
        ${className ?? ""}
      `}
    >
      {cells}
    </div>
  );
};
