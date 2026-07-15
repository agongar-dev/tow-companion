import ArmyService from "../../armies/services/ArmyService";
import { ArmyList } from "../../armies/types/ArmyList";
import { PlayerRepository } from "../repositories/PlayerRepository";
import { Player } from "../types/player";

const PlayerService = {
    getArmiesMap: (): Record<string, ArmyList> => {
        const armies = ArmyService.getAll();
        return armies.reduce((map: Record<string, ArmyList>, army) => {
            map[army.id] = army;
            return map;
        }, {});
    }
};

export default PlayerService;