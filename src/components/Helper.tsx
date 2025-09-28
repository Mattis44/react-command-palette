import React, { useEffect, useState } from "react";
import { useCommandPalette } from "../hooks/useCommandPalette";
import { mergeStyle } from "../utils/global";
import { defaultKbdStyle } from "../constants/defaultStyles";

export default function Helper() {
    const { options } = useCommandPalette();
    const helper = options?.helper;

    if (!helper) return null;

    const helpers = Array.isArray(helper) ? helper : [helper];
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (helpers.length <= 1) return;

        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % helpers.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [helpers.length]);

    const current = helpers[index];
    const { text, keys = [], description, style, keyStyle } = current;

    return (
        <div
            style={{
                marginTop: "0.3rem",
                display: "flex",
                flexDirection: "column",
                transition: "opacity 0.3s ease",
            }}
        >
            <div
                key={index}
                style={mergeStyle(
                    {
                        display: "flex",
                        alignItems: "center",
                        gap: "0.4rem",
                        flexWrap: "wrap",
                        fontSize: "0.9rem",
                        color: "var(--placeholder-color, #777)",
                        lineHeight: 1.2,
                        opacity: 1,
                    },
                    style
                )}
            >
                {text && <span>{text}</span>}

                {keys.map((key, j) => (
                    <kbd key={j} style={mergeStyle(defaultKbdStyle, keyStyle)}>
                        {key}
                    </kbd>
                ))}

                {description && <span>{description}</span>}
            </div>
        </div>
    );
}
