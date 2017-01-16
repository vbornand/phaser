export const LOADER_IDLE = 0;
export const LOADER_LOADING = 1;
export const LOADER_PROCESSING = 2;
export const LOADER_COMPLETE = 3;
export const LOADER_DESTROYED = 4;
export const LOADER_FAILED = 99;

// file is in the load queue but not yet started
export const FILE_PENDING = 5;
// file has been started to load by the loader (onLoad called)
export const FILE_LOADING = 6;
// file has loaded successfully, awaiting processing
export const FILE_LOADED = 7;
// file failed to load
export const FILE_FAILED = 8;
// file is being processed (onProcess callback)
export const FILE_PROCESSING = 9;
// file is being processed (onProcess callback)
export const FILE_WAITING_LINKFILE = 10;
// file is being processed (onProcess callback)
export const FILE_ERRORED = 11;
// file has finished processing
export const FILE_COMPLETE = 12;
// file has been destroyed
export const FILE_DESTROYED = 13;

export const TEXTURE_ATLAS_JSON_ARRAY = 20;
export const TEXTURE_ATLAS_JSON_HASH = 21;