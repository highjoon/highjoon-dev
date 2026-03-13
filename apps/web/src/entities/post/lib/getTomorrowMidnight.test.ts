import { getTodayMidnight, getTomorrowMidnight } from './getTomorrowMidnight';

describe('getTodayMidnight', () => {
  test('오늘 자정(00:00:00.000)을 반환한다', () => {
    const result = getTodayMidnight();

    expect(result.getHours()).toBe(0);
    expect(result.getMinutes()).toBe(0);
    expect(result.getSeconds()).toBe(0);
    expect(result.getMilliseconds()).toBe(0);
  });
});

describe('getTomorrowMidnight', () => {
  test('내일 자정을 반환한다', () => {
    const today = getTodayMidnight();
    const tomorrow = getTomorrowMidnight();

    const diffMs = tomorrow.getTime() - today.getTime();
    expect(diffMs).toBe(24 * 60 * 60 * 1000);
  });

  test('시간이 00:00:00.000이다', () => {
    const result = getTomorrowMidnight();

    expect(result.getHours()).toBe(0);
    expect(result.getMinutes()).toBe(0);
    expect(result.getSeconds()).toBe(0);
    expect(result.getMilliseconds()).toBe(0);
  });
});
