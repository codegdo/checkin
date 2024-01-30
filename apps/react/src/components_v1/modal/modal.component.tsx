import { PropsWithChildren } from "react";
import { ModalProps, useModalState } from "./hooks";
import { ModalContent } from "./modal.content";
import { ModalContext } from "./contexts";

export function Modal({ children, ...props }: PropsWithChildren<ModalProps>) {
  const context = useModalState({ ...props });

  return (
    <ModalContext.Provider value={context}>
      <div>
        {children || <ModalContent />}
      </div>
    </ModalContext.Provider>
  );
}

// npx madge src/components_v1/modal/modal.component.tsx --image src/components_v1/modal/modal.graph.png --warning