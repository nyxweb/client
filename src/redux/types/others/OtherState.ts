import _nyxMarket from './_nyxMarket';
import _nyxNews from './_nyxNews';

export default interface OtherState {
  market: {
    latest: {
      list: _nyxMarket[] | null;
      count: number | null;
    };
  };

  news: {
    loading: boolean;
    single: _nyxNews | null;
    many: _nyxNews[] | null;
  };
}
