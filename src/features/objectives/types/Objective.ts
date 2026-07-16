import { DescriptiveInfo } from "../../../shared/types/DescriptiveInfo";
import { ObjectiveType } from "./ObjectiveType";
import { ScoreTiming } from "./ScoreTiming";

export type Objective = {
  id: string;
  name: string;
  description: string[];
  objectiveRules: DescriptiveInfo[];
  image?: string;
  victoryConditions?: VictoryCondition[];
  type: ObjectiveType;
  summary?: string;
  tags?: string[];
  };

export type VictoryCondition = {
  id: string;
  description: string;
  points: number;
  isRepeatable?: boolean;
  scoreTiming?: ScoreTiming;
};