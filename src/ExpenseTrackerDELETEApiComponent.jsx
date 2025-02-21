import React, { useState } from 'react';
import axios from 'axios';
import { buildDeleteRequest } from './helper.jsx';



const ExpenseTrackerDELETEApiComponent = () => {
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [response, setResponse] = useState('');
  

  const handleDeleteExpense = async (event) => {
    event.preventDefault();
    const baseGetRequestURL = 'http://localhost:8080/expenses';
    const fullGetRequest = buildDeleteRequest(baseGetRequestURL, userId, date, amount);
    console.log("Using get request: ", fullGetRequest);
    try {
        const response = await axios.delete(fullGetRequest);
        setError(null);
        setResponse("Successfully deleted expense for User: " + userId + ", Date: " + date + ", and Amount: " + amount + " with response: " + response.status);
    } catch (error) {
        console.error(`Error sending DELETE request: `, error);
        setError('Error deleting expense record: ' + error );
        setResponse(null);
    }
  };



  return (
    <div>
      <div>
        <h2>Delete Expense</h2>
        <form onSubmit={handleDeleteExpense}>
        <div>
          <label>User Id:</label>
          <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
        </div>
        <div>
          <label>Date: </label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div>
          <label>Amount:</label>
          <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </div>
        <button type="submit">Delete</button>
        {error && <p>ERROR: {error}</p>} {/* Display the variable if it has a value */}
        </form>
      </div>
      <div>
      <h3>
        {error && <p>ERROR: {error}</p>} {/* Display the variable if it has a value */}
        {response && <p>{response}</p>} {/* Display the variable if it has a value */}
      </h3>
      </div>
    </div>
  );
};
export default ExpenseTrackerDELETEApiComponent;
