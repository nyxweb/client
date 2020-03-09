export default interface ConfigState {
  events:
    | {
        name: string;
        hours: string[];
      }[]
    | null
    | false;
  online_time: number | null | false;
  vip: number | null | false;
  reset:
    | {
        max_reset: number;
        reset_level: number;
        reset_zen: number;
        reset_zen_formula: boolean;
        reset_stats: boolean;
        bonus_stats: number[];
      }
    | null
    | false;
}
