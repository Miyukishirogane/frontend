export const BACKEND_URL =
  import.meta.env.VITE_APP_ENV === 'product' ? 'https://api.tcvault.xyz/api' : 'https://api-staging.tcvault.xyz/api';
// export const BACKEND_URL = 'http://178.128.51.42:8009/api'
export const BACKEND_CENTIC = 'https://develop.centic.io/tcv-api/market-info';

export const BACKEND_CENTIC_URL =
  import.meta.env.VITE_APP_ENV === 'product'
    ? 'https://develop.centic.io/tcv-api'
    : 'https://develop.centic.io/tcv-api-stag';

export const BACKEND_PROJEET = 'https://api-projeet.tcvault.xyz';

export const GOVERNANCE_IMAGE = 'https://ipfs.io/ipfs/';

export const BACKEND_AUTO_RAID = 'https://api-event.tcvault.xyz';
