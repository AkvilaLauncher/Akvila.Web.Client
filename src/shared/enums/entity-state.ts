export enum EntityState {
  ENTITY_STATE_CREATED = 0, // Profile created
  ENTITY_STATE_LOADING = 1, // Profile is being loaded
  ENTITY_STATE_ACTIVE = 2, // Profile active
  ENTITY_STATE_INITIALIZE = 3, // Profile preparation
  ENTITY_STATE_ERROR = 4, // Error while working with profile
  ENTITY_STATE_NEED_COMPILE = 5, // Profile compile required
  ENTITY_STATE_PACKING = 6, // Profile compile

  ENTITY_STATE_DISABLED = 99999, // Profile disabled
}

export enum EntityStateOption {
  'OPTION_0' = 'Created', // Profile created
  'OPTION_1' = 'Loaded', // Profile is loaded
  'OPTION_2' = 'Active', // Profile is active
  'OPTION_3' = 'Preparing', // Profile is being prepared.
  'OPTION_4' = 'Error', // Error while working with profile
  'OPTION_5' = 'Compile required', // Profile compile required
  'OPTION_6' = 'Compiling', // Profile compile required
  'OPTION_99999' = 'Unavailable', // Profile disabled
}
