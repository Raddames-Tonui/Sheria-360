import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { MdArrowUpward } from 'react-icons/md';

const SheriaAi = () => {
  const [query, setQuery] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    return <div>Error: API key not defined!</div>;
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const handleAsk = async () => {
    if (query) {
      setLoading(true);
      try {
        const result = await model.generateContent(query);
        // Remove asterisks from the response
        const cleanResponse = result.response.text().replace(/\*\*/g, '');
        setChatHistory(prevHistory => [
          ...prevHistory,
          { question: query, response: cleanResponse }
        ]);
        setQuery('');
      } catch (error) {
        console.error('Error fetching data:', error);
        setChatHistory(prevHistory => [
          ...prevHistory,
          { question: query, response: 'Error fetching data, please try again.' }
        ]);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className=" h-[90vh] flex justify-center">
      <div className='bg-gray-200 border border-gray-300 w-[60vw] h-[86vh] mt-4  flex flex-col'>
        <img src="/logo/Sheria360.png" alt="Logo" className="object-cover h-16 w-40 ml-8" />
        <hr className='bg-lime-700' />

        {/* Response section with scrolling and adjusted height */}
        <div className="p-4 mx-10 bg-gray-100 border-x-1 shadow-md flex-1 h-[50vh] overflow-y-auto flex flex-col">
          {chatHistory.map((chat, index) => (
            <div key={index} className="mb-2">
              {/* User's question on the right */}
              <div className="flex justify-end">
                <div className="bg-lime-700 text-white p-2 rounded-lg max-w-xs">
                  <div className="font-semibold">You:</div>
                  <p className="text-md">{chat.question}</p>
                </div>
              </div>

              {/* AI's response on the left */}
              <div className="flex justify-start">
                <div className="bg-gray-300 p-2 rounded-lg max-w-xs">
                  <div className="font-semibold">Response:</div>
                  <p className="text-md">{chat.response}</p>
                </div>
              </div>
            </div>
          ))}
          {loading && <p className="text-center">Loading...</p>}
        </div>

        {/* Input area redesigned */}
        <div className="flex mb-2 mx-10 rounded-lg">
          <input 
            type="text" 
            value={query} 
            onChange={(e) => setQuery(e.target.value)} 
            className="flex-1 border border-gray-300 rounded-md px-4 py-2" 
            placeholder="Ask a question..." 
          />
          <button 
            onClick={handleAsk} 
            className="ml-2 flex items-center bg-lime-700 text-white rounded-md px-4 pb-2" 
            aria-label="Ask"
          >
            Send <MdArrowUpward />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SheriaAi;
