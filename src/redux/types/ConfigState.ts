import Resource from './reusables/Resource';
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
  resources: Resource[] | null | false;
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

  change_name: {
    enabled: boolean;
    cost: number;
    min_length: number;
    max_length: number;
  } | null;

  change_class: {
    enabled: boolean;
    cost: number;
    min_resets: number;
    max_resets: number;
    min_level: number;
    classes: number[];
  } | null;

  itemsList: { [key: string]: any } | null;
  itemsAncient: { [key: string]: any } | null;
  itemsOptions: { [key: string]: any } | null;

  [key: string]: any;
}
