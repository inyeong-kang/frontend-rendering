import type { User } from '@/types/user';

import { deleteFetch, getFetch, patchFetch } from '@/utils/fetch';

export interface UserInfoResponse {
  nickname: string;
  gender: 'FEMALE' | 'MALE';
  birthYear: number;
  postCount: number;
  voteCount: number;
}

export interface ModifyNicknameRequest {
  nickname: string;
}

export interface UpdateUserInfoRequest {
  gender: 'MALE' | 'FEMALE';
  birthYear: number;
}

export const transformUserInfoResponse = (userInfo: UserInfoResponse): User => {
  const { nickname, gender, birthYear, postCount, voteCount } = userInfo;

  return {
    nickname,
    gender,
    birthYear,
    postCount,
    voteCount,
  };
};

const BASE_URL = process.env.VOTOGETHER_BASE_URL;

export const getUserInfo = async (
  isLoggedIn: boolean
): Promise<User | null> => {
  if (!isLoggedIn) return null;

  const userInfo = await getFetch<UserInfoResponse>(`${BASE_URL}/members/me`);

  return transformUserInfoResponse(userInfo);
};

export const modifyNickname = async (nickname: string) => {
  await patchFetch<ModifyNicknameRequest>(`${BASE_URL}/members/me/nickname`, {
    nickname,
  });
};

export const withdrawalMembership = async () => {
  await deleteFetch(`${BASE_URL}/members/me/delete`);
};

export const updateUserInfo = async (userInfo: UpdateUserInfoRequest) => {
  await patchFetch<UpdateUserInfoRequest>(
    `${BASE_URL}/members/me/detail`,
    userInfo
  );
};

export const logoutUser = async () => {
  await fetch('/auth/logout', { method: 'DELETE', credentials: 'include' });
};
