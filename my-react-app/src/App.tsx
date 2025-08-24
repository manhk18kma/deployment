import React, { useState } from "react";

function App() {
  const [todos, setTodos] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (input.trim()) {
      setTodos([...todos, input.trim()]);
      setInput("");
    }
  };

  const handleDelete = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  // Style object
  const styles = {
    app: {
      maxWidth: 400,
      margin: "40px auto",
      padding: "24px 20px",
      background: "#fff",
      borderRadius: 12,
      boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
      fontFamily: "'Segoe UI', Arial, sans-serif",
    } as React.CSSProperties,
    h2: {
      textAlign: "center" as const,
      color: "#1976d2",
      marginBottom: 20,
    },
    input: {
      width: "70%",
      padding: "8px 10px",
      border: "1px solid #bdbdbd",
      borderRadius: 6,
      fontSize: 16,
      marginRight: 8,
      outline: "none",
      transition: "border 0.2s",
    },
    button: {
      padding: "8px 14px",
      background: "#1976d2",
      color: "#fff",
      border: "none",
      borderRadius: 6,
      fontSize: 15,
      cursor: "pointer",
      transition: "background 0.2s",
    },
    ul: {
      listStyle: "none",
      padding: 0,
      marginTop: 18,
    },
    li: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      background: "#f5f5f5",
      marginBottom: 10,
      padding: "8px 12px",
      borderRadius: 6,
      fontSize: 16,
    },
    delBtn: {
      background: "#e53935",
      color: "#fff",
      padding: "5px 10px",
      borderRadius: 4,
      fontSize: 13,
      marginLeft: 10,
      border: "none",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.app}>
      <h2 style={styles.h2}>Todo List</h2>
      <input
        style={styles.input}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add todo..."
      />
      <button style={styles.button} onClick={handleAdd}>
        Add
      </button>
      <ul style={styles.ul}>
        {todos.map((todo, idx) => (
          <li style={styles.li} key={idx}>
            {todo}
            <button style={styles.delBtn} onClick={() => handleDelete(idx)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
