import { ReactNode } from "react";

type TagProps = {
  variantNum?: number;
  children: ReactNode;
};

const Tag = ({ variantNum = 0, children }: TagProps) => {
  let bgColor: string = "";

  switch (true) {
    case variantNum % 3 === 0:
      bgColor = "bg-primary";
      break;

    case variantNum % 3 === 1:
      bgColor = "bg-secondary";
      break;

    case variantNum % 3 === 2:
      bgColor = "bg-lightNavy";
      break;

    default:
      break;
  }

  return (
    <span className={`${bgColor} rounded px-2 inline-block`}>{children}</span>
  );
};

export default Tag;
