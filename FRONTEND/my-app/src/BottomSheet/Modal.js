import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

const Modal = ({ open, handleClose, ...props }) => {
  const elRef = useRef();
  const [firstRender, setFirstRender] = useState(true);

  const checkClick = (e) => {
    if (elRef?.current?.contains(e.target)) {
      console.log("INSIDE MODAL CLICK ✅");
      console.dir(e.target);
    } else {
      //debugger;
      console.log("OUTSIDE MODAL CLICK ❌");
      //   if (firstRender) {
      //     setFirstRender(false);
      //     return;
      //   }
      //handleClose();
    }
  };

  useEffect(() => {
    document.addEventListener("click", checkClick);
    return () => {
      document.removeEventListener("click", checkClick);
    };
  }, []);

  const handleKeyDown = (evt) => {
    var isEscape = false;
    if ("key" in evt) {
      isEscape = evt.key === "Escape" || evt.key === "Esc";
    } else {
      isEscape = evt.keyCode === 27;
    }
    if (isEscape) {
      console.log("ESC PRESSED. key=" + evt.key + " keyCode=" + evt.keyCode);
      handleClose();
    }
  };
  useEffect(() => {
    //document.body.appendChild(elRef.current);
    //console.dir(elRef.current);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return ReactDOM.createPortal(
    <div
      className="absolute top-0 left-0 z-50 w-full h-full bg-black bg-opacity-50"
      onClick={() => {
        //console.log("OUTSIDE MODAL CLICK ❌");
      }}>
      {/* props */}
      <div className="" ref={elRef}>
        {props.children}
      </div>
    </div>,
    document.body
  );
};
export default Modal;

//absolute top-0 left-0 z-50 flex items-center justify-center bg-green-300 w-96 h-96
