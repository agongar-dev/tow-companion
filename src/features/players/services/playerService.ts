import ArmyService from "../../armies/services/ArmyService";
import { ArmyList } from "../../armies/types/ArmyList";

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