import dayjs, { ConfigType } from 'dayjs';

/**
 * 날짜를 'YYYY. MM' 형식으로 포맷합니다.
 * @param date Date | string | number
 * @returns string
 */
export const formatCareerDate = (date: ConfigType): string => {
  return dayjs(date).format('YYYY. MM');
};
