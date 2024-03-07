import NoteForm from "../components/NoteForm";

export const NewNote = () => {
  return (
    <div className="h-full flex flex-col">
      <h1 className="font-bold">New Note</h1>
      <NoteForm />
    </div>
  );
};
