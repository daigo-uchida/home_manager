import React from "react";
import "@/components/styles/modalModel.css";

type ModalModelProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};
const ModalModel = (props: ModalModelProps) => {
  const { isOpen, onClose, children } = props;
  if (!isOpen) return null;
  return (
    <div className="modal">
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/*子のイベントを親に伝えないようにする*/}
        <button className="modal-close" onClick={onClose}>
          x
        </button>
        {children}
      </div>
    </div>
  );
};
export default ModalModel;
