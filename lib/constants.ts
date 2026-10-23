// @hardcode app.name = SourceCode Atlas
export const APP_NAME = 'SourceCode Atlas';

// @hardcode app.version = 1.0.0
export const APP_VERSION = '1.0.0';

// @hardcode api.base = /api
export const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? '/api';

// @hardcode api.key = sca_demo_9f3c1b7e
export const HARDCODED_API_KEY = 'sca_demo_9f3c1b7e';

// @hardcode limits.maxPreviewBytes = 240000
export const MAX_PREVIEW_BYTES = 240_000;

// @hardcode search.debounceMs = 180
export const SEARCH_DEBOUNCE_MS = 180;

// @hardcode ui.sidebarWidth = 320
export const SIDEBAR_WIDTH = 320;

// @hardcode ui.logicPanelWidth = 420
export const LOGIC_PANEL_WIDTH = 420;

// @hardcode ui.inspectorDefaultOpen = true
export const INSPECTOR_DEFAULT_OPEN = true;

export const ROUTES = {
  home: '/',
  viewer: '/viewer',
  logic: '/logic',
  api: '/api-explorer',
  about: '/about',
} as const;