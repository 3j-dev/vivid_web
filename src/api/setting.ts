import { axiosInstance } from './instance';
import { apiRoutes } from './routes';

export const plusUserInVideoSpace = async (videoSpaceId: number, userEmail: string) => {
  const data = await axiosInstance.post(
    apiRoutes.plusUserInVideoSpace
      .replace('{video-space-id}', `${videoSpaceId}`)
      .replace('{user-email}', userEmail),
  );
  return data;
};

export const plusVideoSpace = async (name: string, description: string) => {
  const data = await axiosInstance.post(apiRoutes.createVideoSpace, {
    name: name,
    description: description,
  });
  return data;
};

export const getHostedVideoList = async () => {
  const data = await axiosInstance.get(apiRoutes.getHostVideoSpaceList);
  return data;
};
