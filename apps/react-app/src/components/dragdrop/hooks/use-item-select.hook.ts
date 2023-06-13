import { useState } from "react";
//import { useClickOutside } from "../../../hooks";

export function useItemSelect(ref: any) {
  const [isSelect, setIsSelect] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  // useClickOutside(ref, () => {
  //   console.log('CLICK OUT SIDE BLOCK');
  // });

  return {
    isSelect,
    isEdit
  }
}