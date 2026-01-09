import React, { useMemo, useState } from "react";
import type { FuseResultMatch } from "fuse.js";
import type { CSSProperties } from "react";

import { defaultItemStyle } from "../../constants/defaultStyles";
import { mergeStyle } from "../../utils/global";
import { useCommandPalette } from "../../hooks/useCommandPalette";

interface ItemProps {
    icon?: React.ReactNode;
    action?: () => void;
    label: string;
    helper?: string;
    isActive?: boolean;
    itemId?: string;
    matches?: ReadonlyArray<FuseResultMatch>;
    query?: string;
    highlightStyle?: CSSProperties;
}

const Item = React.memo(function Item({
    icon,
    action,
    label,
    helper,
    isActive = false,
    itemId,
    matches,
    query,
    highlightStyle,
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
    const transform = isActive ? "scale(1.01)" : isHover ? "translateX(2px)" : "none";
    const boxShadow = isActive
        ? "0 0 0 1px rgba(167,139,250,0.45), 0 6px 16px rgba(0,0,0,0.25)"
        : isHover
            ? "0 0 0 1px rgba(255,255,255,0.12)"
            : "none";
    const borderColor = isActive
        ? "rgba(167,139,250,0.45)"
        : isHover
            ? "rgba(255,255,255,0.12)"
            : "transparent";

    let computedStyle = { ...defaultItemStyle, backgroundColor, transform, boxShadow, borderColor } as React.CSSProperties;
    if (isActive) {
        computedStyle = mergeStyle(computedStyle, options?.itemActiveStyle);
    } else if (isHover) {
        computedStyle = mergeStyle(computedStyle, options?.itemHoverStyle);
    }
    computedStyle = mergeStyle(computedStyle, options?.itemStyle);

    const highlightedLabel = useMemo(() => {
        const defaultStyle: CSSProperties = {
            backgroundColor: "rgba(167,139,250,0.35)",
            color: "inherit",
            borderRadius: "4px",
            padding: "0 2px",
        };
        const style = mergeStyle(defaultStyle, highlightStyle);

        const matchForLabel = matches?.find((m) => m.key === "label" || m.key === "item.label");
        if (!matchForLabel || !matchForLabel.indices?.length || !matchForLabel.value) {
            if (query && query.trim()) {
                const regex = new RegExp(`(${query.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")})`, "ig");
                const parts = label.split(regex);
                if (parts.length === 1) return label;
                return parts.map((part, i) =>
                    regex.test(part) ? (
                        <mark key={i} style={style}>{part}</mark>
                    ) : (
                        <React.Fragment key={i}>{part}</React.Fragment>
                    )
                );
            }
            return label;
        }

        const indices = matchForLabel.indices;
        const text = matchForLabel.value as string;
        const segments: Array<{ text: string; highlighted: boolean }> = [];
        let lastIndex = 0;
        indices.forEach(([start, end]) => {
            if (start > lastIndex) {
                segments.push({ text: text.slice(lastIndex, start), highlighted: false });
            }
            segments.push({ text: text.slice(start, end + 1), highlighted: true });
            lastIndex = end + 1;
        });
        if (lastIndex < text.length) {
            segments.push({ text: text.slice(lastIndex), highlighted: false });
        }

        return segments.map((seg, idx) =>
            seg.highlighted ? (
                <mark key={idx} style={style}>{seg.text}</mark>
            ) : (
                <React.Fragment key={idx}>{seg.text}</React.Fragment>
            )
        );
    }, [label, matches, highlightStyle, query]);

    return (
        <div
            id={itemId}
            role="option"
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            style={computedStyle}
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
                    {highlightedLabel}
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
});

export default Item;