import { PlayerOrigin } from "./PlayerOrigin";
import { PlayerRole } from "./PlayerRole";

export type Player = {
  id: string;
  name: string;
  description?: string;
  image?: string;

  role?: PlayerRole;
  origin?: PlayerOrigin;
  ownerDeviceId: string;

  armyIds?: string[];

  createdAt: string;
  updatedAt: string;
};