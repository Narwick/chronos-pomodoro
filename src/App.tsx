import { TaskContextProvider } from './contexts/TaskContext/TaskContextProvider';
import { Toaster } from './components/Toaster';
import { MainRouter } from './routers/MainRouter';

import './styles/theme.css';
import './styles/global.css';

export function App() {
  return (
    <TaskContextProvider>
      <Toaster>
        <MainRouter />
      </Toaster>
    </TaskContextProvider>
  );
}
