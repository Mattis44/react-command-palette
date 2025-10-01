import React, { useCallback, useEffect, useMemo, useState } from "react";

import { useCommandPalette } from "../hooks/useCommandPalette";
import Container from "./Container";
import InputField from "./InputField";
import Helper from "./Helper";
import Item from "./Items/Item";
import type { Command } from "../types/palette";
import { mergeStyle } from "../utils/global";
import { defaultCategoryItemStyle } from "../constants/defaultStyles";

const no_commands_message =
    "It looks like you don't have any commands defined. Add some with the `commands` prop from `CommandPaletteProvider`.";

export function CommandPalette() {
    const { commands, query, loading, options, globals, close } = useCommandPalette();

    const [filteredCommands, setFilteredCommands] = useState<Command[]>(() => commands ?? []);
    const [activeIndex, setActiveIndex] = useState<number>(() => (commands && commands.length > 0 ? 0 : -1));

    const normalizedQuery = useMemo(() => {
        if (globals && query.startsWith(globals.shortcut)) {
            return query.slice(globals.shortcut.length).trim().toLowerCase();
        }
        return query.trim().toLowerCase();
    }, [query, globals]);

    useEffect(() => {
        const availableCommands = commands ?? [];
        const q = normalizedQuery;

        const list = q
            ? availableCommands.filter(
                  (cmd) =>
                      cmd.label.toLowerCase().includes(q) ||
                      cmd.keywords?.some((kw) => kw.toLowerCase().includes(q))
              )
            : availableCommands;

        setFilteredCommands(list);
        setActiveIndex(list.length > 0 ? 0 : -1);
    }, [commands, normalizedQuery]);

    const grouped = useMemo(() => {
        return filteredCommands.reduce<Record<string, Command[]>>((acc, cmd) => {
            const cat = cmd.category || "Other";
            if (!acc[cat]) acc[cat] = [];
            acc[cat].push(cmd);
            return acc;
        }, {});
    }, [filteredCommands]);

    const runCommand = useCallback(
        (command: Command | undefined) => {
            if (!command) return;

            command.action?.();
            if (options?.closeOnSelect !== false) {
                close();
            }
        },
        [close, options?.closeOnSelect]
    );

    const handleKeyDown = useCallback(
        (event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === "ArrowDown") {
                event.preventDefault();
                setActiveIndex((prev) => {
                    if (filteredCommands.length === 0) return -1;
                    if (prev === -1) return 0;

                    const next = prev + 1;
                    return next >= filteredCommands.length ? 0 : next;
                });
                return;
            }

            if (event.key === "ArrowUp") {
                event.preventDefault();
                setActiveIndex((prev) => {
                    if (filteredCommands.length === 0) return -1;
                    if (prev === -1) return filteredCommands.length - 1;

                    const next = prev - 1;
                    return next < 0 ? filteredCommands.length - 1 : next;
                });
                return;
            }

            if (event.key === "Enter") {
                event.preventDefault();
                runCommand(filteredCommands[activeIndex]);
            }
        },
        [runCommand, activeIndex, filteredCommands]
    );

    const entries = useMemo(() => Object.entries(grouped), [grouped]);

    if (loading) {
        const trimmedQuery = query.trim();
        return (
            <Container>
                <InputField onKeyDown={handleKeyDown} />
                <Helper />
                <div
                    style={{
                        padding: "1rem",
                        textAlign: "center",
                        color: "var(--placeholder-color, #777)",
                    }}
                >
                    {trimmedQuery ? `Searching for “${trimmedQuery}”...` : "Loading commands..."}
                </div>
            </Container>
        );
    }

    if (!commands || commands.length === 0) {
        return (
            <Container>
                <InputField onKeyDown={handleKeyDown} />
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
                <InputField onKeyDown={handleKeyDown} />
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

    let commandIndex = -1;

    return (
        <Container>
            <InputField onKeyDown={handleKeyDown} />
            <Helper />
            <div role="listbox">
                {entries.map(([category, cmds], i) => {
                    const isLast = i === entries.length - 1;
                    return (
                        <div
                            key={category}
                            style={mergeStyle(
                                { ...defaultCategoryItemStyle, borderBottom: isLast ? "none" : "1px solid var(--border-color)" },
                                options?.categoryItemStyle
                            )}
                        >
                            <div
                                style={{
                                    fontSize: "0.75rem",
                                    fontWeight: 600,
                                    color: "var(--placeholder-color, #999)",
                                    padding: "0.25rem 1rem",
                                    letterSpacing: "0.5px",
                                    textAlign: "left",
                                }}
                            >
                                {category}
                            </div>

                            {cmds.map((c, index) => {
                                commandIndex += 1;
                                const globalIndex = commandIndex;
                                return (
                                    <Item
                                        key={c.id ?? `${category}-${index}`}
                                        {...c}
                                        isActive={globalIndex === activeIndex}
                                    />
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </Container>
    );
}
