import { useNote } from "../context/useNote";

type ModalProps = {
  toggleModal: () => void;
};

const Modal = ({ toggleModal }: ModalProps) => {
  const { tags, onDeleteTag } = useNote();
  return (
    <>
      <div className="border w-96 bg-bgNavy p-4 flex flex-col">
        <h4 className="text-center">Delete Tags</h4>
        <div className="">
          {tags.map((tag) => (
            <div className="flex justify-between  text-2xl">
              <span>{tag.label}</span>
              <button
                onClick={() => onDeleteTag(tag.id)}
                className="text-red-400"
              >
                X
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={toggleModal}
          className="border py-2 px-4 rounded border-slate-400 text-slate-400 hover:brightness-150 duration-300 self-end"
        >
          close
        </button>
      </div>
    </>
  );
};

export default Modal;
