'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

type Event = { id: number; title: string; date: string };

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/events').then(res => setEvents(res.data));
  }, []);

  const addEvent = async () => {
    const res = await axios.post('http://localhost:3001/events', { title, date });
    setEvents([...events, res.data]);
    setTitle('');
    setDate('');
  };

  const deleteEvent = async (id: number) => {
    await axios.delete(`http://localhost:3001/events/${id}`);
    setEvents(events.filter(e => e.id !== id));
  };

  return (
    <main>
      <h1>Gestionnaire d'Évènements</h1>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Titre" />
      <input type="date" value={date} onChange={e => setDate(e.target.value)} />
      <button onClick={addEvent}>Ajouter</button>
      <ul>
        {events.map(e => (
          <li key={e.id}>
            {e.title} - {e.date}
            <button onClick={() => deleteEvent(e.id)}>🗑️</button>
          </li>
        ))}
      </ul>
    </main>
  );
}
