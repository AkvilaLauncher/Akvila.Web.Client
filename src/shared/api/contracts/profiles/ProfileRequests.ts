import {
  GameLoaderOption,
  JavaVersionBaseEntity,
  PlayerBaseEntity,
  ProfileBaseEntity,
  ProfileExtendedBaseEntity,
} from '@/shared/api/contracts';
import { ResponseBaseEntity } from '@/shared/api/schemas';
import { OsArchitectureEnum } from '@/shared/enums';

// Getting profiles
export type TGetProfilesRequest = {};
export type TGetProfilesResponse = ResponseBaseEntity & {
  data: ProfileBaseEntity[];
};

// Creating a profile
export type TPostProfilesRequest = FormData;
export type TPostProfilesResponse = ResponseBaseEntity & {
  data: Partial<ProfileBaseEntity>;
};

// Downloading the mod
export type TPostLoadProfileModRequest = {
  profileName: string;
  isOptional: boolean;
  data: FormData;
};
export type TPostLoadProfileModResponse = ResponseBaseEntity;

// Downloading the mod by URL
export type TPostLoadProfileModByUrlRequest = {
  profileName: string;
  isOptional: boolean;
  links: string[];
};

export type TPostLoadProfileModByUrlResponse = ResponseBaseEntity;

// Obtaining a profile
export type TGetProfileRequest = {
  UserName: string;
  ProfileName: string;
  UserAccessToken: string;
  UserUuid: string;
  OsArchitecture: OsArchitectureEnum;
  OsType: string;

  jvmArguments?: string;
  WindowWidth?: number;
  WindowHeight?: number;
  GamePort?: number;
  GameAddress?: string;
  IsFullScreen?: boolean;
  RamSize?: number;
};
export type TGetProfileResponse = ResponseBaseEntity & {
  data: ProfileExtendedBaseEntity;
};

// Editing a profile
export type TPutProfileRequest = FormData;
export type TPutProfileResponse = ResponseBaseEntity & {
  data: ProfileBaseEntity;
};

// Deleting a profile
export type TDeleteProfileRequest = {
  profileName: string;
  removeFiles: boolean;
};
export type TDeleteProfileResponse = ResponseBaseEntity & {};

// Removing a mod
export type TRemoveProfileModRequest = {
  profileName: string;
  modName: string;
};
export type TRemoveProfileModResponse = ResponseBaseEntity & {};

// Adding a player to a profile
export type TAddPlayerToProfileRequest = {
  profileName: string;
  userUuid: string;
};
export type TAddPlayerToProfileResponse = ResponseBaseEntity & {
  data: PlayerBaseEntity;
};

// Deleting a player in a profile
export type TDeletePlayerToProfileRequest = {};
export type TDeletePlayerToProfileResponse = ResponseBaseEntity & {};

// Deleting profiles
export type TDeleteProfilesRequest = {
  profileNames: string;
  removeFiles: boolean;
};
export type TDeleteProfilesResponse = ResponseBaseEntity & {};

// Getting the list of versions
export type TGameVersionsRequest = {
  gameLoader: GameLoaderOption;
  minecraftVersion: string;
};
export type TGameVersionsResponse = ResponseBaseEntity & {
  data: string[];
};

// Getting the list of Java versions
export type TJavaVersionsRequest = {};
export type TJavaVersionsResponse = ResponseBaseEntity & {
  data: JavaVersionBaseEntity[];
};
