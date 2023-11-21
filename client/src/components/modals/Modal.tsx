import React, { useCallback, useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  body: React.ReactElement;
  footer?: React.ReactElement;
  title?: string;
}

const Modals: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  body,
  footer,
  title,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        className="
        fixed
    inset-0
    flex
    items-center
    justify-center
    z-[1000]
    bg-black/40
    px-4
    
        "
      >
        <div
          className={`
            w-full
            max-w-xl
            h-auto
            max-h-full
            overflow-y-auto
            overflow-x-hidden
            mx-auto
            rounded-xl
            bg-white
            modal-scrollbar
            text-black
            relative
            transition
            duration-300
            shadow-lg
            ${showModal ? "translate-y-0" : "translate-y-full"}
            ${showModal ? "opacity-100" : "opacity-0"}
            `}
        >
          <div
            className={`flex items-center ${
              title ? "justify-between" : "justify-end"
            } p-4 md:p-5 border-b rounded-t`}
          >
            <h3 className="text-xl font-semibold text-black">
              {title}
            </h3>
            <button
              type="button"
              className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              data-modal-hide="authentication-modal"
            >
              <MdClose size={24} color="#444" onClick={handleClose} />
            </button>
          </div>
          
          <div className="p-4">{body}</div>

          <div>{footer}</div>
        </div>
      </div>
    </>
  );
};

export default Modals;
