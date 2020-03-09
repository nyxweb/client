export default interface ConfigState {
  events:
    | {
        name: string;
        hours: string[];
      }[]
    | null;
  online_time: number | null;
  vip: number | null;
  reset: {
    max_reset: number;
    reset_level: number;
    reset_zen: number;
    reset_zen_formula: boolean;
    reset_stats: boolean;
    bonus_stats: number[];
  } | null;
}
