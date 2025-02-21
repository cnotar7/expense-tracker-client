import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ExpenseTrackerPOSTApiComponent from './ExpenseTrackerPOSTApiComponent';
import ExpenseTrackerGETApiComponent from './ExpenseTrackerGETApiComponent';
import ExpenseTrackerDELETEApiComponent from './ExpenseTrackerDELETEApiComponent';
import PlaidConfigurationComponent from './PlaidConfigurationComponent';

function App() {
  const [selectedComponent, setSelectedComponent] = useState(null);

  const handleSelectComponent = (component) => {
    setSelectedComponent(component);
  };

  return (
    <>
    <div>
      <a href="https://vite.dev" target="_blank">
        <img src={viteLogo} className="logo" alt="Vite logo" />
      </a>
      <a href="https://react.dev" target="_blank">
        <img src={reactLogo} className="logo react" alt="React logo" />
      </a>
    </div>
    <h1>Vite + React</h1>
    <div className="App">
      <h1>
        Testing Expense Tracker API
      </h1>
      <div style={{ padding: '20px' }}>
        <nav>
          <button onClick={() => handleSelectComponent('AddExpenses')}>Add Expenses</button>
          <button onClick={() => handleSelectComponent('GetExpenseReport')}>Get Expense Report</button>
          <button onClick={() => handleSelectComponent('DeleteExpense')}>Delete Expense</button>
          <button onClick={() => handleSelectComponent('PlaidConfig')}>Plaid Configuration</button>
        </nav>
        <div>
          {selectedComponent === 'AddExpenses' && <ExpenseTrackerPOSTApiComponent />}
          {selectedComponent === 'GetExpenseReport' && <ExpenseTrackerGETApiComponent />}
          {selectedComponent === 'DeleteExpense' && <ExpenseTrackerDELETEApiComponent />}
          {selectedComponent === 'PlaidConfig' && <PlaidConfigurationComponent />}
        </div>
      </div>
    </div>
    </>
  );
}

export default App;
