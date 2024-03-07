import { useNavigate, useParams } from "react-router-dom";
import { useNote } from "../context/useNote";
import NoteForm from "../components/NoteForm";

const EditNote = () => {
  const { id } = useParams();
  const { notesWithTags } = useNote();
  const navigate = useNavigate();

  const note = notesWithTags.find((_note) => _note.id === id);

  if (!note || !id) {
    navigate("/", { replace: true });
  }

  return (
    <div className="h-full flex flex-col">
      <h1 className="font-bold">Edit Note</h1>
      <NoteForm isEdit={true} id={id!} />
    </div>
  );
};

export default EditNote;
