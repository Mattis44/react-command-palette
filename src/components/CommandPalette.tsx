import React from "react";

import { useCommandPalette } from "../hooks/useCommandPalette";
import Container from "./Container";
import InputField from "./InputField";
import Helper from "./Helper";
import Item from "./Items/Item";


const no_commands_message = "It looks like you don't have any commands defined. Add some with the `commands` prop from `CommandPaletteProvider`.";

export function CommandPalette() {
    const { commands } = useCommandPalette();

    if (!commands || commands.length === 0) {
        return (
            <>{no_commands_message}</>
        )
    }


    return (
        <Container>
            <InputField />
            <Helper />
            {commands?.map((c, i) => (
                <Item key={i} {...c} />
            ))}
        </Container>
    )
}