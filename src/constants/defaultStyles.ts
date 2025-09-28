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

export const defaultKbdStyle: CSSProperties = {
    backgroundColor: "var(--kbd-bg, #2e2e2e)",
    color: "var(--kbd-color, #f5f5f5)",
    border: "1px solid var(--kbd-border, #3d3d3d)",
    borderRadius: "6px",
    fontFamily: "monospace",
    fontSize: "0.85rem",
    padding: "0 0.4rem",
    lineHeight: 1.5,
    display: "inline-block",
    verticalAlign: "middle",
    justifyContent: "center",
    textAlign: "center"
}


export const defaultItemStyle: CSSProperties = {
    borderRadius: "0.375rem",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
    transition: "background-color 0.15 ease",
}