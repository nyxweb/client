import React, { useState } from 'react';

// Partials
import ContentBlock from 'components/partials/RightSidebar/ContentBlock';

interface Props {}

const EventTimers: React.FC<Props> = () => {
  const [events, setEvents] = useState();

  return (
    <ContentBlock title='server events' desc='server events schedule'>
      <div className='EventTimers'>
        {!events
          ? 'loading...'
          : events.map((event: any, i: number) => (
              <Event name={event.name} time={event.hours[0]} timeLeft='taina' />
            ))}
      </div>
    </ContentBlock>
  );
};

interface EventProps {
  name: string;
  time: string;
  timeLeft: string;
}

const Event: React.FC<EventProps> = ({ name, time, timeLeft }) => {
  return (
    <div className='event'>
      <div className='event-title'>
        <div>{name}</div>
        <div>{time}</div>
      </div>
      <div className='event-desc'>
        <div>starts in</div>
        <div>{timeLeft}</div>
      </div>
    </div>
  );
};

export default EventTimers;
