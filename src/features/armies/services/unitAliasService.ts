import { Unit } from "../types/Unit";

export interface LogEvent {
    timestamp: string;
    type: "ALIAS_UPDATED";
    payload: {
        unitId: string;
        oldLabel: string;
        newLabel: string;
    };
}

let battleLog: LogEvent[] = [];

export function updateUnitAlias(unit: Unit, alias: string): void {
    const oldLabel = unit.alias ?? unit.name;
    unit.alias = alias;

    battleLog.push({
        timestamp: new Date().toISOString(),
        type: "ALIAS_UPDATED",
        payload: {
            unitId: unit.id,
            oldLabel,
            newLabel: alias,
        },
    });
}

export function getBattleLog(): LogEvent[] {
    return battleLog;
}
