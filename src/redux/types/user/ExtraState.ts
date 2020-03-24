import _nyxMarket from "../others/_nyxMarket";

export default interface ExtraState {
  loading: boolean;
  market: _nyxMarket[] | null;
  auction: {} | null;
  storage: {} | null;
  resources: {} | null;
  quests: {} | null;
}
