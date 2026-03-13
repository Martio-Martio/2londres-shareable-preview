/**
 * Filtre un objet ou tableau de données selon les clés incluses/exclues.
 * - includedKeys / includedNestedKeys : whitelist (seules ces clés sont conservées)
 * - excludedKeys / excludedNestedKeys : blacklist (ces clés sont retirées)
 * La whitelist prime sur la blacklist si les deux sont fournies.
 */

const isPlainObject = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null && !Array.isArray(v);

/** Inclus si le chemin correspond ou est un ancêtre d'un chemin inclus */
const pathMatchesIncluded = (
  currentPath: string,
  paths: Set<string>
): boolean =>
  paths.has(currentPath) ||
  Array.from(paths).some((p) => p.startsWith(`${currentPath}.`));

const pathMatchesExcluded = (
  currentPath: string,
  paths: Set<string>
): boolean =>
  paths.has(currentPath) ||
  Array.from(paths).some(
    (p) => currentPath.startsWith(`${p}.`) || currentPath === p
  );

export interface FilterKeysOptions {
  includedKeys?: string[];
  excludedKeys?: string[];
  includedNestedKeys?: string[];
  excludedNestedKeys?: string[];
  maxDepth?: number;
}

function filterObjectRecursive(
  obj: Record<string, unknown>,
  options: FilterKeysOptions,
  currentPath: string,
  depth: number
): Record<string, unknown> {
  const {
    includedKeys,
    excludedKeys,
    includedNestedKeys,
    excludedNestedKeys,
    maxDepth = 20,
  } = options;

  const incSet = includedKeys?.length ? new Set(includedKeys) : null;
  const excSet = excludedKeys?.length ? new Set(excludedKeys) : null;
  const incNestedSet = includedNestedKeys?.length
    ? new Set(includedNestedKeys)
    : null;
  const excNestedSet = excludedNestedKeys?.length
    ? new Set(excludedNestedKeys)
    : null;

  const shouldIncludeTopLevel = (key: string): boolean => {
    if (incSet) return incSet.has(key);
    if (excSet && excSet.has(key)) return false;
    return true;
  };

  const shouldIncludeNested = (path: string): boolean => {
    if (incNestedSet && incNestedSet.size > 0)
      return pathMatchesIncluded(path, incNestedSet);
    if (excNestedSet && pathMatchesExcluded(path, excNestedSet)) return false;
    return true;
  };

  const result: Record<string, unknown> = {};
  const entries = Object.entries(obj);
  const isTopLevel = !currentPath;

  for (const [key, value] of entries) {
    const childPath = currentPath ? `${currentPath}.${key}` : key;

    if (isTopLevel) {
      if (
        incNestedSet?.size
          ? !shouldIncludeNested(childPath)
          : !shouldIncludeTopLevel(key)
      )
        continue;
    } else if (!shouldIncludeNested(childPath)) {
      continue;
    }

    if (depth >= maxDepth) {
      result[key] = value;
      continue;
    }

    if (Array.isArray(value)) {
      result[key] = value.map((item, i) =>
        isPlainObject(item)
          ? filterObjectRecursive(item, options, `${childPath}[${i}]`, depth + 1)
          : item
      );
    } else if (isPlainObject(value)) {
      result[key] = filterObjectRecursive(value, options, childPath, depth + 1);
    } else {
      result[key] = value;
    }
  }

  return result;
}

/**
 * Filtre data selon les options de clés.
 * Retourne une copie filtrée sans modifier l'original.
 */
export function filterDataByKeys<T>(data: T, options: FilterKeysOptions): T {
  if (
    !options ||
    (!options.includedKeys?.length &&
      !options.excludedKeys?.length &&
      !options.includedNestedKeys?.length &&
      !options.excludedNestedKeys?.length)
  ) {
    return data;
  }

  if (Array.isArray(data)) {
    return data.map((item, i) =>
      isPlainObject(item)
        ? (filterObjectRecursive(
            item,
            options,
            `[${i}]`,
            0
          ) as T extends (infer U)[] ? U : T)
        : item
    ) as T;
  }

  if (isPlainObject(data)) {
    return filterObjectRecursive(
      data as Record<string, unknown>,
      options,
      "",
      0
    ) as T;
  }

  return data;
}
