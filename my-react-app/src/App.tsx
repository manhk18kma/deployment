import React, { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
};

const API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:8080/api/test-users";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");

  // Fetch all users
  const fetchUsers = async () => {
    const res = await fetch(API_URL);
    setUsers(await res.json());
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Add user
  const handleAdd = async () => {
    if (!name.trim()) return;
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    setName("");
    fetchUsers();
  };

  // Delete user
  const handleDelete = async (id: number) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchUsers();
  };

  // Start editing
  const handleEdit = (user: User) => {
    setEditId(user.id);
    setEditName(user.name);
  };

  // Save edit
  const handleSave = async (id: number) => {
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: editName }),
    });
    setEditId(null);
    setEditName("");
    fetchUsers();
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "40px auto",
        padding: 24,
        background: "#fff",
        borderRadius: 12,
      }}
    >
      <h2>Test User CRUD</h2>
      <div style={{ display: "flex", marginBottom: 16 }}>
        <input
          style={{ flex: 1, padding: 8, marginRight: 8 }}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter user name"
        />
        <button onClick={handleAdd}>Add</button>
      </div>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {users.map((user) => (
          <li
            key={user.id}
            style={{ marginBottom: 10, display: "flex", alignItems: "center" }}
          >
            {editId === user.id ? (
              <>
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  style={{ flex: 1, marginRight: 8 }}
                />
                <button onClick={() => handleSave(user.id)}>Save</button>
                <button
                  onClick={() => setEditId(null)}
                  style={{ marginLeft: 4 }}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span style={{ flex: 1 }}>{user.name}</span>
                <button
                  onClick={() => handleEdit(user)}
                  style={{ marginLeft: 8 }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  style={{ marginLeft: 4, color: "red" }}
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
