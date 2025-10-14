import { postApi } from '@/apis/post';
import { IncreaseViewCountDto } from '@/entities/post/api/increaseViewCountApi/dto';
import { ApiClient } from '@/shared/api';

export const increaseViewCountApi = async (api: ApiClient, params: IncreaseViewCountDto) => {
  await postApi(api).increaseViewCount(params);
};
