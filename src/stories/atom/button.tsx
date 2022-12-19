import React from "react";

type ButtonProps = {
  children: React.ReactNode;
};

function Button(props: ButtonProps) {
  const { children } = props;
  return <button>{children}</button>;
}

export default Button;
