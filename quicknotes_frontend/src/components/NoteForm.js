import React, { useState, useEffect } from 'react';

// PUBLIC_INTERFACE
/**
 * NoteForm component for creating/editing a note.
 * Used in both Create and Edit pages.
 * 
 * Props:
 *  - initialValues: { title, content, tags }
 *  - onSubmit: (note) => void
 *  - onCancel: () => void
 *  - loading: boolean
 *  - submitLabel: string
 *
 * Ensures all fields are controlled and always allow typing in title field unless loading is true.
 */
function NoteForm({
  initialValues = {},
  onSubmit,
  onCancel,
  loading = false,
  submitLabel = 'Save'
}) {
  // Defensive: Always ensure controlled fields get string values, never undefined.
  const [title, setTitle] = useState(
    typeof initialValues.title === 'string' ? initialValues.title : ''
  );
  const [content, setContent] = useState(
    typeof initialValues.content === 'string' ? initialValues.content : ''
  );
  const [tags, setTags] = useState(
    Array.isArray(initialValues.tags)
      ? initialValues.tags.join(', ')
      : (typeof initialValues.tags === 'string' ? initialValues.tags : '')
  );
  const [error, setError] = useState('');

  // Keep inputs synched to initialValues (for Edit mode)
  useEffect(() => {
    setTitle(typeof initialValues.title === 'string' ? initialValues.title : '');
    setContent(typeof initialValues.content === 'string' ? initialValues.content : '');
    setTags(
      Array.isArray(initialValues.tags)
        ? initialValues.tags.join(', ')
        : (typeof initialValues.tags === 'string' ? initialValues.tags : '')
    );
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
    <form className="note-form" onSubmit={handleSubmit} autoComplete="off">
      <div className="field-group">
        {/* PUBLIC_INTERFACE: Title input, fully controlled */}
        <input
          className="note-title-input"
          name="title"
          type="text"
          placeholder="Title"
          value={title}
          autoFocus
          onChange={e => setTitle(e.target.value)}
          disabled={!!loading}
          maxLength={120}
          autoComplete="off"
          data-testid="note-title"
        />
      </div>
      <div className="field-group">
        {/* PUBLIC_INTERFACE: Content textarea */}
        <textarea
          className="note-content-input"
          name="content"
          placeholder="Content (supports markdown)"
          value={content}
          onChange={e => setContent(e.target.value)}
          rows={8}
          disabled={!!loading}
          data-testid="note-content"
        />
      </div>
      <div className="field-group">
        {/* PUBLIC_INTERFACE: Tags input */}
        <input
          className="note-tags-input"
          name="tags"
          type="text"
          placeholder="Tags (comma-separated, optional)"
          value={tags}
          onChange={e => setTags(e.target.value)}
          disabled={!!loading}
          autoComplete="off"
          data-testid="note-tags"
        />
      </div>
      {error && <div className="error-msg">{error}</div>}
      <div className="note-form-actions">
        <button
          className="btn btn-accent"
          type="submit"
          disabled={!!loading}
        >
          {submitLabel}
        </button>
        <button
          className="btn btn-secondary"
          type="button"
          onClick={onCancel}
          disabled={!!loading}
          style={{ marginLeft: '1em' }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default NoteForm;
