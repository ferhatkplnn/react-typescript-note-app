import Select from "react-select";

const trys = [
  { value: "soman", label: "osman" },
  { value: "cabbar", label: "cabbar" },
  { value: "cumhur", label: "cumhur" },
];

const NoteForm = () => {
  return (
    <form className="flex flex-col flex-1 ">
      <div className="flex  gap-6">
        <div className="flex flex-col flex-1 space-y-2">
          <label htmlFor="title">Title:</label>
          <input
            className="text-black rounded outline-none focus:ring-2 ring-inset px-2 h-9"
            type="text"
            id="title"
            name="title"
            placeholder="Note Title..."
          />
        </div>

        <div className="flex flex-col flex-1 space-y-2">
          <label htmlFor="tags">Tags</label>
          <Select
            defaultValue={[trys[0]]}
            isMulti
            name="colors"
            options={trys}
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
        />
      </div>

      <div className="self-end mt-4 space-x-4">
        <button className="border py-2 px-4 rounded bg-primary border-primary hover:brightness-125 duration-300">
          Save
        </button>
        <button className="border py-2 px-4 rounded border-primary text-primary hover:brightness-150 duration-300">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
