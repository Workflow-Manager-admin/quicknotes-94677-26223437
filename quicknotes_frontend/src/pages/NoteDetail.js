import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getNote, deleteNote } from '../api';

// Minimal client-side markdown renderer (very basic)
function renderMarkdown(md) {
  if (!md) return '';
  // only support paragraphs, bold, italics, code, links, and line breaks for minimal preview
  return md
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/\*\*(.*?)\*\*/gim, '<b>$1</b>')
    .replace(/\*(.*?)\*/gim, '<i>$1</i>')
    .replace(/`([^`]+)`/gim, '<code>$1</code>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" target="_blank" rel="noopener">$1</a>')
    .replace(/\n/g, '<br/>');
}

// PUBLIC_INTERFACE
function NoteDetail() {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        const n = await getNote(id);
        setNote(n);
      } catch (e) {
        setError('Note not found');
      }
    }
    load();
  }, [id]);

  // PUBLIC_INTERFACE
  const handleDelete = async () => {
    if (!window.confirm('Delete this note?')) return;
    try {
      await deleteNote(id);
      navigate('/');
    } catch (e) {
      setError('Failed to delete note');
    }
  };

  if (error) return (
    <div className="main-container">
      <div className="error-msg">{error}</div>
      <Link to="/" className="btn btn-secondary">Back to Notes</Link>
    </div>
  );

  if (!note) return <div className="loading-msg">Loading…</div>;

  return (
    <div className="main-container">
      <div className="note-detail-header">
        <h2>{note.title || <em>Untitled</em>}</h2>
        <span>
          <Link to={`/edit/${note.id}`} className="btn btn-secondary">Edit</Link>
          <button className="btn btn-danger" style={{marginLeft:8}} onClick={handleDelete}>Delete</button>
        </span>
      </div>
      {Array.isArray(note.tags) && note.tags.length > 0 && (
        <div className="tag-list note-tags">
          {note.tags.map(tag => <span className="note-tag" key={tag}>{tag}</span>)}
        </div>
      )}
      <div className="note-detail-content" dangerouslySetInnerHTML={{ __html: renderMarkdown(note.content) }} />
      <div style={{marginTop:'2em'}}>
        <Link to="/" className="btn btn-primary">Back to All Notes</Link>
      </div>
    </div>
  );
}

export default NoteDetail;
