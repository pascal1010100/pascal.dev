import * as React from "react";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={`border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-primary ${className || ""}`}
      {...props}
    />
  )
);

Input.displayName = "Input";
