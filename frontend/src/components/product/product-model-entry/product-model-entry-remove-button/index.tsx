"use client";

import { useCallback, useState } from "react";

import { ButtonComponent } from "@/components/button";

export interface ProductModelEntryRemoveButtonProps {
  text: string;
  confirmationText: string;
  onClick: () => void;
}

export const ProductModelEntryRemoveButtonComponent = ({
  text,
  confirmationText,
  onClick,
}: ProductModelEntryRemoveButtonProps) => {
  const [confirmation, setConfirmation] = useState(false);

  const handleClick = useCallback(() => {
    if (confirmation) {
      onClick();
      setConfirmation(false);
    } else {
      setConfirmation(true);
    }
  }, [confirmation, onClick]);

  return (
    <ButtonComponent variant="destructive" onClick={handleClick}>
      {confirmation ? confirmationText : text}
    </ButtonComponent>
  );
};
