import type { CSSProperties } from "react";

export const defaultContainerStyle: CSSProperties = {
    backgroundColor: "var(--container-bg, rgba(13,17,23,0.85))",
    border: "0.06rem solid var(--border-color)",
    borderRadius: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
    padding: "0.75rem 1rem",
    overflow: "hidden",
    maxHeight: "80vh",
    color: "var(--fg-color)",
    backdropFilter: "var(--container-blur, blur(12px))",
    boxShadow: "0 20px 40px rgba(0,0,0,0.35)",
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
    padding: "0.25rem 0",
    gap: "0.6rem",
};

export const defaultInputFieldStyle: CSSProperties = {
    backgroundColor: "transparent",
    border: "none",
    width: "100%",
    outline: "none",
    fontSize: "1rem",
    padding: "0.75rem 0",
    fontFamily: "inherit",
    color: "var(--fg-color)",
    caretColor: "var(--accent-color, #8b5cf6)",
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
    textAlign: "center",
}


export const defaultItemStyle: CSSProperties = {
    borderRadius: "0.75rem",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
    transition: "background-color 0.15s ease, transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease",
    willChange: "background-color, transform",
    margin: "0.125rem 0.5rem",
    padding: "0.125rem",
    border: "1px solid transparent",
}

export const defaultCategoryItemStyle: CSSProperties = {
    paddingBottom: "0.75rem",
    marginBottom: "0.75rem",
    width: "100%",
    paddingLeft: "0.5rem",
    paddingRight: "0.5rem",
}

export const defaultOverlayStyle: CSSProperties = {
    backgroundColor: "var(--overlay-bg, rgba(15,15,20,0.45))",
    backdropFilter: "var(--overlay-blur, blur(6px))",
    zIndex: 111,
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: "block",
    cursor: "default",
    content: " ",
};

export const defaultListStyle: CSSProperties = {
    overflowY: "auto",
    overflowX: "hidden",
    maxHeight: "60vh",
    paddingRight: "0.25rem",
    paddingTop: "0.25rem",
    paddingBottom: "0.5rem",
};
