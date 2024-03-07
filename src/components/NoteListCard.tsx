import { NoteWithTags } from "../types/types";
import Tag from "./Tag";

const NoteListCard = ({ note }: { note: NoteWithTags }) => {
  return (
    <div className="border-4 flex flex-col justify-center items-center text-center min-h-60 break-all p-4 border-primary rounded hover:scale-105 duration-300 cursor-pointer">
      <h3>CSS:has Selecto</h3>
      <div className="space-x-2">
        {note.tags.map((tag, index) => (
          <Tag variantNum={index} key={tag.id}>
            {tag.label}
          </Tag>
        ))}
      </div>
    </div>
  );
};

export default NoteListCard;
