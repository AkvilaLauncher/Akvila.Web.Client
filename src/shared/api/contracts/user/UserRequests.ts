import { PlayerBaseEntity, UserBaseEntity } from '@/shared/api/contracts';
import { ResponseBaseEntity } from '@/shared/api/schemas';

// Registration
export type TPostSignUpRequest = {
  login: string;
  password: string;
  email: string;
};
export type TPostSignUpResponse = ResponseBaseEntity & {
  data: UserBaseEntity & {
    accessToken: string;
  };
};

// Authorization
export type TPostSignInRequest = {
  login: string;
  password: string;
};
export type TPostSignInResponse = ResponseBaseEntity & {
  data: UserBaseEntity & {
    accessToken: string;
  };
};

// Players
export type TGetPlayersRequest = {
  take: number;
  offset: number;
  findName: string;
};
export type TGetPlayersResponse = ResponseBaseEntity & {
  data: PlayerBaseEntity[];
};

// User Ban
export type TPostBanPlayersRequest = string[];
export type TPostBanPlayersResponse = ResponseBaseEntity & {};

// User Delete
export type TPostRemovePlayersRequest = string[];
export type TPostRemovePlayersResponse = ResponseBaseEntity & {};
