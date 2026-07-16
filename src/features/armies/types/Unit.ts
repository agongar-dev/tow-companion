import { UnitCategory } from "./UnitCategory";

export enum UnitStatus {
  ALIVE,
  DESTROYED,
  FLED,
  FLEEING,
  UNDER_25_PERCENT,
  STANDARD_CAPTURED,
  HALF_DESTROYED,
}

// The base description of a unit independently of the composition used in the army list
export interface Unit {
  id: string; // id of the unit of the game rules
  name: string; // name of the unit. Not modifiable
  image?: string; // representative image of the unit
  category: UnitCategory;
  cost?: number;
  points?: number;
  initialSize?: number;
  armyId?: string;
  alias?: string;
  command?: string[];
  options?: string[];
  items?: string[];
  mounts?: string[];
}
