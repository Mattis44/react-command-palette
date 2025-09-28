import React from "react";
import { useCommandPalette } from "../hooks/useCommandPalette";
import { mergeStyle } from "../utils/global";
import { defaultContainerStyle } from "../constants/defaultStyles";

export default function Container({
    children
}: {
    children: React.ReactNode;
}) {
    const { options, isOpen, close } = useCommandPalette();
    return (
        <>
            {isOpen && (
                <div
                    id="portal-container-command-palette"
                    style={{
                        backgroundColor: "#21283066",
                        zIndex: 111,
                        position: "fixed",
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                        display: "block",
                        cursor: "default",
                        content: " "
                    }}
                    onClick={close}
                />
            )}
            <div
                className="command-palette-container"
                style={mergeStyle(defaultContainerStyle, options?.containerStyle)}
            >
                {children}
            </div>
        </>
    )
}