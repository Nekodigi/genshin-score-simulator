export const toSortKeyScore = (value: string) => {
  return value === "minScore" || value === "avgScore" || value === "maxScore"
    ? value
    : "avgScore";
};
