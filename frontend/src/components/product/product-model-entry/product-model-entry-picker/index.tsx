import MinusIcon from "@heroicons/react/24/outline/MinusIcon";
import PlusIcon from "@heroicons/react/24/outline/PlusIcon";
import { ChangeEvent, useCallback } from "react";

import { ButtonComponent } from "@/components/button";
import { InputComponent } from "@/components/input";

export interface ProductModelEntryPickerProps {
  onMinusButtonClick: () => void;
  onPlusButtonClick: () => void;
  onChange: (value: number) => void;
  count: number;
}

export const ProductModelEntryPickerComponent: React.FC<
  ProductModelEntryPickerProps
> = ({
  onMinusButtonClick,
  onPlusButtonClick,
  onChange,
  count,
}: ProductModelEntryPickerProps) => {
  const handleMinusButtonClick = useCallback(() => {
    if (count >= 2) {
      onMinusButtonClick();
    }
  }, [count, onMinusButtonClick]);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(event.target.value);

      onChange(isNaN(value) || value <= 0 ? 1 : value);
    },
    [onChange],
  );

  return (
    <div className="flex w-full border border-border/25">
      <ButtonComponent
        disabled={count == 1}
        variant="default"
        className="z-0 basis-1/3 border-none"
        onClick={handleMinusButtonClick}
      >
        <MinusIcon className={`h-4 w-4`} />
      </ButtonComponent>
      <InputComponent
        type="number"
        className={`
          z-10 basis-1/3 border-x border-y-0 border-x-border/25 text-center
          font-semibold

          [&::-webkit-inner-spin-button]:appearance-none
          [&::-webkit-outer-spin-button]:appearance-none

          [appearance:textfield]
        `}
        onChange={handleChange}
        value={count}
      />
      <ButtonComponent
        variant="default"
        className="z-0 basis-1/3 border-none"
        onClick={onPlusButtonClick}
      >
        <PlusIcon className="h-4 w-4" />
      </ButtonComponent>
    </div>
  );
};
