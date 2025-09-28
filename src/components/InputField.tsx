import React from "react";
import { mergeStyle } from "../utils/global";
import { useCommandPalette } from "../hooks/useCommandPalette";
import { defaultContainerInputFieldStyle, defaultInputFieldStyle } from "../constants/defaultStyles";
import SearchIcon from "../assets/icons/SearchIcon";
import XIcon from "../assets/icons/XIcon";

interface InputFieldProps {
    iconStart?: React.ReactNode;
    iconEnd?: React.ReactNode;
    placeholder?: string;
}

export default function InputField({
    iconStart,
    iconEnd,
    placeholder
}: InputFieldProps) {
    const { options, query, setQuery } = useCommandPalette();
    return (
        <div
            style={mergeStyle(defaultContainerInputFieldStyle, options?.containerInputFieldStyle)}
        >
            <span
                style={{
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: "1rem",
                }}
            >
                {iconStart ?? <SearchIcon />}
            </span>

            <input
                id="input-field-search-command-palette"
                style={mergeStyle(defaultInputFieldStyle, options?.inputFieldStyle)}
                autoFocus
                placeholder={placeholder || "Search..."}
                value={query}
                onChange={(e) => setQuery(e.currentTarget?.value)}
            />

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    paddingRight: "1rem",
                    cursor: "pointer",
                }}
                onClick={() => setQuery("")}
            >
                {query !== "" ? iconEnd ?? <XIcon /> : null}
            </div>
        </div>
    )
}