import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { get, set } from "../storage";
import { merge } from "lodash";

const STORAGE_KEYS = {
  FONT: {
    FONT_SIZE_MULTIPLIER: "appearance--font-size-multiplier",
    USE_SYSTEM: "appearance--font-use-system",
  },
  POSTS: {
    TYPE: "appearance--post-type",
    ENABLE_NEW_ACCOUNTS_HIGHLIGHTIFIER:
      "appearance--post-enable-new-accounts-highlightifier",
  },
  DARK: {
    USE_SYSTEM: "appearance--dark-use-system",
    USER_MODE: "appearance--dark-user-mode",
  },
} as const;

export const OPostAppearanceType = {
  Compact: "compact",
  Large: "large",
} as const;

export type PostAppearanceType =
  (typeof OPostAppearanceType)[keyof typeof OPostAppearanceType];

interface AppearanceState {
  font: {
    fontSizeMultiplier: number;
    useSystemFontSize: boolean;
  };
  posts: {
    type: PostAppearanceType;
    enableNewAccountsHighlightifier: boolean;
  };
  dark: {
    usingSystemDarkMode: boolean;
    userDarkMode: boolean;
  };
}

const initialState: AppearanceState = {
  font: {
    fontSizeMultiplier: 1,
    useSystemFontSize: false,
  },
  posts: {
    type: "large",
    enableNewAccountsHighlightifier: true,
  },
  dark: {
    usingSystemDarkMode: true,
    userDarkMode: false,
  },
};

const stateFromStorage: AppearanceState = merge(initialState, {
  font: {
    fontSizeMultiplier: get(STORAGE_KEYS.FONT.FONT_SIZE_MULTIPLIER),
    useSystemFontSize: get(STORAGE_KEYS.FONT.USE_SYSTEM),
  },
  posts: {
    type: get(STORAGE_KEYS.POSTS.TYPE),
    enableNewAccountsHighlightifier: get(
      STORAGE_KEYS.POSTS.ENABLE_NEW_ACCOUNTS_HIGHLIGHTIFIER
    ),
  },
  dark: {
    usingSystemDarkMode: get(STORAGE_KEYS.DARK.USE_SYSTEM),
    userDarkMode: get(STORAGE_KEYS.DARK.USER_MODE),
  },
});

export const appearanceSlice = createSlice({
  name: "appearance",
  initialState: stateFromStorage,
  reducers: {
    setFontSizeMultiplier(state, action: PayloadAction<number>) {
      state.font.fontSizeMultiplier = action.payload;

      set(STORAGE_KEYS.FONT.FONT_SIZE_MULTIPLIER, action.payload);
    },
    setUseSystemFontSize(state, action: PayloadAction<boolean>) {
      state.font.useSystemFontSize = action.payload;

      set(STORAGE_KEYS.FONT.USE_SYSTEM, action.payload);
    },
    setPostAppearance(state, action: PayloadAction<PostAppearanceType>) {
      state.posts.type = action.payload;

      set(STORAGE_KEYS.POSTS.TYPE, action.payload);
    },
    setEnableNewAccountsHighlightifier(state, action: PayloadAction<boolean>) {
      state.posts.enableNewAccountsHighlightifier = action.payload;

      set(
        STORAGE_KEYS.POSTS.ENABLE_NEW_ACCOUNTS_HIGHLIGHTIFIER,
        action.payload
      );
    },
    setUserDarkMode(state, action: PayloadAction<boolean>) {
      state.dark.userDarkMode = action.payload;

      set(STORAGE_KEYS.DARK.USER_MODE, action.payload);
    },
    setUseSystemDarkMode(state, action: PayloadAction<boolean>) {
      state.dark.usingSystemDarkMode = action.payload;

      set(STORAGE_KEYS.DARK.USE_SYSTEM, action.payload);
    },

    resetAppearance: () => initialState,
  },
});

export const {
  setFontSizeMultiplier,
  setUseSystemFontSize,
  setPostAppearance,
  setEnableNewAccountsHighlightifier,
  setUserDarkMode,
  setUseSystemDarkMode,
} = appearanceSlice.actions;

export default appearanceSlice.reducer;
