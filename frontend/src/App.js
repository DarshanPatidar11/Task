import { useEffect, useState } from 'react';

function App() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    name: '',
    person: '',
    type: 'Lent',
    dateGiven: '',
    status: 'Pending'
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const res = await fetch('http://localhost:5000/items');
    const data = await res.json();
    setItems(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:5000/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setForm({ name: '', person: '', type: 'Lent', dateGiven: '', status: 'Pending' });
    fetchItems();
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/items/${id}`, {
      method: 'DELETE'
    });
    fetchItems();
  };

  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'Pending' ? 'Returned' : 'Pending';
    await fetch(`http://localhost:5000/items/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });
    fetchItems();
  };

  const handleEdit = async (item) => {
    setForm({
      name: item.name,
      person: item.person,
      type: item.type,
      dateGiven: item.dateGiven.split('T')[0],
      status: item.status,
    });

    await fetch(`http://localhost:5000/items/${item._id}`, {
      method: 'DELETE'
    });

    fetchItems();
  };

  const lentItems = items.filter(item => item.type === 'Lent' && item.status === 'Pending');
  const borrowedItems = items.filter(item => item.type === 'Borrowed' && item.status === 'Pending');
  const returnedItems = items.filter(item => item.status === 'Returned');


  return (
    <div>
      <h2>Track Items (Lent / Borrowed)</h2>

      <form onSubmit={handleSubmit}>
        <label>
          Item Name:
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </label>
        <br />

        <label>
          Person's Name:
          <input
            type="text"
            value={form.person}
            onChange={(e) => setForm({ ...form, person: e.target.value })}
            required
          />
        </label>
        <br />

        <label>
          Type:
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          >
            <option value="Lent">Lent</option>
            <option value="Borrowed">Borrowed</option>
          </select>
        </label>
        <br />

        <label>
          Date Given:
          <input
            type="date"
            value={form.dateGiven}
            onChange={(e) => setForm({ ...form, dateGiven: e.target.value })}
            required
          />
        </label>
        <br />

        <button type="submit">Add</button>
      </form>

      <hr />

      <h3>Lent Items</h3>
      <ul>
        {lentItems.map(item => (
          <li key={item._id}>
            <strong>{item.name}</strong> to <strong>{item.person}</strong> on {new Date(item.dateGiven).toLocaleDateString()} — <em>{item.status}</em>
            <button onClick={() => toggleStatus(item._id, item.status)}>Mark as {item.status === 'Pending' ? 'Returned' : 'Pending'}</button>
            <button onClick={() => handleEdit(item)}>Edit</button>
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h3>Borrowed Items</h3>
      <ul>
        {borrowedItems.map(item => (
          <li key={item._id}>
            <strong>{item.name}</strong> from <strong>{item.person}</strong> on {new Date(item.dateGiven).toLocaleDateString()} — <em>{item.status}</em>
            <button onClick={() => toggleStatus(item._id, item.status)}>Mark as {item.status === 'Pending' ? 'Returned' : 'Pending'}</button>
            <button onClick={() => handleEdit(item)}>Edit</button>
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h3>Returned Items</h3>
      <ul>
        {returnedItems.map(item => (
          <li key={item._id}>
            <strong>{item.name}</strong> ({item.type}) from <strong>{item.person}</strong> on {new Date(item.dateGiven).toLocaleDateString()} — <em>{item.status}</em>
            <button onClick={() => toggleStatus(item._id, item.status)}>Mark as Pending</button>
            <button onClick={() => handleEdit(item)}>Edit</button>
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </li>
        ))}
      </ul>

    </div>
  );
}

export default App;