import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

// Actions
import { getHof } from 'actions/rankings';
import AppState from 'redux/types/app';
import Character from 'redux/types/rankings/Character';

// Components
import ReactLoader from 'components/reusables/ReactLoader';

// Helpers
import { cclass, rankings } from 'helpers/characters';
import Name from '../Character/Name';

interface Props {}

const TopPlayers: React.FC<Props & RouteComponentProps> = ({ history }) => {
  const hof = useSelector((state: AppState) => state.rankings.hof);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHof());
  }, [dispatch]);

  return (
    <div className='TopPlayers'>
      {hof.loading ? (
        <ReactLoader />
      ) : (
        hof.list!.map((char, i: number) => (
          <CharacterCard key={i} char={char} history={history} />
        ))
      )}
    </div>
  );
};

interface CardProps {
  char: Character;
  history: {
    push: (path: string) => void;
  };
}

const CharacterCard: React.FC<CardProps> = ({ char, history }) => {
  return (
    char && (
      <div className='frame'>
        <div
          className={`card ${cclass.shortClass(
            char.Class
          )} ${rankings.winsTranslate(char.HOFWins)}`}
          onClick={() => history.push('/char/' + char.Name)}
        />
        <Name char={char} guild={false} />
      </div>
    )
  );
};

export default withRouter(TopPlayers);
