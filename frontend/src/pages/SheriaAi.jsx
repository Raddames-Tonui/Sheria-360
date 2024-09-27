// Sheria.jsx
import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { MdArrowUpward } from 'react-icons/md';

const SheriaAi = () => {
  const [query, setQuery] = useState(''); // State to hold user input
  const [chatHistory, setChatHistory] = useState([]); // State to hold chat history
  const [loading, setLoading] = useState(false); // State to handle loading status

  // Access the API key from environment variables using Vite's import.meta.env
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  // Check if the API key is defined
  if (!apiKey) {
    return <div>Error: API key not defined!</div>; // Display error if API key is missing
  }
  console.log("API Key:", apiKey);

  // Initialize Google Generative AI with the API key
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // Function to handle the query submission
  const handleAsk = async () => {
    if (query) {
      setLoading(true); // Set loading state to true
      try {
        // Use the model to generate content based on user query
        const result = await model.generateContent(query);
        // Add the user query and API response to the chat history
        setChatHistory(prevHistory => [
          ...prevHistory,
          { question: query, response: result.response.text() }
        ]);
        setQuery(''); // Clear the input field after submission
      } catch (error) {
        console.error('Error fetching data:', error);
        setChatHistory(prevHistory => [
          ...prevHistory,
          { question: query, response: 'Error fetching data, please try again.' }
        ]);
      } finally {
        setLoading(false); // Set loading state back to false
      }
    }
  };

  return (
    <div className="p-4 px-20">
      <div className='border-2 relative border-lime-700  rounded-lg h-[80vh] overflow-hidden'>
        <h1 className="text-xl mx-4 my-2   font-bold ">Welcome to Sheria AI Chatbot!</h1>
        <hr className='bg-lime-700 '/>

        {/* Response section with scrolling */}
        <div className="p-4 mx-4 mt-2 bg-gray-50 rounded-md shadow-md h-80 overflow-y-auto flex flex-col">
          {/* Render chat history */}
          {chatHistory.map((chat, index) => (
            // question
            <div key={index} className="mb-2">
              <div><div className="font-semibold">You:</div>
              <p className="text-md">{chat.question}</p>
              </div>

            {/* response */}
              <div>
              <div className="font-semibold">Response:</div>
              <p className="text-md">{chat.response}</p>
            </div>
            </div>
          ))}
          {loading && <p>Loading...</p>}
        </div>

        <div className="flex absolute w-[97%] bottom-0  right-4 p-4 rounded-lg bg-lime-200 mb-4">
          <input 
            type="text" 
            value={query} 
            onChange={(e) => setQuery(e.target.value)} 
            className="border border-gray-300 rounded-md px-4 py-2 w-full" 
            placeholder="Ask a question..." 
          />
          {/* Ask button */}
          <button 
            onClick={handleAsk} 
            className="ml-2 flex items-center bg-lime-700 text-white rounded-md px-4 py-2" 
            aria-label="Ask"
          >
            Uliza <MdArrowUpward />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SheriaAi;
