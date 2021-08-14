import gsap from "gsap/gsap-core";
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

const Modal = React.forwardRef(({ open, handleClose, children, ...props }, ref) => {
  const elRef = useRef();
  const propsChildrenRef = useRef();
  const firstRender = useRef(true);

  const checkClick = (e) => {
    //if (childrenRef.current[0]?.contains(e.target)) {
    if (elRef.current?.children[0]?.contains(e.target)) {
      console.log("INSIDE MODAL CLICK ✅");
      console.dir(e.target);
    } else {
      //debugger;
      console.log("OUTSIDE MODAL CLICK ❌");
      if (firstRender.current) {
        firstRender.current = false;
        return;
      }
      handleCloseAnimation();
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

  ///animacje
  React.useLayoutEffect(() => {
    gsap.from(elRef.current, { opacity: 0, duration: 0.3 });
    gsap.from(elRef.current.children, { y: "100%", duration: 0.6 });
    console.log("Animuje w Modalu...");
  }, []);

  //animacja out - nadpisuje funkcje wychodzenia i dodaje on complete
  const handleCloseAnimation = () => {
    gsap.to(elRef.current, { backgroundColor: "transparent", duration: 2.5, onComplete: handleClose });
    gsap.to(elRef.current.children, { y: "100%", duration: 0.6 });
  };

  const childrenRef = useRef([]);

  useEffect(() => {
    console.log("Form Children", childrenRef.current);
    //children.props.handleClose = handleCloseAnimation;
  }, []);

  return ReactDOM.createPortal(
    <div
      ref={elRef}
      className="absolute top-0 left-0 z-50 w-full h-full overflow-hidden bg-black bg-opacity-50">
      {/* props */}
      <>{React.cloneElement(children, { handleClose: handleCloseAnimation })}</>
      {/* {children} */}
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
});
export default Modal;

//absolute top-0 left-0 z-50 flex items-center justify-center bg-green-300 w-96 h-96
