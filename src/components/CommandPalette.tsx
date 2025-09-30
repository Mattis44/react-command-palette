import React, { useMemo } from "react";

import { useCommandPalette } from "../hooks/useCommandPalette";
import Container from "./Container";
import InputField from "./InputField";
import Helper from "./Helper";
import Item from "./Items/Item";
import type { Command } from "../types/palette";
import { mergeStyle } from "../utils/global";
import { defaultCategoryItemStyle } from "../constants/defaultStyles";


const no_commands_message = "It looks like you don't have any commands defined. Add some with the `commands` prop from `CommandPaletteProvider`.";

export function CommandPalette() {
    const { commands, query, loading, options, globals } = useCommandPalette();

    const normalizedQuery = useMemo(() => {
        if (globals && query.startsWith(globals.shortcut)) {
            return query.slice(globals.shortcut.length).trim().toLowerCase();
        }
        return query.trim().toLowerCase();
    }, [query, globals]);

    const grouped = useMemo(() => {
        const q = normalizedQuery;

        const list = q
            ? commands.filter(
                (cmd) =>
                    cmd.label.toLowerCase().includes(q) ||
                    cmd.keywords?.some((kw) => kw.toLowerCase().includes(q))
            )
            : commands;

        return list.reduce<Record<string, Command[]>>((acc, cmd) => {
            const cat = cmd.category || "Other";
            if (!acc[cat]) acc[cat] = [];
            acc[cat].push(cmd);
            return acc;
        }, {});
    }, [commands, normalizedQuery]);

    const entries = Object.entries(grouped);



    if (loading) {
        return (
            <Container>
                <InputField />
                <Helper />
                <div
                    style={{
                        padding: "1rem",
                        textAlign: "center",
                        color: "var(--placeholder-color, #777)",
                    }}
                >
                    Loading commands...
                </div>
            </Container>
        );
    }


    if (loading && query.trim()) {
        return (
            <Container>
                <InputField />
                <Helper />
                <div
                    style={{
                        padding: "1rem",
                        textAlign: "center",
                        color: "var(--placeholder-color, #777)",
                    }}
                >
                    Searching for “{query}”...
                </div>
            </Container>
        );
    }

    if (!commands || commands.length === 0) {
        return (
            <Container>
                <InputField />
                <Helper />
                <div
                    style={{
                        padding: "1rem",
                        textAlign: "center",
                        color: "var(--placeholder-color, #777)",
                    }}
                >
                    {no_commands_message}
                </div>
            </Container>
        );
    }

    if (entries.length === 0) {
        return (
            <Container>
                <InputField />
                <Helper />
                <div
                    style={{
                        padding: "1rem",
                        textAlign: "center",
                        color: "var(--placeholder-color, #777)",
                    }}
                >
                    No results found for “{query}”
                </div>
            </Container>
        );
    }

    return (
        <Container>
            <InputField />
            <Helper />
            <div>
                {entries.map(([category, cmds], i) => {
                    const isLast = i === entries.length - 1;
                    return (
                        <div
                            key={category}
                            style={mergeStyle({ ...defaultCategoryItemStyle, borderBottom: isLast ? "none" : "1px solid var(--border-color)" }, options?.categoryItemStyle)}
                        >
                            <div
                                style={{
                                    fontSize: "0.75rem",
                                    fontWeight: 600,
                                    color: "var(--placeholder-color, #999)",
                                    padding: "0.25rem 1rem",
                                    letterSpacing: "0.5px",
                                    textAlign: "left"
                                }}
                            >
                                {category}
                            </div>

                            {cmds.map((c, i) => (
                                <Item key={c.id ?? i} {...c} />
                            ))}
                        </div>
                    )
                })}
            </div>
        </Container>
    );
}