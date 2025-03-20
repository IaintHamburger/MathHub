import { useState, useEffect } from 'react';

const Home = () => {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    fetch("http://localhost:5000/")
      .then((res) => res.text())
      .then((data) => setMessage(data));
  }, []);

  return (
    <div className="flex items-center flex-col justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-5xl font-bold">MathHub</h1>
      {/* MathHub 內容部分 */}
      <div>
        MathHub 內容部分
      </div>
      <div className="card">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      {message && (
        <div className="bg-gray-900 text-white">
          <h1 className="text-5xl font-bold">{message}</h1>
        </div>
      )}
    </div>
  );
};

export default Home;
