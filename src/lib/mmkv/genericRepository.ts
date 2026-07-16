import { loadString, saveString } from "./storage";

export function createCachedRepository<T extends { id: string }>(
    storageKey: string,
    assetLoader: () => T[]
) {
    let cache: T[] | null = null;

    const ensureCache = (): T[] => {
        if (cache) {
            return cache;
        }

        const raw = loadString(storageKey);
        if (raw) {
            const storedItems = JSON.parse(raw) as T[];
            cache = storedItems;
            return storedItems;
        }

        const data = assetLoader();
        saveString(storageKey, JSON.stringify(data));
        cache = data;
        return data;
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
            saveString(storageKey, JSON.stringify(items));
            cache = items;
        },

        /** Resetear cache (por idioma, etc.) */
        clearCache: () => {
            cache = null;
        }
    };
}
