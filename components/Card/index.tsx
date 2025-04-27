import React, { ReactElement, ReactHTMLElement, ReactNode } from "react";

export default function Card({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className?: React.ComponentProps<"div">["className"];
}>) {
  return (
    <div className={`rounded-2xl shadow-md p-4 ${className}`}>{children}</div>
  );
}
