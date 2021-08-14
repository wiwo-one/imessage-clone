import React from "react";

export const MenuHeader = (props) => {
  return <div className="rounded-[14px] sm:w-[640px] mt-4 my-0 p-4 w-full">{props.children}</div>;
};

export const MenuGroup = (props) => {
  return <div className="rounded-[14px] bg-imessage-gray sm:w-[640px] mt-4 p-4 w-full">{props.children}</div>;
};

export const MenuGroupButton = ({ className, disable, ...props }) => {
  return (
    <div className={`rounded-[14px] bg-imessage-gray mt-4 p-4 px-8 ${className}`} {...props}>
      {props.children}
    </div>
  );
};

export const MenuGroupElement = ({ ...props }) => {
  return (
    <div
      className="flex items-center justify-between w-full py-2 border-b border-gray-300 last:pb-0 first:pt-0 last:border-0"
      {...props}>
      {props.children}
    </div>
  );
};

export const Left = ({ type = "normal", ...props }) => {
  switch (type) {
    case "edit":
      return <p className="font-normal text-gray-700">{props.children}</p>;
    default:
      return <p className="font-bold text-gray-700">{props.children}</p>;
  }
};

export const Right = ({ type = "normal", ...props }) => {
  switch (type) {
    case "edit":
      return <p className="flex-grow pl-4 text-base text-gray-600 break-all">{props.children}</p>;

    default:
      return <p className="pl-4 text-sm text-right text-gray-600 break-all">{props.children}</p>;
  }
  return <p className="pl-4 text-sm text-right text-gray-600 break-all">{props.children}</p>;
};

export const Edit = () => {
  const Left = (props) => {
    return <p className="font-normal text-gray-700">{props.children}</p>;
  };

  //   return <p className="font-bold text-gray-700">{props.children}</p>;
};
