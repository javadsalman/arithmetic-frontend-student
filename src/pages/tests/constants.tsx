import { Mode, ModeColor } from "./types";
export const EASY_MODE = "easy";
export const MEDIUM_MODE = "medium";
export const HARD_MODE = "hard";

export const MODE_COLORS: Record<Mode, ModeColor> = {
    [EASY_MODE]: "yellow",
    [MEDIUM_MODE]: "green",
    [HARD_MODE]: "blue",
}

export const DEFAULT_COLUMN_COUNT = 11;
export const DEFAULT_ROUND_COUNT = 20;
