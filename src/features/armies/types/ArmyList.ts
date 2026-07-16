import { PlayerOrigin } from "../../players/types/PlayerOrigin";
import { ArmyUnitEntry } from "./ArmyUnitEntry";
import { Faction } from "./Faction";
import { Unit } from "./Unit";

export interface ArmyList {
    id: string; // the id of the army in the local database
    sourceId?: string; // the id of the army that comes from the external source
    name: string; // the name of the army not the name of the faction
    faction: Faction;
    points: number; // the total points of the army list
    description?: string;

    units: ArmyUnitEntry[];
    core?: Unit[];
    special?: Unit[];
    rare?: Unit[];
    characters?: Unit[];

    origin: PlayerOrigin;
    ownerDeviceId: string; // the id of the player in the device where it was created

    createdAt: string; // indicates when the army list was created
    updatedAt: string; // indicates the last time the army list was updated.
}
