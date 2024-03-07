import { Link, useNavigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useNote } from "../context/useNote";
import Tag from "../components/Tag";

const NoteDetail = () => {
  const { id } = useParams();
  const { notesWithTags } = useNote();
  const navigate = useNavigate();

  const note = notesWithTags.find((_note) => _note.id === id);

  if (!note) {
    navigate("/", { replace: true });
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <h1>{note?.title}</h1>
          <div className="space-x-2">
            {note?.tags.map((tag, index) => (
              <Tag variantNum={index} key={tag.id}>
                {tag.label}
              </Tag>
            ))}
          </div>
        </div>
        <div className="space-x-2 flex">
          <Link
            to={`/edit/${note?.id}`}
            className="border py-2 px-4 rounded bg-primary border-primary hover:brightness-125 duration-300"
          >
            Edit
          </Link>
          <button className="border py-2 px-4 rounded border-primary text-primary hover:brightness-150 duration-300">
            Delete
          </button>
          <Link
            to=".."
            className="border py-2 px-4 rounded border-purple-800 text-purple-800 hover:brightness-150 duration-300"
          >
            Back
          </Link>
        </div>
      </div>
      <ReactMarkdown className="mt-16">{note?.markdown}</ReactMarkdown>
    </>
  );
};

export default NoteDetail;
