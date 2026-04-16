import type { GiscusStats } from '@/entities/giscus/services/giscus.service';
import { fetchAllGiscusStats } from '@/entities/giscus/services/giscus.service';

export async function getGiscusStatsApi(): Promise<Record<string, GiscusStats>> {
  return fetchAllGiscusStats();
}
