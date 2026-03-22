import { loadString, saveString } from "./storage";

export function createCachedRepository<T extends { id: string }>(
    storageKey: string,
    assetLoader: () => T[]
) {
    let cache: T[];

    const ensureCache = (): T[] => {

        if (cache) return cache;

        const raw = loadString(storageKey);
        if (raw) {
            cache = JSON.parse(raw);
            return cache;
        }

        const data = assetLoader();
        saveString(storageKey, JSON.stringify(data));
        cache = data;
        return cache;
    };

    return {
        /** Precarga al inicio de la app */
        init: async () => {
            ensureCache();
        },

        /** Devuelve todos (cacheados) */
        getAll: (): T[] => {
            return ensureCache();
        },

        /** Lookup rápido desde cache */
        getById: (id: string): T | null => {
            return ensureCache().find((x) => x.id === id) ?? null;
        },

        /** Guardar y actualizar cache */
        saveAll: (items: T[]) => {
            console.log('saveAll', items);
            saveString(storageKey, JSON.stringify(items));
            cache = items;
        },

        /** Resetear cache (por idioma, etc.) */
        clearCache: () => {
            cache = [];
        }
    };
}
