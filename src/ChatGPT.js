import React, { useState } from 'react';
import axios from 'axios';

const ChatGPT = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleChange = event => {
    setInput(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    const requestBody = {
      prompt: input,
      max_tokens: 100,
      model: 'text-davinci-003'
    };

    try {
      const response = await axios.post('https://api.openai.com/v1/completions', requestBody, {
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });
      
      setResponse(response.data.choices[0].text);
      console.log(response.data[0])
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={input} onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
      <div>
        Response: {response}
      </div>
    </div>
  );
};

export default ChatGPT;
