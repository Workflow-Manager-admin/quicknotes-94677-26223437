import React, { useState } from 'react';
import { createNote } from '../api';
import NoteForm from '../components/NoteForm';
import { useNavigate } from 'react-router-dom';

// PUBLIC_INTERFACE
function NoteCreate() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // PUBLIC_INTERFACE
  const handleCreate = async (note) => {
    setLoading(true);
    try {
      const res = await createNote(note);
      navigate(`/note/${res.id}`);
    } catch (e) {
      window.alert('Create failed: ' + e.message);
      setLoading(false);
    }
  };

  return (
    <div className="main-container">
      <h2>New Note</h2>
      <NoteForm
        onSubmit={handleCreate}
        onCancel={() => navigate('/')}
        loading={loading}
        submitLabel="Create"
      />
    </div>
  );
}

export default NoteCreate;
