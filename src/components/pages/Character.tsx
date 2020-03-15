import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { match } from 'react-router-dom';

// Partials
import Name from 'components/partials/Character/Name';
import Loader from 'components/partials/Loader';

// Actions
import { getCharacter, clearCharacter } from 'actions/rankings';

// Helpers
import { cclass, rankings } from 'helpers/characters';

// Types
import AppState from 'redux/types/app';

interface Props {
  match: match<{ name: string }>;
}

const Rankings: React.FC<Props> = ({
  match: {
    params: { name }
  }
}) => {
  const { loading, char } = useSelector(
    (state: AppState) => state.rankings.character
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCharacter(name));

    return () => {
      dispatch(clearCharacter());
    };
  }, [dispatch, name]);

  return (
    <div className='Character'>
      {loading ? (
        <Loader />
      ) : !char ? (
        'no char'
      ) : (
        <>
          <table className='char-info'>
            <tbody>
              <tr>
                <td colSpan={2}>
                  <Name char={char} style={{ display: 'inline-block' }} />
                </td>
              </tr>
              <tr>
                <td className='image'>
                  <img
                    src={`/images/classes/${cclass.shortClass(char.Class)}.png`}
                    alt='char'
                  />
                </td>
                <td className='info'>
                  <table>
                    <tbody>
                      <tr>
                        <td style={{ width: '50%' }}>Class</td>
                        <td>{cclass.charClass(char.Class)}</td>
                      </tr>
                      <tr>
                        <td>Level</td>
                        <td>
                          {char.cLevel}
                          <sup>{char.Resets}</sup>
                        </td>
                      </tr>
                      <tr>
                        <td>Status</td>
                        <td
                          dangerouslySetInnerHTML={{
                            __html: rankings.pkStatus(char.PkCount)
                          }}
                        ></td>
                      </tr>
                      <tr>
                        <td>HOF Wins</td>
                        <td>{char.HOFWins}</td>
                      </tr>
                      <tr>
                        <td>Location</td>
                        <td>
                          <span
                            dangerouslySetInnerHTML={{
                              __html: rankings.location(char.MapNumber)
                            }}
                          />{' '}
                          ( {char.MapPosX}, {char.MapPosY} )
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Rankings;
