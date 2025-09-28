import React from "react";

import { useCommandPalette } from "../hooks/useCommandPalette";
import Container from "./Container";
import InputField from "./InputField";


const no_commands_message = "It looks like you don't have any commands defined. Add some with the `commands` prop from `CommandPaletteProvider`.";

export function CommandPalette() {
    const { commands, options } = useCommandPalette();

    if (!commands || commands.length === 0) {
        return (
            <>{no_commands_message}</>
        )
    }


    return (
        <Container>
            <InputField />
            <div
                style={{
                    marginLeft: 2,
                    display: "flex",
                    flexDirection: "row",
                    gap: "0.3rem"
                }}
            >
                Type
                <kbd>/</kbd>
                to run a command
            </div>
            blabla
        </Container>
    )
}