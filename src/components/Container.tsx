import React from "react";
import { useCommandPalette } from "../hooks/useCommandPalette";
import { mergeStyle } from "../utils/global";
import { defaultContainerStyle, defaultOverlayStyle } from "../constants/defaultStyles";

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
                    style={mergeStyle(defaultOverlayStyle, options?.overlayStyle)}
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