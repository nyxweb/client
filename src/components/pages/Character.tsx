import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { match } from 'react-router-dom';

// Partials
import Name from 'components/partials/Character/Name';
import Loader from 'components/partials/Loader';

// Actions
import { getCharacter, clearCharacter } from 'actions/rankings';

// Helpers
import { cclass, rankings, inventory } from 'helpers/characters';

// Types
import AppState from 'redux/types/app';
import Item from 'components/reusables/particles/items/Item';

interface Props {
  match: match<{ name: string }>;
}

const Rankings: React.FC<Props> = ({
  match: {
    params: { name }
  }
}) => {
  const [inv, setInv] = useState<any>();

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

  useEffect(() => {
    char && setInv(inventory.decode(char.Inventory));
  }, [char]);

  return (
    <div className='Character'>
      {loading ? (
        <Loader />
      ) : !char ? (
        `This character doesn't exist`
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
                        <td>Total Points</td>
                        <td>{char.totalPoints.toLocaleString()}</td>
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
                      <tr>
                        <td>Zen</td>
                        <td>{char.Money.toLocaleString()}</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          <div className='equipment'>
            <div className='title'>Equipment</div>
            <div className='container'>
              <div
                className='content'
                style={{
                  backgroundImage: `url('/images/classes/${cclass.shortClass(
                    char.Class
                  )}_inv.png')`
                }}
              >
                {inv &&
                  Object.keys(inv).map((key, i) => (
                    <div key={i} className={`item ${key}`}>
                      {inv[key] && (
                        <Item
                          hex={inv[key]}
                          style={{ maxWidth: '100%', maxHeight: '100%' }}
                        />
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Rankings;
