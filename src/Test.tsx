import React from "react";

export type MyComponentProps = {
  label: string;
};

export function MyComponent({ label }: MyComponentProps) {
  return <button>{label}</button>;
}
