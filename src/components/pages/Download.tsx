import React from 'react';
import Moment from 'react-moment';

// Icons
import { ReactComponent as SuccessIcon } from 'assets/icons/success.svg';
import { ReactComponent as DangerIcon } from 'assets/icons/danger.svg';
import { useSelector } from 'react-redux';
import AppState from '../../redux/types/app';

interface Props {}

const Download: React.FC<Props> = () => {
  const list = useSelector((state: AppState) => state.config.downloads);

  return (
    <div className='Download'>
      <table className='Table'>
        <thead>
          <tr>
            <th>#</th>
            <th>name</th>
            <th>sound</th>
            <th>host</th>
            <th>size</th>
            <th>upload</th>
            <th>link</th>
          </tr>
        </thead>
        <tbody>
          {list && list.length ? (
            list.map((d, i) => (
              <DownloadItem
                key={i}
                index={i + 1}
                name={d.name}
                sound={d.sound}
                host={d.host}
                size={d.size}
                date={d.upload}
                link={d.link}
              />
            ))
          ) : (
            <tr>
              <td colSpan={7} style={{ textAlign: 'center' }}>
                No links added
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

interface ItemProps {
  index: number;
  name: string;
  sound: boolean;
  host: string;
  size: string;
  date: number;
  link: string;
}

const DownloadItem: React.FC<ItemProps> = ({
  index,
  name,
  sound,
  host,
  size,
  date,
  link
}) => {
  return (
    <tr>
      <td>{index}.</td>
      <td>{name}</td>
      <td>
        {sound ? (
          <SuccessIcon color='#1bb54e' width={16} height={16} />
        ) : (
          <DangerIcon color='#ed3e3e' width={16} height={16} />
        )}
      </td>
      <td>{host}</td>
      <td>{size}</td>
      <td>
        <Moment
          style={{ display: 'inline-block', whiteSpace: 'nowrap' }}
          fromNow
          unix
          withTitle
        >
          {date}
        </Moment>
      </td>
      <td>
        <a
          className='down-link'
          href={link}
          target='_blank'
          rel='noopener noreferrer'
        >
          Download
        </a>
      </td>
    </tr>
  );
};

export default Download;
