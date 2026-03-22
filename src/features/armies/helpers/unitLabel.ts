// helpers/unitLabel.ts
import { Unit } from "../types/Unit";
import i18n from "../../../lib/i18n";

export function getDifferentiatedLabels(units: Unit[]): Record<string, string> {
    const labels: Record<string, string> = {};

    units.forEach((unit, idx) => {
        if (unit.alias) {
            labels[unit.id] = unit.alias;
            return;
        }

        let label = unit.name;
        const differences: string[] = [];

        if (unit.command?.length) differences.push(i18n.t("unit.difference.command"));
        if (unit.options?.length) differences.push(i18n.t("unit.difference.options"));
        if (unit.items?.length) differences.push(i18n.t("unit.difference.items"));
        if (unit.mounts?.length) differences.push(i18n.t("unit.difference.mount"));

        if (differences.length > 0) {
            label += " (" + differences.join(", ") + ")";
        } else {
            label += " " + i18n.t("unit.copyNumber", { number: idx + 1 });
        }

        labels[unit.id] = label;
    });

    return labels;
}
