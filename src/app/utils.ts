export const exists = <TEntity>(entity: TEntity) => !!entity;
export const contains = (value: string, pattern: RegExp) => value.search(pattern) >= 0;
