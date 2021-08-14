import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

const Modal = ({ open, handleClose, children, ...props }) => {
  const elRef = useRef();
  const propsChildrenRef = useRef();
  const firstRender = useRef(true);

  const checkClick = (e) => {
    //if (childrenRef.current[0]?.contains(e.target)) {
    if (elRef.current.children[0]?.contains(e.target)) {
      console.log("INSIDE MODAL CLICK ✅");
      console.dir(e.target);
    } else {
      //debugger;
      console.log("OUTSIDE MODAL CLICK ❌");
      if (firstRender.current) {
        firstRender.current = false;
        return;
      }
      handleClose();
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

  useEffect(() => {
    console.dir(props.children);
    //propsChildrenRef.current = props.children.ref;
    //console.dir(propsChildrenRef.current);
    return () => {};
  }, []);

  const childrenRef = useRef([]);

  useEffect(() => {
    console.log("Form Children", childrenRef.current);
  }, []);

  return ReactDOM.createPortal(
    <div className="absolute top-0 left-0 z-50 w-full h-full bg-black bg-opacity-50" ref={elRef}>
      {/* props */}
      {children}
      {/* <>
        {React.Children.map(children, (child, index) =>
          React.cloneElement(child, {
            ref: (ref) => (childrenRef.current[index] = ref),
          })
        )}
      </> */}
    </div>,
    document.body
  );
};
export default Modal;

//absolute top-0 left-0 z-50 flex items-center justify-center bg-green-300 w-96 h-96
