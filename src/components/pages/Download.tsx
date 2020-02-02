import React from 'react';

interface Props {}

const Download: React.FC<Props> = () => {
  return (
    <div className='Download'>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>name</th>
            <th>sound</th>
            <th>hosting</th>
            <th>size</th>
            <th>upload</th>
            <th>link</th>
          </tr>
        </thead>
        <tbody>
          <DownloadItem
            name='NyxWeb Client'
            sound={true}
            host='Google'
            size='504MB'
            date='2019/02/01 20:15'
            link='http://google.com'
          />
          <DownloadItem
            name='NyxWeb Client'
            sound={false}
            host='Google'
            size='504MB'
            date='2019/02/01 20:15'
            link='http://google.com'
          />
          <DownloadItem
            name='NyxWeb Client'
            sound={true}
            host='Google'
            size='504MB'
            date='2019/02/01 20:15'
            link='http://google.com'
          />
        </tbody>
      </table>
    </div>
  );
};

interface ItemProps {
  name: string;
  sound: boolean;
  host: string;
  size: string;
  date: string;
  link: string;
}

const DownloadItem: React.FC<ItemProps> = ({
  name,
  sound,
  host,
  size,
  date,
  link
}) => {
  return (
    <tr>
      <td>X.</td>
      <td>{name}</td>
      <td>{sound ? '✅' : '❌'}</td>
      <td>{host}</td>
      <td>{size}</td>
      <td>{date}</td>
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
