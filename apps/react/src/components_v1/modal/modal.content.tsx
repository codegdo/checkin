import { useModalContext } from "./hooks";
import { ModalAlert } from "./modal.alert";
import { ModalConfirm } from "./modal.confirm";
import { ModalFooter } from "./modal.footer";
import { ModalForm } from "./modal.form";
import { ModalGridView } from "./modal.gridview";
import { ModalHeader } from "./modal.header";
import { ModalPrompt } from "./modal.prompt";

export function ModalContent() {
  const context = useModalContext();

  let modalContent;

  switch (context?.type) {
    case 'ALERT':
      modalContent = <ModalAlert />;
      break;
    case 'CONFIRM':
      modalContent = <ModalConfirm />;
      break;
    case 'PROMPT':
      modalContent = <ModalPrompt />;
      break;
    case 'GRIDVIEW':
      modalContent = <ModalGridView />;
      break;
    case 'FORM':
      modalContent = <ModalForm />;
      break;
    default:
      modalContent = null;
      break;
  }

  return (
    <>
      <ModalHeader />
      {
        modalContent
      }
      <ModalFooter />
    </>
  );
}