import Select from "react-select";
import NoteListCard from "../components/NoteListCard";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { NoteWithTags, Tag } from "../types/types";
import { useNote } from "../context/useNote";

const NoteList = () => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const { tags, notesWithTags } = useNote();
  const [title, setTitle] = useState("");
  // console.log(notesWithTags);

  const filteredNotes = useMemo(() => {
    return notesWithTags.filter(
      (note) =>
        note.title.toLowerCase().includes(title.toLowerCase()) &&
        selectedTags.every((selectedTag) =>
          note.tags.some((noteTag) => noteTag.label === selectedTag.label)
        )
    );
  }, [notesWithTags, selectedTags, title]);

  console.log(filteredNotes);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1>Notes</h1>
        <div className="space-x-4">
          <Link
            to="/new"
            className="border py-2 px-4 rounded bg-primary border-primary hover:brightness-125 duration-300"
          >
            Create
          </Link>
          <button className="border py-2 px-4 rounded border-primary text-primary hover:brightness-150 duration-300">
            Edit Tags
          </button>
        </div>
      </div>

      <form className="flex gap-6 mt-6">
        <div className="flex flex-col space-y-2 flex-1">
          <label htmlFor="title">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Search title..."
            id="title"
            type="text"
            className="text-black rounded outline-none focus:ring-2 ring-inset px-2 h-9"
          />
        </div>
        <div className="flex flex-col space-y-2 flex-1">
          <label htmlFor="tags">Tags</label>
          <Select
            value={selectedTags.map((tag) => ({
              label: tag.label,
              value: tag.id,
            }))}
            onChange={(_tags) => {
              setSelectedTags(
                _tags.map((tag) => ({ label: tag.label, id: tag.value }))
              );
            }}
            options={tags.map((tag) => ({ label: tag.label, value: tag.id }))}
            id="tags"
            isMulti
            name="colors"
            // options={colourOptions}
            className="basic-multi-select text-black"
            classNamePrefix="select"
          />
        </div>
      </form>

      <div className="grid grid-cols-2 gap-6 mt-8">
        {filteredNotes.map((note: NoteWithTags) => (
          <NoteListCard note={note} key={note.id} />
        ))}
      </div>
    </div>
  );
};

export default NoteList;
