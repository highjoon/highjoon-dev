export const getTodayMidnight = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return today;
};

export const getTomorrowMidnight = () => {
  const today = getTodayMidnight();

  return new Date(today.getTime() + 24 * 60 * 60 * 1000);
};
