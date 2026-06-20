import { RouterProvider } from 'react-router';
import { router } from './routes';
import { SavedJobsProvider } from './context/SavedJobsContext';

export default function App() {
  return (
    <SavedJobsProvider>
      <RouterProvider router={router} />
    </SavedJobsProvider>
  );
}
