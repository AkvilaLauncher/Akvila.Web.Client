import { FileListBaseEntity, FileListFolderBaseEntity } from '@/shared/api/contracts';
import { ResponseBaseEntity } from '@/shared/api/schemas';

// Adding files to whitelist
export type TPostWhitelistFileRequest = FileListBaseEntity[];
export type TPostWhitelistFileResponse = ResponseBaseEntity & {};

// Deleting files in whitelist
export type TDeleteWhitelistFileRequest = FileListBaseEntity[];
export type TDeleteWhitelistFileResponse = ResponseBaseEntity & {};

// Adding folders to whitelist
export type TPostWhitelistFolderRequest = FileListFolderBaseEntity[];
export type TPostWhitelistFolderResponse = ResponseBaseEntity & {};

// Deleting folders in whitelist
export type TDeleteWhitelistFolderRequest = FileListFolderBaseEntity[];
export type TDeleteWhitelistFolderResponse = ResponseBaseEntity & {};
