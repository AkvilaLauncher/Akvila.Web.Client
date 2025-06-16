import {
  AuthIntegrationBaseEntity,
  BranchBaseEntity,
  DiscordBaseEntity,
  LauncherActualVersionBaseEntity,
  LauncherBuildsBaseEntity,
  NewsEntity,
  NewsIntegrationBaseEntity,
  SentryBaseEntity,
  TextureServiceBaseEntity,
} from '@/shared/api/contracts';
import { TexturesServiceType } from '@/shared/enums';
import { ResponseBaseEntity } from '@/shared/api/schemas';
import { NewsTypeEnum } from '@/shared/enums/news-type';

// Getting the list of servers for authorization
export type TGetAuthIntegrationsRequest = {};
export type TGetAuthIntegrationsResponse = ResponseBaseEntity & {
  data: AuthIntegrationBaseEntity[];
};

// Obtaining an active authorization service
export type TGetActiveAuthIntegrationsRequest = {};
export type TGetActiveAuthIntegrationsResponse = ResponseBaseEntity & {
  data: AuthIntegrationBaseEntity;
};

// Getting news providers
export type TGetNewsProvidersIntegrationsRequest = {};
export type TGetNewsProvidersIntegrationsResponse = ResponseBaseEntity & {
  data: NewsIntegrationBaseEntity[];
};

// Getting the list of news
export type TGetNewsRequest = {};
export type TGetNewsResponse = ResponseBaseEntity & {
  data: NewsEntity[];
};

// Removing a news provider
export type TDeleteNewsProvidersIntegrationsRequest = {};
export type TDeleteNewsProvidersIntegrationsResponse = ResponseBaseEntity & {
  data: NewsIntegrationBaseEntity[];
};

// Getting the list of branches
export type TGetLauncherGithubVersionsRequest = {};
export type TGetLauncherGithubVersionsResponse = ResponseBaseEntity & {
  data: BranchBaseEntity[];
};

// Getting the list of platforms
export type TGetLauncherBuildPlatformsRequest = {};
export type TGetLauncherBuildPlatformsResponse = ResponseBaseEntity & {
  data: string[];
};

// Getting the list of builds for Launcher
export type TGetLauncherBuildVersionsRequest = {};
export type TGetLauncherBuildVersionsResponse = ResponseBaseEntity & {
  data: LauncherBuildsBaseEntity[];
};

// Getting the latest version of the launcher
export type TGetLauncherActualVersionRequest = {};
export type TGetLauncherActualVersionResponse = ResponseBaseEntity & {
  data: LauncherActualVersionBaseEntity;
};

// Updating the Launcher
export type TPostLauncherUploadRequest = FormData;
export type TPostLauncherUploadResponse = ResponseBaseEntity & {};

// Changing the authorization server
export type TPostAuthIntegrationsRequest = {
  authType: number;
  endpoint: string;
};
export type TPostAuthIntegrationsResponse = ResponseBaseEntity & {};

// Adding a news provider
export type TPostNewsIntegrationsRequest = {
  url: string;
  type: NewsTypeEnum;
};
export type TPostNewsIntegrationsResponse = ResponseBaseEntity & {};

// Obtaining an active authorization service
export type TGetSentryConnectRequest = {};
export type TGetSentryConnectResponse = ResponseBaseEntity & {
  data: SentryBaseEntity;
};

// Changing the authorization server
export type TPutSentryConnectRequest = { url: string };
export type TPutSentryConnectResponse = ResponseBaseEntity & {};

// Obtaining texture service
export type TGetConnectTexturesRequest = { type: TexturesServiceType };
export type TGetConnectTexturesResponse = ResponseBaseEntity & {
  data: TextureServiceBaseEntity;
};

// Changing the texture service
export type TPutConnectTexturesRequest = { type: TexturesServiceType; url: string };
export type TPutConnectTexturesResponse = ResponseBaseEntity & {};

// Obtaining Discord connection
export type TGetConnectDiscordRequest = {};
export type TGetConnectDiscordResponse = ResponseBaseEntity & {
  data: DiscordBaseEntity;
};

// Changing Discord connection
export type TPutConnectDiscordRequest = DiscordBaseEntity;
export type TPutConnectDiscordResponse = ResponseBaseEntity & {};
