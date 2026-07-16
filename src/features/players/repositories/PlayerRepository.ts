import { v4 as uuidv4 } from "react-native-uuid/dist/v4";
import { loadString, saveString } from "../../../lib/mmkv/storage";
import { Player } from "../../players/types/player";
import { PlayerOrigin } from "../../players/types/PlayerOrigin";

const STORAGE_KEY = "players";
const STORAGE_MAP_KEY = "playerArmyMap";

let cache: Player[] | null = null;
let playerArmyMap: Record<string, string[]> = {};

function saveAll(players: Player[]) {
    cache = players;
    saveString(STORAGE_KEY, JSON.stringify(players));
    saveString(STORAGE_MAP_KEY, JSON.stringify(playerArmyMap));
}

function loadAll(): Player[] {
    if (cache) {
        return cache;
    }

    const raw = loadString(STORAGE_KEY);
    const mapRaw = loadString(STORAGE_MAP_KEY);

    const storedPlayers = raw ? (JSON.parse(raw) as Player[]) : [];
    cache = storedPlayers;
    playerArmyMap = mapRaw ? JSON.parse(mapRaw) : {};
    return storedPlayers;
}

export const PlayerRepository = {
    async init() {
        loadAll();
    },

    save(player: Player) {
        const all = loadAll();
        const exists = all.find(p => p.id === player.id);

        if (exists) {
            Object.assign(exists, player, { updatedAt: new Date().toISOString() });
        } else {
            all.push(player);
        }
        saveAll(all);
    },

    getAll(): Player[] {
        return loadAll();
    },

    getById(id: string): Player | undefined {
        return loadAll().find(p => p.id === id);
    },

    createLocalPlayer(name: string, deviceId: string, image?: string): Player {
        const newPlayer: Player = {
            id: uuidv4(),
            name,
            image,
            origin: PlayerOrigin.LOCAL,
            ownerDeviceId: deviceId,
            armyIds: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        const all = loadAll();
        all.push(newPlayer);
        saveAll(all);
        return newPlayer;
    },

    importRemotePlayer(remote: Player): Player {
        const all = loadAll();
        const exists = all.find(p => p.id === remote.id);

        if (exists) {
            Object.assign(exists, remote, { updatedAt: new Date().toISOString() });
        } else {
            all.push({
                ...remote,
                origin: PlayerOrigin.IMPORTED,
                updatedAt: new Date().toISOString(),
            });
        }
        saveAll(all);
        return remote;
    },

    assignArmy(playerId: string, armyId: string) {
        const all = loadAll();
        const player = all.find(p => p.id === playerId);
        if (!player) return;

        if (!playerArmyMap[playerId]) {
            playerArmyMap[playerId] = [];
        }
        if (!playerArmyMap[playerId].includes(armyId)) {
            playerArmyMap[playerId].push(armyId);
        }

        player.updatedAt = new Date().toISOString();
        saveAll(all);
    },

    getArmies(playerId: string): string[] {
        loadAll();
        return playerArmyMap[playerId] ?? [];
    },

    getArmiesMap(): Record<string, string[]> {
        loadAll();
        return playerArmyMap;
    },

    removePlayer(playerId: string) {
        const all = loadAll().filter(p => p.id !== playerId);
        delete playerArmyMap[playerId];
        saveAll(all);
    },

    clearAll() {
        cache = null;
        playerArmyMap = {};
        saveString(STORAGE_KEY, JSON.stringify([]));
        saveString(STORAGE_MAP_KEY, JSON.stringify({}));
    },
};
