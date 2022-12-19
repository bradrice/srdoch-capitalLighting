import { APP_BASE_URL } from '../config';

export const APP_ROOT = APP_BASE_URL;
export const PERFORM_AUDIT = `${APP_ROOT}/audit` as const;
