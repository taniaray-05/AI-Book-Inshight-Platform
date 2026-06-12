import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [books, setBooks] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/books/")
      .then(res => res.json())
      .then(data => setBooks(data));
  }, []);

  const askAI = async () => {
    const res = await fetch("http://localhost:8000/ask/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ question })
    });

    const data = await res.json();
    setAnswer(data.answer);
  };

  return (
    <div className="container">
      <h1>📚 AI Book Insight</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Ask about books..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button onClick={askAI}>Ask AI</button>
      </div>

      {answer && (
        <div className="answer-box">
          <h3>Answer:</h3>
          <p>{answer}</p>
        </div>
      )}

      <h2>Books</h2>

      {books.map(book => (
        <div key={book.id} className="card">
          <h3>{book.title}</h3>
          <p>{book.description}</p>
        </div>
      ))}
    </div>
  );
}

export default App;