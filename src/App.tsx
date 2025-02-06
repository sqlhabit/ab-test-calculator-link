import { BrowserRouter as Router } from 'react-router-dom';
import { ABTestCalculator } from './components/ABTestCalculator';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <ABTestCalculator />
      </div>
    </Router>
  );
}

export default App;
