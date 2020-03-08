import Event from './Event';
import MarketState from './MarketState';

export default interface OtherState {
  events: Event[];
  market: MarketState;
}
