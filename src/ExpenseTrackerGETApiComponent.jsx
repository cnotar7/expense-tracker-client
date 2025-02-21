import React, { useState } from 'react';
import axios from 'axios';
import { buildGetRequest, calculateExpenses, formatAsUSCurrency } from './helper.jsx';
import DataTable from './DataTable.jsx';



const ExpenseTrackerGETApiComponent = () => {
  const [data, setData] = useState([]);
  const [getResponse, setGetResponse] = useState('');
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [expenseCategory, setExpenseCategory] = useState('');
  const [formattedTotalExpenses, setFormattedTotalExpenses] = useState('');
  

  const handleGetExpenses = async (event) => {
    event.preventDefault();
    const baseGetRequestURL = 'http://localhost:8080/expenses';
    const fullGetRequest = buildGetRequest(baseGetRequestURL, userId, paymentMethod, startDate, endDate);
    console.log("Using get request: ", fullGetRequest);
    try {
        const response = await axios.get(fullGetRequest);
        setError(null);
        setData(response.data);
        const totalExpenses = calculateExpenses(response.data);
        setFormattedTotalExpenses(formatAsUSCurrency(totalExpenses));
        //const worksheet = XLSX.utils.json_to_sheet(response.data);
        //const workbook = XLSX.utils.book_new();
        //XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
        //XLSX.writeFile(workbook, 'data.xlsx');
    } catch (error) {
        console.error(`Error sending GET request to fullGetRequest: `, error);
        setError('Error fetching data: ' + error );
    }
  };



  return (
    <div>
      <div>
        <h2>Expense Report</h2>
        <h3>*** Use any of the fields to query a custom result ***<br></br>
        If a field is empty, that field will not be queried</h3>
        <form onSubmit={handleGetExpenses}>
        <div>
          <label>User Id:</label>
          <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
        </div>
        <div>
          <label>Payment Method: </label>
          <input type="text" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} />
        </div>
        <div>
          <label>Start Date: </label>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </div>
        <div>
          <label>End Date: </label>
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>
        <button type="submit">Get</button>
        {error && <p>ERROR: {error}</p>} {/* Display the variable if it has a value */}
        </form>
      </div>
      <div>
      </div>
      <div style={{ padding: '20px' }}>
        {formattedTotalExpenses && <p>Total Expenses {formattedTotalExpenses}</p>} {/* Display the variable if it has a value */}  
        <DataTable data={data} />
      </div>

    </div>
  );
};
export default ExpenseTrackerGETApiComponent;
