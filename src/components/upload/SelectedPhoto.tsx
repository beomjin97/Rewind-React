import React, { Dispatch, SetStateAction } from "react";

interface Props {
  previews: string[];
  setPreview: Dispatch<SetStateAction<string[]>>;
  idx: number;
}

const SelectedPhoto = ({ previews, setPreview, idx }: Props) => {
  const handleClick = () => {
    setPreview((prev) => prev.filter((_, index) => index !== idx));
  };
  console.log(previews);
  return (
    <div
      className="w-[150px] h-[150px] overflow-hidden m-3 cursor-pointer"
      onClick={handleClick}
    >
      <img
        src={`http://13.112.212.213/api/uploads/${previews[0]}`}
        alt="test"
      />
    </div>
  );
};

export default SelectedPhoto;
