import React, { Dispatch, SetStateAction } from "react";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";

interface Props {
  setPreview: Dispatch<SetStateAction<string[]>>;
  setPhotoFiles: Dispatch<SetStateAction<FileList | []>>;
}

const InputFiles = ({ setPreview, setPhotoFiles }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setPhotoFiles(files);
      console.log(files);
      for (let i = 0; i < files.length; i++) {
        let imgUrl = URL.createObjectURL(files[i]);
        setPreview((prev) => [...prev, imgUrl]);
      }
    }
  };

  return (
    <>
      <label
        htmlFor="input-file"
        className=" sm:w-[100%] w-[50%] h-[60vh] cursor-pointer border-dashed border-[#00000050] border-[1px] flex flex-col  justify-center items-center"
      >
        <MdOutlineAddPhotoAlternate className="text-6xl text-primary" />
        <p className="text-xl text-primary">Click to upload a photo</p>
        <p className="text-xl text-primary">
          최대 5장 까지 업로드 할 수 있습니다.
        </p>
        <input
          className="hidden"
          accept="image/jpg,image/png,image/jpeg"
          id="input-file"
          type="file"
          onChange={handleChange}
          multiple={true}
        />
      </label>
    </>
  );
};

export default InputFiles;
