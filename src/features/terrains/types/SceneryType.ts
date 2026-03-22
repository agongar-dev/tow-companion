export type SceneryType = {
    id: string;
    name: string;
    description?: string;
    rulesMovement?: string[];
    rulesDistance?: string[];
    rulesCloseCombat?: string[];
    rulesShooting?: string[];
    rulesLineOfSight?: string[];
    rulesOther?: string[];
}