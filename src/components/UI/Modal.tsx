import { FC } from "react";
import ReactDom from "react-dom";

import classes from "./Modal.module.css";

const Backdrop: FC<{ onClick: () => void }> = ({ onClick }) => {
  return <div className={classes.backdrop} onClick={onClick} />;
};

const ModalOverlay: FC = ({ children }) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{children}</div>
    </div>
  );
};

const overlaysElement = document.getElementById("overlays");

const Modal: FC<{ onClick: () => void }> = ({ onClick, children }) => {
  return (
    <>
      {ReactDom.createPortal(<Backdrop onClick={onClick} />, overlaysElement!)}
      {ReactDom.createPortal(
        <ModalOverlay>{children}</ModalOverlay>,
        overlaysElement!
      )}
    </>
  );
};

export default Modal;
