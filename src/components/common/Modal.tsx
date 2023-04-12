import React, { ReactNode } from "react";
import { createPortal } from "react-dom";

const ModalPortal = ({ children }: { children: ReactNode }) => {
  const existingContainerDiv = document.querySelector(`#modal-container`);

  return createPortal(children, existingContainerDiv as Element);
};

interface Props {
  onClose: () => void;
  children: ReactNode;
}

const Modal = ({ onClose, children }: Props) => {
  return (
    <ModalPortal>
      <div
        className="fixed top-0 left-0 right-0 bottom-0 bg-[#00000030] z-[1]"
        onClick={() => onClose()}
      >
        <div
          className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white border-2"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {children}
        </div>
      </div>
    </ModalPortal>
  );
};

export default Modal;
