import axios from 'axios';
import { Session } from 'openvidu-browser';
import { API_BASE_URL } from './urls';

interface User {
  childId: string;
  name: string;
  gender: string;
  school: string;
  grade: number;
}

export const getUserInfo = async (userId: string, userToken: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/children/${userId}`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    console.log('유저 정보 가져오기 성공!');
    console.log(response);
    return response.data.result;
  } catch (error) {
    console.log('유저 정보 가져오기 실패ㅠ');
    console.log(error);
    throw error;
  }
};

export const getToken = async (userInfo: User, userToken: string) => {
  console.log('토큰 가져오기');
  console.log(userInfo);

  try {
    const response = await axios.post(`${API_BASE_URL}/meetings/random/start`, userInfo, {
      headers: {
        Authorization: `Bearer ${userToken}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('토큰 가져오기 성공!');
    console.log(response);
    return response.data;
  } catch (error) {
    console.log('토큰 가져오기 실패ㅠ');
    console.log(error);
    throw error;
  }
};

export const getFriendSessionToken = async (
  childId: string,
  userToken: string,
  sessionId: string,
) => {
  console.log('초대 토큰 가져오기');

  try {
    const response = await axios.post(
      `${API_BASE_URL}/meetings/friend/start`,
      {
        childId,
        sessionId,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
      },
    );

    console.log('초대 토큰 가져오기 성공!');
    console.log(response);
    return response.data.token;
  } catch (error) {
    console.log('초대 토큰 가져오기 실패ㅠ');
    console.log(error);
    throw error;
  }
};

export const destroySession = async (
  session: Session,
  guideScript: string,
  timeStamp: string,
  userToken: string,
) => {
  console.log('세션 파괴!!!!!!');
  console.log(session.sessionId, guideScript, timeStamp);

  try {
    const response = await axios.post(
      `${API_BASE_URL}/meetings/random/stop`,
      {
        sessionId: session.sessionId,
        guideSeq: guideScript,
        timeline: timeStamp,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      },
    );

    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

export const destroyFriendSession = async (sessionId: string, userToken: string) => {
  console.log('친구 세션 녹화 종료');

  try {
    const response = await axios.post(
      `${API_BASE_URL}/meetings/friend/stop`,
      { sessionId },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      },
    );

    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
