import React, { useEffect, useState } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import { buildGetRequest } from './helper';
import axios from 'axios';

const PlaidConfigurationComponent = () => {

  const [linkToken, setLinkToken] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [userId, setUserId] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    // Fetch the link token from your backend
    const fetchLinkToken = async () => {
      console.log("before calling linktoken");
      const response = await axios.get('http://localhost:8080/expenses/linktoken');
      console.log("Link Token = " + response.data);
      setLinkToken(response.data);
    };
    fetchLinkToken();
  },[]);
  
  const getAccessToken = async (publicToken) => {
    console.log("Public Token =  " + publicToken);
    
    try {
      // Send the public token to your server to exchange it for an access token
      const response = await axios.get(`http://localhost:8080/expenses/accesstoken?publicToken=${publicToken}`);
      setAccessToken(response.data);
      console.log("Access Token = " + response.data)
    } catch (error) {
      console.error('Error exchanging public token for access token:', error);
    }
      
  };

  const config = linkToken ? {
    token: linkToken,
    onSuccess: (publicToken, metadata) => {
      console.log("public token = " + publicToken);
      console.log(metadata);
      getAccessToken(publicToken);
    },
    onExit: () => {
      console.log("User exited Plaid Link");
    },
  } : {};

  const { open, ready, error } = usePlaidLink(config);

  const handleGetTransactions = async (event) => {
    event.preventDefault();
    const baseGetRequestURL = 'http://localhost:8080/expenses/transactions';
    const fullGetRequest = buildGetRequest(baseGetRequestURL, accessToken, userId, paymentMethod, startDate, endDate);
    console.log("Using get request: ", fullGetRequest);
    try {
        const response = await axios.get(fullGetRequest);
        setError(null);
    } catch (error) {
        console.error(`Error sending GET request to fullGetRequest: `, error);
        setError('Error fetching data: ' + error );
    }
  };


  return (
    <>
    <div>
      <h2>Plaid Link</h2>
      {linkToken ? (
        <button onClick={() => open()} disabled={!ready}>
          Connect to Plaid
        </button>
      ) : (
        <p>Getting Link Token...</p>
      )}
    </div>
    <div>
      {accessToken &&
        <form onSubmit={handleGetTransactions}>
          <div>
            <label>User Id: </label>
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
          <button type="submit">Get Transactions</button>
          {error && <p>ERROR: {error}</p>} {/* Display the variable if it has a value */}
        </form>
      }
    </div>
    </>
  );
};

export default PlaidConfigurationComponent;
