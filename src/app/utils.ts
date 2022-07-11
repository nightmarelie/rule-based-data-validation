const exists = <TEntity>(entity: TEntity) => !!entity;

const contains = (value: string, pattern: RegExp) => value.search(pattern) >= 0;

const inRange = (value: Comparable, min: Comparable, max: Comparable) =>
  value >= min && value <= max;

const yearsOf = (date: TimeStamp): NumberYears =>
  new Date().getFullYear() - new Date(date).getFullYear();

const isNumber = (value: NumberLike) => Number.isFinite(Number(value));

export { exists, contains, inRange, yearsOf, isNumber };
