import { Heading } from './components/Heading';

import './styles/theme.css';
import './styles/global.css';
import { TimerIcon } from 'lucide-react';

function App() {
  return (
    <>
      <div className='container-fluid'>
        <div className='container'>
          <div className='content'>
            <Heading>
              <TimerIcon size={32} />
              <h1 className='heading'>Chronos Pomodoro</h1>
            </Heading>
            <p className='description'>
              A simple Pomodoro timer to help you focus and manage your time
              effectively.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export { App };
