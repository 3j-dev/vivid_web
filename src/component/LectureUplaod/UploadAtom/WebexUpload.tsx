import styled from 'styled-components';
import { useState, useLayoutEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { parseISO, format } from 'date-fns';

import { WebexRecordingT } from '@/interfaces/upload';
import { getWebexRecordingList, postWebexRecording } from '@/api/upload';
import { Colors } from '@/styles/color';
import { Typography } from '@/styles/style';
import { pushNotification } from '@/util/notification';
import LoaderSpiner from '@/component/Common/LoaderSpinner';
import { getErrorToast } from '@/api/error/error.config';

interface NowSpaceT {
  spaceId: number;
}

const WebexUpload: React.FC<NowSpaceT> = ({ spaceId }: NowSpaceT) => {
  const [recordingList, setRecordingList] = useState<WebexRecordingT[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const initialize = useCallback(async () => {
    setIsLoading(true);
    const { status, data, code } = await getWebexRecordingList();
    if (status === 200) {
      setRecordingList(data);
    } else {
      getErrorToast(code);
    }
    setIsLoading(false);
  }, []);

  useLayoutEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <UploadContainer>
      {isLoading && <LoaderSpiner />}
      {recordingList?.length > 0 ? (
        <WebexRecordingAtomGroup>
          {recordingList !== null &&
            recordingList.length > 0 &&
            recordingList.map((recording, idx) => {
              return (
                <WebexRecordingAtom
                  spaceId={spaceId}
                  recordingId={recording.recordingId}
                  topic={recording.topic}
                  hostEmail={recording.hostEmail}
                  timeRecorded={recording.timeRecorded}
                  key={idx}
                />
              );
            })}
        </WebexRecordingAtomGroup>
      ) : (
        <WebexLoginButton />
      )}
    </UploadContainer>
  );
};

interface WebexRecordingAtomProps extends WebexRecordingT {
  spaceId: number;
}

const WebexRecordingAtom: React.FC<WebexRecordingAtomProps> = ({
  spaceId,
  recordingId,
  topic,
  hostEmail,
  timeRecorded,
}: WebexRecordingAtomProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onClickHandler = () => {
    const data = {
      title: topic,
      description: topic,
    };
    setIsLoading(true);
    postWebexRecording(spaceId, recordingId, data)
      .then(() => pushNotification('업로드 성공!', 'success'))
      .finally(() => setIsLoading(false));
  };

  return (
    <WebexRecordingAtomContainer onClick={onClickHandler}>
      {isLoading && <LoaderSpiner />}
      <TextGroup width={30}>
        <h4>{topic}</h4>
      </TextGroup>
      <TextGroup width={20}>{hostEmail}</TextGroup>
      <TextGroup width={20}>{format(parseISO(timeRecorded), 'yyyy.MM.dd')}</TextGroup>
    </WebexRecordingAtomContainer>
  );
};

const WebexRecordingAtomGroup = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

const WebexRecordingAtomContainer = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 20px;
  border: 1px solid ${Colors.Gray0};
  box-shadow: 0px 0px 10px rgb(0 0 0 / 10%);
`;

const TextGroup = styled.div<{ width: number }>`
  width: ${({ width }) => `${width}%`};
  height: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${Typography.Paragraph2};
`;

const WebexLoginButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <h3>To check recording list, login.</h3>
      <WebexLoginButtonContainer
        onClick={() => {
          navigate('/redirect', {
            state: { url: process.env.BASE_API_URL + '/api/login/webex' },
          });
        }}
      >
        Webex Login
      </WebexLoginButtonContainer>
    </>
  );
};

const UploadContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10%;
`;

const WebexLoginButtonContainer = styled.button`
  width: 120px;
  height: 40px;
  border-radius: 20px;
  background: ${Colors.Green};
  text-decoration: none;
  border: 0;
  color: ${Colors.White};
  ${Typography.Paragraph1};
  margin-top: 2%;
`;

export default WebexUpload;
