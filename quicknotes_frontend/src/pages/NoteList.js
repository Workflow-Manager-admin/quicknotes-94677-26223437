import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { getNotes, deleteNote } from '../api';

// PUBLIC_INTERFACE
/**
 * NoteList component/page
 * Shows note list, supports searching & navigation
 */
function NoteList() {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  // Load notes, support search from query string
  useEffect(() => {
    async function loadNotes() {
      setLoading(true);
      try {
        const params = new URLSearchParams(location.search);
        const q = params.get('q') || '';
        setSearch(q);
        const items = await getNotes(q);
        setNotes(items);
      } catch (e) {
        setError('Could not load notes');
      }
      setLoading(false);
    }
    loadNotes();
    // re-fetch on url/search changes
    // eslint-disable-next-line
  }, [location.search]);

  // PUBLIC_INTERFACE
  const handleSearch = (e) => {
    e.preventDefault();
    navigate(search ? `/?q=${encodeURIComponent(search)}` : '/');
  };

  // PUBLIC_INTERFACE
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this note?')) return;
    try {
      await deleteNote(id);
      setNotes(notes.filter(n => n.id !== id));
    } catch (e) {
      window.alert('Delete failed');
    }
  };

  return (
    <div className="main-container">
      <div className="notes-header">
        <h1>QuickNotes</h1>
        <form className="search-form" onSubmit={handleSearch}>
          <input
            className="search-input"
            type="search"
            value={search}
            placeholder="Search notes…"
            onChange={e => setSearch(e.target.value)}
          />
          <button className="btn btn-primary" type="submit">Search</button>
        </form>
        <Link className="btn btn-accent" to="/new" style={{ marginLeft: 8 }}>
          + New Note
        </Link>
      </div>
      {error && <div className="error-msg">{error}</div>}
      {loading ? (
        <div className="loading-msg">Loading…</div>
      ) : (
        <div className="note-list">
          {notes.length === 0 ? (
            <div className="empty-msg">No notes found</div>
          ) : (
            <ul>
              {notes.map(n => (
                <li className="note-list-item" key={n.id}>
                  <Link to={`/note/${n.id}`} className="note-list-title">
                    {n.title || <em>Untitled</em>}
                  </Link>
                  <span className="note-list-meta">
                    {Array.isArray(n.tags) && n.tags.length > 0 && (
                      <span className="tag-list">
                        {n.tags.map(tag => (
                          <span className="note-tag" key={tag}>{tag}</span>
                        ))}
                      </span>
                    )}
                  </span>
                  <span className="note-list-actions">
                    <Link className="btn btn-small btn-secondary" to={`/edit/${n.id}`}>Edit</Link>
                    <button className="btn btn-small btn-danger" onClick={() => handleDelete(n.id)}>Delete</button>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default NoteList;
