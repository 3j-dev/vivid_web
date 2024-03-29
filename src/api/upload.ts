import { WebexRecordingT } from '@/interfaces/upload';
import FormData from 'form-data';

import { axiosInstance } from './instance';
import { apiRoutes } from './routes';

export const postWebexLoginCode = (code: string) =>
  axiosInstance.post(apiRoutes.postWebexLoginCode.replace('{code}', code));

export const getWebexRecordingList = () =>
  axiosInstance.get<WebexRecordingT[]>(apiRoutes.getWebexRecordingList);

export const postWebexRecording = (videoSpaceId: number, recordingId: string, data: object) =>
  axiosInstance.post<{ id: number }>(
    apiRoutes.postWebexRecording
      .replace('{video-space-id}', `${videoSpaceId}`)
      .replace('{recording-id}', recordingId),
    data,
  );

export const uploadVideoFile = (videoSpaceId: number, videoFile: File) => {
  let videoFormData = new FormData();
  const blob = new Blob([JSON.stringify({ title: videoFile.name, description: videoFile.name })], {
    type: 'application/json',
  });
  videoFormData.append('video', videoFile, { contentType: 'video/mp4' });
  videoFormData.append('videoInfo', blob, { contentType: 'application/json' });
  return axiosInstance.post<{ id: number }>(
    apiRoutes.uploadVideoFile.replace('{video-space-id}', `${videoSpaceId}`),
    videoFormData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    },
  );
};
