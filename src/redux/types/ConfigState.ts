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
  stats: number | null;
  downloads:
    | {
        name: string;
        sound: boolean;
        host: string;
        size: string;
        upload: number;
        link: string;
      }[]
    | null;

  itemsList: { [key: string]: any } | null;
  itemsAncient: { [key: string]: any } | null;
  itemsOptions: { [key: string]: any } | null;
}
