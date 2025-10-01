import React, { useState } from "react";

import { defaultItemStyle } from "../../constants/defaultStyles";
import { mergeStyle } from "../../utils/global";
import { useCommandPalette } from "../../hooks/useCommandPalette";

interface ItemProps {
    icon?: React.ReactNode;
    action?: () => void;
    label: string;
    helper?: string;
    isActive?: boolean;
}

export default function Item({
    icon,
    action,
    label,
    helper,
    isActive = false,
}: ItemProps) {
    const [isHover, setIsHover] = useState(false);
    const { options, close } = useCommandPalette();

    const shouldCloseOnSelect = options?.closeOnSelect !== false;

    const handleActivate = () => {
        action?.();
        if (shouldCloseOnSelect) {
            close();
        }
    };

    const backgroundColor = isActive
        ? "var(--active-bg, rgba(59,130,246,0.15))"
        : isHover
            ? "var(--hover-bg, rgba(255,255,255,0.05))"
            : "transparent";

    return (
        <div
            role="option"
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            style={mergeStyle({ ...defaultItemStyle, backgroundColor }, options?.itemStyle)}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            onClick={handleActivate}
            onKeyDown={(event) => {
                if (!isActive) return;
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    handleActivate();
                }
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "0.6rem",
                    paddingTop: "10px",
                    paddingBottom: "10px",
                    paddingLeft: "1rem"
                }}
            >
                {icon && (
                    <span
                        style={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        {icon}
                    </span>
                )}
                <span>
                    {label}
                </span>
            </div>
            {(isHover || isActive) && (
                <span
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.4rem",
                        flexWrap: "wrap",
                        fontSize: "0.9rem",
                        color: "var(--placeholder-color, #777)",
                        lineHeight: 1.2,
                        opacity: 1,
                        paddingRight: "1rem"
                    }}
                >
                    {helper}
                </span>
            )}
        </div>
    )
}