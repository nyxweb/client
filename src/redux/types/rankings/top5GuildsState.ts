import Guild from './Guild';

export default interface top5GuildsState {
  loading: boolean;
  list: Guild[] | null;
}
