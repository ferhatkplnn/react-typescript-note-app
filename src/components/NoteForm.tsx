import { FormEvent, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import { Tag } from "../types/types";
import { useNote } from "../context/useNote";
import { v4 as uuidV4 } from "uuid";

const NoteForm = ({
  isEdit = false,
  id,
}: {
  isEdit?: boolean;
  id?: string;
}) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const { onCreateNote, notesWithTags, onUpdateNote, addTag, tags } = useNote();
  const note = notesWithTags.find((_note) => _note.id === id);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(note?.tags || []);
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (isEdit && id) {
      onUpdateNote({
        title: titleRef.current!.value,
        markdown: markdownRef.current!.value,
        tags: selectedTags,
        id,
      });
    } else {
      onCreateNote({
        title: titleRef.current!.value,
        markdown: markdownRef.current!.value,
        tags: selectedTags,
      });
    }

    navigate("..");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col flex-1 ">
      <div className="flex  gap-6">
        <div className="flex flex-col flex-1 space-y-2">
          <label htmlFor="title">Title:</label>
          <input
            className="text-black rounded outline-none focus:ring-2 ring-inset px-2 h-9"
            type="text"
            id="title"
            name="title"
            placeholder="Note Title..."
            ref={titleRef}
            defaultValue={note?.title || ""}
            required
          />
        </div>

        <div className="flex flex-col flex-1 space-y-2">
          <label htmlFor="tags">Tags</label>
          <CreatableSelect
            onCreateOption={(label) => {
              const newTag = { id: uuidV4(), label };
              addTag(newTag);
              setSelectedTags((prev) => [...prev, newTag]);
            }}
            value={selectedTags.map((tag) => ({
              label: tag.label,
              value: tag.id,
            }))}
            isMulti
            onChange={(_tags) => {
              setSelectedTags(
                _tags.map((tag) => ({ label: tag.label, id: tag.value }))
              );
            }}
            options={tags.map((tag) => ({ label: tag.label, value: tag.id }))}
            className="basic-multi-select text-black"
            classNamePrefix="select"
            placeholder="Note tags..."
          />
        </div>
      </div>

      <div className="flex flex-col space-y-2  flex-1 mt-8">
        <label htmlFor="body">Body</label>
        <textarea
          id="body"
          name="body"
          className="outline-none text-black p-2 flex-1 rounded focus:ring-2 ring-inset"
          placeholder="Note Body..."
          ref={markdownRef}
          defaultValue={note?.markdown || ""}
          required
        />
      </div>

      <div className="self-end mt-4 space-x-4">
        <button className="border py-2 px-4 rounded bg-primary border-primary hover:brightness-125 duration-300">
          Save
        </button>
        <Link
          to=".."
          className="border py-2 px-4 rounded border-primary text-primary hover:brightness-150 duration-300"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
};

export default NoteForm;
