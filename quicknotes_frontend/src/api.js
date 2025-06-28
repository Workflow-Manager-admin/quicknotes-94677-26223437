//
// PUBLIC_INTERFACE
// QuickNotes API utility for all note CRUD operations with backend
//
// Endpoints match backend: /api/notes (GET, POST), /api/notes/:id (GET, PUT, DELETE)
//
// All methods return Promise and throw for network/HTTP errors.
//

const BASE_URL = '/api/notes';

// PUBLIC_INTERFACE
export async function getNotes(query = '') {
  // Optionally query notes (e.g., for search)
  const r = await fetch(`${BASE_URL}${query ? '?q=' + encodeURIComponent(query) : ''}`);
  if (!r.ok) throw new Error('Failed to fetch notes');
  return r.json();
}

// PUBLIC_INTERFACE
export async function getNote(id) {
  const r = await fetch(`${BASE_URL}/${id}`);
  if (!r.ok) throw new Error('Failed to fetch note');
  return r.json();
}

// PUBLIC_INTERFACE
export async function createNote({ title, content, tags }) {
  const r = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content, tags })
  });
  if (!r.ok) throw new Error('Failed to create note');
  return r.json();
}

// PUBLIC_INTERFACE
export async function updateNote(id, { title, content, tags }) {
  const r = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content, tags })
  });
  if (!r.ok) throw new Error('Failed to update note');
  return r.json();
}

// PUBLIC_INTERFACE
export async function deleteNote(id) {
  const r = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
  if (!r.ok) throw new Error('Failed to delete note');
  return r.json();
}
