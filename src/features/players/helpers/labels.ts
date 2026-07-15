import { CommandGroup } from "../../armies/types/CommandGroup"

export const unitHasFullCommandGroup = (commandGroup?: CommandGroup) => {
    if (!commandGroup) return false;
    return commandGroup.champion && commandGroup.musician && commandGroup.standard;
}