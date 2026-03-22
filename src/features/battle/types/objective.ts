export enum ScoreTiming {
    IMMEDIATE,
    END_OF_TURN,
    END_OF_BATTLE
}

export enum ObjectiveStatus {
  ACHIEVED,
  NOT_ACHIEVED
}

export enum ObjectiveType {
  SCENARIO,
  SECONDARY,
  HIDDEN,
}

export enum ObjectiveOwner {
    PLAYER,
    TEAM
}

type ObjectiveBase = {
  id: string;
  title: string;
  description: string;
  image?: string;
  points?: number; 
  isRepeatable?: boolean;
};

export type ScenarioVictoryCondition = ScenarioObjective & {
    timing?: ScoreTiming;
}

export type ScenarioObjective = ObjectiveBase & {
    type: ObjectiveType.SCENARIO;
};

export type SecondaryObjective = ObjectiveBase & {
    type: ObjectiveType.SECONDARY;
    conditions: string;
}

export type HiddenObjective = ObjectiveBase & {
    type: ObjectiveType.HIDDEN;
}
