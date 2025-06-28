import React, { useState, useEffect } from 'react';

// PUBLIC_INTERFACE
/**
 * NoteForm component for creating/editing a note.
 * Used in both Create and Edit pages.
 * Props:
 *  - initialValues: {title, content, tags}
 *  - onSubmit: (note) => void
 *  - onCancel: () => void
 *  - loading: boolean
 *  - submitLabel: string
 *
 */
function NoteForm({
  initialValues = {},
  onSubmit,
  onCancel,
  loading,
  submitLabel = 'Save'
}) {
  const [title, setTitle] = useState(initialValues.title || '');
  const [content, setContent] = useState(initialValues.content || '');
  const [tags, setTags] = useState(initialValues.tags?.join(', ') || '');
  const [error, setError] = useState('');

  useEffect(() => {
    setTitle(initialValues.title || '');
    setContent(initialValues.content || '');
    setTags(initialValues.tags?.join(', ') || '');
  }, [initialValues]);

  // PUBLIC_INTERFACE
  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    setError('');
    const tagArr =
      tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);
    onSubmit({ title, content, tags: tagArr });
  }

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <div className="field-group">
        <input
          className="note-title-input"
          placeholder="Title"
          value={title}
          autoFocus
          onChange={e => setTitle(e.target.value)}
          disabled={loading}
          maxLength={120}
        />
      </div>
      <div className="field-group">
        <textarea
          className="note-content-input"
          placeholder="Content (supports markdown)"
          value={content}
          onChange={e => setContent(e.target.value)}
          rows={8}
          disabled={loading}
        />
      </div>
      <div className="field-group">
        <input
          className="note-tags-input"
          placeholder="Tags (comma-separated, optional)"
          value={tags}
          onChange={e => setTags(e.target.value)}
          disabled={loading}
        />
      </div>
      {error && <div className="error-msg">{error}</div>}
      <div className="note-form-actions">
        <button
          className="btn btn-accent"
          type="submit"
          disabled={loading}
        >
          {submitLabel}
        </button>
        <button
          className="btn btn-secondary"
          type="button"
          onClick={onCancel}
          disabled={loading}
          style={{ marginLeft: '1em' }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default NoteForm;
