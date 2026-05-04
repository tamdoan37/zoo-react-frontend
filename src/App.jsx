import { VisitorProvider } from './context/VisitorContext';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <VisitorProvider>
      <Dashboard />
    </VisitorProvider>
  );
}

export default App;