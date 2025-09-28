import type { CSSProperties } from "react";

export const defaultContainerStyle: CSSProperties = {
    backgroundColor: "var(--bg-color)",
    border: "0.06rem solid var(--border-color)",
    borderRadius: "0.75rem",
    display: "flex",
    flexDirection: "column",
    gap: "1vh",
    padding: "0.6rem 1rem",
    overflow: "auto",
    transition: "all 0.2s ease-in-out",
};

export const defaultContainerInputFieldStyle: CSSProperties = {
    width: "calc(100% + 2rem)",
    marginLeft: "-1rem",
    marginRight: "-1rem",
    borderBottom: "0.06rem solid var(--border-color)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: "0.25rem",
    gap: "0.6rem"
};

export const defaultInputFieldStyle: CSSProperties = {
    backgroundColor: "transparent",
    border: "none",
    width: "100%",
    outline: "none",
    fontSize: "1rem",
    padding: "0.75rem 0",
    fontFamily: "inherit"
}
