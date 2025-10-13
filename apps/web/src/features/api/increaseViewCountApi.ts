import { postApi } from '@/apis/post';
import { IncreaseViewCountDto } from '@/features/api/increaseViewCountDto';
import { ApiClient } from '@/shared/api';

export const increaseViewCountApi = async (api: ApiClient, params: IncreaseViewCountDto) => {
  await postApi(api).increaseViewCount(params);
};
