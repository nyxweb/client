import _nyxMarket from './_nyxMarket';
import _nyxNews from './_nyxNews';

export default interface OtherState {
  market: {
    latest: _nyxMarket[] | null;
  };

  news: {
    loading: boolean;
    single: _nyxNews | null;
    many: _nyxNews[] | null;
  };
}
