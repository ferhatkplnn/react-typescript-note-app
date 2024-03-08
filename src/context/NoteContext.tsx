import { ReactNode, createContext, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Note, NoteData, NoteWithTags, RawNote, Tag } from "../types/types";
import { v4 as uuidV4 } from "uuid";

type NoteProviderProps = {
  children: ReactNode;
};

type NoteContextType = {
  notes: RawNote[];
  setNotes: React.Dispatch<React.SetStateAction<RawNote[]>>;
  tags: Tag[];
  setTags: React.Dispatch<React.SetStateAction<Tag[]>>;
  notesWithTags: NoteWithTags[];
  onCreateNote: (data: NoteData) => void;
  onUpdateNote: (data: Note) => void;
  addTag: (tag: Tag) => void;
  onDeleteNote: (id: string) => void;
  onDeleteTag: (id: string) => void;
};

const initialNoteContext: NoteContextType = {
  notes: [],
  setNotes: () => {},
  tags: [],
  setTags: () => {},
  notesWithTags: [],
  onCreateNote: () => {},
  onUpdateNote: () => {},
  addTag: () => {},
  onDeleteNote: () => {},
  onDeleteTag: () => {},
};

export const NoteContext = createContext(initialNoteContext);

export const NoteProvider = ({ children }: NoteProviderProps) => {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  const notesWithTags = useMemo(() => {
    return notes.map((note) => {
      return {
        ...note,
        tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
      };
    });
  }, [notes, tags]);

  const onCreateNote = ({ tags, ...data }: NoteData) => {
    setNotes((prevNotes) => {
      return [
        ...prevNotes,
        { ...data, id: uuidV4(), tagIds: tags.map((tag) => tag.id) },
      ];
    });
  };

  const onUpdateNote = ({ tags, id, ...data }: Note) => {
    setNotes((prevNotes) => {
      return prevNotes.map((note) => {
        if (note.id === id) {
          return {
            ...note,
            markdown: data.markdown,
            title: data.title,
            tagIds: tags.map((tag) => tag.id),
          };
        }
        return note;
      });
    });
  };

  const onDeleteTag = (id: string) => {
    setTags((prevTags) => prevTags.filter((tag) => tag.id !== id));
  };

  const onDeleteNote = (id: string) => {
    setNotes(notes.filter((n) => n.id !== id));
  };

  const addTag = (tag: Tag) => {
    setTags((prev) => [...prev, tag]);
  };

  const noteContextValues: NoteContextType = {
    notes,
    setNotes,
    tags,
    setTags,
    notesWithTags,
    onCreateNote,
    addTag,
    onUpdateNote,
    onDeleteNote,
    onDeleteTag,
  };

  return (
    <NoteContext.Provider value={noteContextValues}>
      {children}
    </NoteContext.Provider>
  );
};
