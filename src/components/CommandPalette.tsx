import React, { useCallback, useEffect, useMemo, useState } from "react";
import Fuse from "fuse.js";
import type { FuseResultMatch } from "fuse.js";

import { useCommandPalette } from "../hooks/useCommandPalette";
import Container from "./Container";
import InputField from "./InputField";
import Helper from "./Helper";
import Item from "./Items/Item";
import type { Command } from "../types/palette";
import { mergeStyle } from "../utils/global";
import { defaultCategoryItemStyle, defaultListStyle } from "../constants/defaultStyles";

const no_commands_message =
    "It looks like you don't have any commands defined. Add some with the `commands` prop from `CommandPaletteProvider`.";

export function CommandPalette() {
    const { commands, query, loading, options, globals, close, history, addToHistory } = useCommandPalette();

    const [filteredCommands, setFilteredCommands] = useState<Command[]>(() => commands ?? []);
    const [matchMap, setMatchMap] = useState<Record<string, ReadonlyArray<FuseResultMatch>>>({});
    const [activeIndex, setActiveIndex] = useState<number>(() => (commands && commands.length > 0 ? 0 : -1));

    const normalizedQuery = useMemo(() => {
        if (globals && query.startsWith(globals.shortcut)) {
            return query.slice(globals.shortcut.length).trim().toLowerCase();
        }
        return query.trim().toLowerCase();
    }, [query, globals]);
    const fuse = useMemo(() => {
        if (!commands || commands.length === 0) return null;
        
        return new Fuse(commands, {
            keys: [
                { name: "label", weight: 2 },
                { name: "keywords", weight: 1.5 },
                { name: "category", weight: 0.5 },
            ],
            threshold: options?.fuzzySearch?.threshold ?? 0.4,
            ignoreLocation: true,
            minMatchCharLength: options?.fuzzySearch?.minMatchCharLength ?? 1,
            includeMatches: true,
        });
    }, [commands, options?.fuzzySearch]);

    useEffect(() => {
        const availableCommands = commands ?? [];
        const q = normalizedQuery;
        const enableHistory = options?.enableHistory ?? false;

        const historyCommands = enableHistory && !q
            ? history
                .map((id) => availableCommands.find((cmd) => cmd.id === id))
                .filter(Boolean) as Command[]
            : [];
        const remainingCommands = enableHistory && !q
            ? availableCommands.filter((cmd) => !history.includes(cmd.id))
            : availableCommands;

        let list: Command[];
        if (q && fuse) {
            const results = fuse.search(q);
            list = results.map(result => result.item);
            const map: Record<string, ReadonlyArray<FuseResultMatch>> = {};
            results.forEach((result) => {
                if (result.item?.id) {
                    map[result.item.id] = result.matches ?? [];
                }
            });
            setMatchMap(map);
        } else {
            list = [...historyCommands, ...remainingCommands];
            setMatchMap({});
        }

        setFilteredCommands(list);
        setActiveIndex(list.length > 0 ? 0 : -1);
    }, [commands, normalizedQuery, fuse]);

    const limitedCommands = useMemo(() => {
        const limit = options?.maxResults ?? filteredCommands.length;
        return filteredCommands.slice(0, limit);
    }, [filteredCommands, options?.maxResults]);

    const isHistoryMode = useMemo(
        () => (options?.enableHistory ?? false) && !normalizedQuery,
        [options?.enableHistory, normalizedQuery]
    );

    const historyLimited = useMemo(() => {
        if (!isHistoryMode) return [] as Command[];
        const map = new Map(limitedCommands.map((c) => [c.id, c] as const));
        return history
            .map((id) => map.get(id))
            .filter(Boolean) as Command[];
    }, [history, limitedCommands, isHistoryMode]);

    const remainingLimited = useMemo(() => {
        if (!isHistoryMode) return limitedCommands;
        const historySet = new Set(history);
        return limitedCommands.filter((cmd) => !historySet.has(cmd.id));
    }, [history, limitedCommands, isHistoryMode]);

    const grouped = useMemo(() => {
        return remainingLimited.reduce<Record<string, Command[]>>((acc, cmd) => {
            const cat = cmd.category || "Other";
            if (!acc[cat]) acc[cat] = [];
            acc[cat].push(cmd);
            return acc;
        }, {});
    }, [remainingLimited]);

    const runCommand = useCallback(
        (command: Command | undefined) => {
            if (!command) return;

            command.action?.();
            addToHistory(command.id);
            if (options?.closeOnSelect !== false) {
                close();
            }
        },
        [close, options?.closeOnSelect, addToHistory]
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

    const listboxStyle = useMemo(() => {
        const base = mergeStyle(defaultListStyle, options?.listStyle);
        const vars: React.CSSProperties = {} as any;
        if (options?.listScrollbar?.width !== undefined) (vars as any)["--scrollbar-width"] = String(options.listScrollbar.width);
        if (options?.listScrollbar?.thumbColor) (vars as any)["--scrollbar-thumb"] = options.listScrollbar.thumbColor;
        if (options?.listScrollbar?.thumbHoverColor) (vars as any)["--scrollbar-thumb-hover"] = options.listScrollbar.thumbHoverColor;
        if (options?.listScrollbar?.trackColor) (vars as any)["--scrollbar-track"] = options.listScrollbar.trackColor;
        return { ...base, ...vars };
    }, [options?.listStyle, options?.listScrollbar]);

    const activeItemId = useMemo(() => {
        if (activeIndex === -1) return undefined;
        return `command-item-${activeIndex}`;
    }, [activeIndex]);

    const resultsCount = filteredCommands.length;
    const limitedCount = limitedCommands.length;
    const isTruncated = limitedCount < resultsCount && limitedCount > 0;

    if (loading) {
        const trimmedQuery = query.trim();
        return (
            <Container>
                <InputField 
                    onKeyDown={handleKeyDown}
                    activeDescendantId={undefined}
                    hasResults={false}
                />
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
                <InputField 
                    onKeyDown={handleKeyDown}
                    activeDescendantId={undefined}
                    hasResults={false}
                />
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
        const empty = options?.emptyState;
        const content = typeof empty === "function" ? empty(query) : empty;
        return (
            <Container>
                <InputField 
                    onKeyDown={handleKeyDown}
                    activeDescendantId={undefined}
                    hasResults={false}
                />
                <Helper />
                <div
                    role="status"
                    aria-live="polite"
                    style={{
                        padding: "1rem",
                        textAlign: "center",
                        color: "var(--placeholder-color, #777)",
                    }}
                >
                    {content ?? `No results found for “${query}”`}
                </div>
            </Container>
        );
    }

    let commandIndex = -1;

    return (
        <Container>
            <InputField 
                onKeyDown={handleKeyDown}
                activeDescendantId={activeItemId}
                hasResults={resultsCount > 0}
            />
            <Helper />
            <div 
                role="status" 
                aria-live="polite" 
                aria-atomic="true"
                style={{ 
                    position: "absolute", 
                    left: "-10000px", 
                    width: "1px", 
                    height: "1px", 
                    overflow: "hidden" 
                }}
            >
                {resultsCount} {resultsCount === 1 ? "result" : "results"} available
            </div>
            <div 
                id="command-palette-listbox"
                role="listbox"
                aria-label="Command list"
                style={listboxStyle}
            >
                {isHistoryMode && historyLimited.length > 0 && (
                    <div
                        style={mergeStyle(
                            { ...defaultCategoryItemStyle, borderBottom: "1px solid var(--border-color)" },
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
                            Recent
                        </div>
                        {historyLimited.map((c, index) => {
                            commandIndex += 1;
                            const globalIndex = commandIndex;
                            return (
                                <Item
                                    key={`recent-${c.id}-${index}`}
                                    {...c}
                                    matches={matchMap[c.id ?? ""]}
                                    query={normalizedQuery}
                                    highlightStyle={options?.highlightStyle}
                                    isActive={globalIndex === activeIndex}
                                    itemId={`command-item-${globalIndex}`}
                                />
                            );
                        })}
                    </div>
                )}
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
                                        itemId={`command-item-${globalIndex}`}
                                    />
                                );
                            })}
                        </div>
                    );
                })}
            </div>
            {isTruncated && (
                <div
                    style={{
                        padding: "0.5rem 1rem",
                        textAlign: "center",
                        color: "var(--placeholder-color, #777)",
                        fontSize: "0.9rem",
                    }}
                    aria-live="polite"
                >
                    Showing first {limitedCount} of {resultsCount} results
                </div>
            )}
        </Container>
    );
}
