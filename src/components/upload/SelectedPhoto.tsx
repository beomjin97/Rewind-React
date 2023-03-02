import React, { Dispatch, SetStateAction } from "react";

interface Props {
  photo: string;
  setPreview: Dispatch<SetStateAction<string[]>>;
  idx: number;
}

const SelectedPhoto = ({ photo, setPreview, idx }: Props) => {
  const handleClick = () => {
    setPreview((prev) => prev.filter((_, index) => index !== idx));
  };

  return (
    <div
      className="w-[150px] h-[150px] overflow-hidden m-3 cursor-pointer"
      onClick={handleClick}
    >
      <img src={photo} alt="test" />
    </div>
  );
};

export default SelectedPhoto;
