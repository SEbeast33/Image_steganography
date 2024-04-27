import React, { useState } from 'react';
import './test.css'

const KeyInputForm = () => {
  const [keyArray, setKeyArray] = useState([123, 456, 789, 1011]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (index, value) => {
    const newArray = [...keyArray];
    newArray[index] = value;
    setKeyArray(newArray);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(keyArray)
    try {
      // Make API request to send the key
      const response = await fetch('YOUR_API_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ key: keyArray }),
      });
      if (!response.ok) {
        throw new Error('Failed to send key.');
      }
      const data = await response.json();
      setSuccessMessage(data.message);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.message);
      setSuccessMessage('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Enter Key</h2>
      <form onSubmit={handleSubmit}>
        {keyArray.map((value, index) => (
          <input
            key={index}
            type="number"
            value={value}
            onChange={(e) => handleChange(index, parseInt(e.target.value, 10))}
            placeholder={`Key element ${index + 1}`}
            className='input_fields'
            required
          />
        ))}
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Submit'}
        </button>
      </form>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
};

export default KeyInputForm;
