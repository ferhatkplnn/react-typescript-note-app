import { ReactNode, createContext, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { NoteData, NoteWithTags, RawNote, Tag } from "../types/types";
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
};

const initialNoteContext: NoteContextType = {
  notes: [],
  setNotes: () => {},
  tags: [],
  setTags: () => {},
  notesWithTags: [],
  onCreateNote: () => {},
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

  const noteContextValues: NoteContextType = {
    notes,
    setNotes,
    tags,
    setTags,
    notesWithTags,
    onCreateNote,
  };

  return (
    <NoteContext.Provider value={noteContextValues}>
      {children}
    </NoteContext.Provider>
  );
};
