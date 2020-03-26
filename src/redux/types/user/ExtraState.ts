import _nyxMarket from '../others/_nyxMarket';

export default interface ExtraState {
  loading: boolean;
  market: {
    list: _nyxMarket[] | null;
    count: number | null;
  };
  auction: {} | null;
  storage: {} | null;
  resources: {} | null;
  quests: {} | null;
}
