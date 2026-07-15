import { CommandGroup } from "./CommandGroup";
import { Unit } from "./Unit";

// Represents a unit entry in an army list
export type ArmyUnitEntry = {
    entryId: string; // the local id of the unit in the army list
    unit: Unit;
    alias?: string; // descriptive name to identify the unit in the battle

    models: number; // number of models of the unit
    optionsChosen: string[]; // list of options chosen for the unit. Used to create a descriptive alias
    commandGroup?: CommandGroup;

    points: number; // points of the units composed by the base points of each model and the options chosen.
}