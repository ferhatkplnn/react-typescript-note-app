import { ReactNode, createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { RawNote, Tag } from "../types/types";

type NoteProviderProps = {
  children: ReactNode;
};

type NoteContextType = {
  notes: RawNote[];
  setNotes: React.Dispatch<React.SetStateAction<RawNote[]>>;
  tags: Tag[];
  setTags: React.Dispatch<React.SetStateAction<Tag[]>>;
};

const initialNoteContext: NoteContextType = {
  notes: [],
  setNotes: () => {},
  tags: [],
  setTags: () => {},
};

export const NoteContext = createContext(initialNoteContext);

export const NoteProvider = ({ children }: NoteProviderProps) => {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  const noteContextValues: NoteContextType = {
    notes,
    setNotes,
    tags,
    setTags,
  };

  return (
    <NoteContext.Provider value={noteContextValues}>
      {children}
    </NoteContext.Provider>
  );
};
