import React, { useEffect, useState } from 'react';
import { updateNote, getNote } from '../api';
import NoteForm from '../components/NoteForm';
import { useNavigate, useParams } from 'react-router-dom';

// PUBLIC_INTERFACE
function NoteEdit() {
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchNote() {
      try {
        const note = await getNote(id);
        setInitialValues(note);
      } catch (e) {
        window.alert('Note not found.');
        navigate('/');
      }
    }
    fetchNote();
  }, [id, navigate]);

  // PUBLIC_INTERFACE
  const handleEdit = async (note) => {
    setLoading(true);
    try {
      await updateNote(id, note);
      navigate(`/note/${id}`);
    } catch (e) {
      window.alert('Update failed: ' + e.message);
      setLoading(false);
    }
  };

  if (!initialValues)
    return <div className="loading-msg">Loading…</div>;

  return (
    <div className="main-container">
      <h2>Edit Note</h2>
      <NoteForm
        initialValues={initialValues}
        onSubmit={handleEdit}
        onCancel={() => navigate(`/note/${id}`)}
        loading={loading}
        submitLabel="Save"
      />
    </div>
  );
}

export default NoteEdit;
