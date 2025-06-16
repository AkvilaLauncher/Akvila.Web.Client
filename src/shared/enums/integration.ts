export enum AuthenticationType {
  AUTHENTICATION_TYPE_UNDEFINED = 0, // Authorization forbidden
  AUTHENTICATION_TYPE_DATALIFE_ENGINE = 1, // Authorization via DLE
  AUTHENTICATION_TYPE_ANY = 2, // Authorization allowed with any login and password
  AUTHENTICATION_TYPE_AZURIOM = 3, // Authorization allowed with any login and password
  AUTHENTICATION_TYPE_EASY_CABINET = 4, // Authorization via EasyCabinet
  AUTHENTICATION_TYPE_UNICORECMS = 5, // Authorization via UniCoreCMS
  AUTHENTICATION_TYPE_CUSTOM = 6, // Authorization via own endpoint
  AUTHENTICATION_TYPE_NAMELESS_MC = 7, // Authorization via NamelessMC
  AUTHENTICATION_TYPE_WEB_MCR_RELOADED = 8, // Authorization via WebMCRReloaded
  AUTHENTICATION_TYPE_WORDPRESS = 9, // Authorization via WordPress
}

export enum AuthenticationTypeOption {
  'OPTION_0' = 'Undefined', // Authorization forbidden
  'OPTION_1' = 'DataLife Engine', // Authorization via DLE
  'OPTION_2' = 'Any', // Authorization allowed with any login and password
  'OPTION_3' = 'Azuriom', // Authorization allowed with any login and password
  'OPTION_4' = 'EasyCabinet', // Authorization via EasyCabinet
  'OPTION_5' = 'UniCoreCMS', // Authorization via UniCoreCMS
  'OPTION_6' = 'Own Authorization', // Authorization via own endpoint
  'OPTION_7' = 'NamelessMC', // Authorization via NamelessMC
  'OPTION_8' = 'WebMCRReloaded', // Authorization via WebMCRReloaded
  'OPTION_9' = 'WordPress', // Authorization via WordPress
}
