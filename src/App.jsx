import { useState } from 'react';
import './App.css';
import axios from 'axios';
import { Send } from 'lucide-react';

function App() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  async function generateAnswer() {
    const cleanedQuestion = question.trim().toLowerCase();
    setAnswer('Loading...');

    if (cleanedQuestion.includes('who are you') || cleanedQuestion.includes('your name')) {
      setAnswer("I'm Srajan's Assistant.");
      return;
    }

    try {
      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=YOUR_API_KEY_HERE",
        method: "post",
        data: {
          contents: [{ parts: [{ text: question }] }]
        }
      });

      setAnswer(response.data.candidates[0].content.parts[0].text);
    } catch (error) {
      setAnswer('An error occurred. Please try again.');
      console.error(error);
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      generateAnswer();
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col">
      {/* Top Nav */}
      <header className="bg-white shadow-md p-4 sticky top-0 z-10">
        <h1 className="text-xl font-bold text-gray-800 text-center">Supriya Bot</h1>
      </header>

      {/* Chat Window */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-6">
        <div className="w-full max-w-2xl flex flex-col gap-4">
          {/* Question Bubble */}
          {question && (
            <div className="self-end bg-purple-600 text-white p-4 rounded-2xl rounded-br-sm shadow-md">
              {question}
            </div>
          )}

          {/* Answer Bubble */}
          {answer && (
            <div className="self-start bg-white text-gray-800 p-4 rounded-2xl rounded-bl-sm shadow-md border border-gray-200">
              {answer}
            </div>
          )}
        </div>
      </main>

      {/* Input Field */}
      <footer className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
        <div className="max-w-2xl mx-auto flex items-center gap-2">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your message..."
            rows="1"
            className="flex-grow resize-none p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={generateAnswer}
            className="bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-xl shadow-md transition"
          >
            <Send size={20} />
          </button>
        </div>
      </footer>
    </div>
  );
}

export default App;
