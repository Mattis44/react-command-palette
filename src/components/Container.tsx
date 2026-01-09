import React, { useEffect, useMemo, useRef } from "react";
import { useCommandPalette } from "../hooks/useCommandPalette";
import { mergeStyle } from "../utils/global";
import { defaultContainerStyle, defaultOverlayStyle } from "../constants/defaultStyles";

const Container = React.memo(function Container({
    children
}: {
    children: React.ReactNode;
}) {
    const { options, isOpen, close } = useCommandPalette();
    const containerRef = useRef<HTMLDivElement>(null);

    const animations = options?.animations;
    const enableAnim = animations?.enabled ?? true;
    const duration = animations?.durationMs ?? 180;
    const easing = animations?.easing ?? "cubic-bezier(0.22, 1, 0.36, 1)";

    const animatedStyle = useMemo(() => {
        if (!enableAnim) {
            return {
                display: isOpen ? undefined : "none",
            } as React.CSSProperties;
        }
        return {
            opacity: isOpen ? 1 : 0,
            transform: isOpen
                ? "translate(-50%, -50%) scale(1)"
                : "translate(-50%, -46%) scale(0.97)",
            transition: `opacity ${duration}ms ${easing}, transform ${duration}ms ${easing}`,
            pointerEvents: isOpen ? "auto" : "none",
        } as React.CSSProperties;
    }, [enableAnim, isOpen, duration, easing]);

    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key !== "Tab") return;

            const container = containerRef.current;
            if (!container) return;

            const focusableElements = container.querySelectorAll<HTMLElement>(
                'input, button, [tabindex]:not([tabindex="-1"])'
            );
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault();
                lastElement?.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault();
                firstElement?.focus();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen]);
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
                ref={containerRef}
                className="command-palette-container"
                role="dialog"
                aria-modal="true"
                aria-label="Command palette"
                aria-hidden={!isOpen}
                style={mergeStyle(defaultContainerStyle, mergeStyle(animatedStyle, options?.containerStyle))}
            >
                {children}
            </div>
        </>
    )
});

export default Container;