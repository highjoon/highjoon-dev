const countTags = (arr: string[]): { [key: string]: number }[] => {
  const counts: { [key: string]: number } = {};

  arr.forEach((value) => {
    counts[value] = (counts[value] || 0) + 1;
  });

  return Object.keys(counts).map((key) => ({ [key]: counts[key] }));
};

export default countTags;
