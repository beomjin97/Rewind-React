import React, { useRef, useState, useEffect } from "react";
import InputFiles from "../components/upload/InputFiles";
import SelectedPhoto from "../components/upload/SelectedPhoto";
import { useNavigate, useLocation, useParams } from "react-router-dom";

import { createPost, getPostById, editPost } from "../api";
import { convertURLtoFile } from "../util/convertURLtoFile";

const Upload = () => {
  const [previews, setPreview] = useState<string[]>([]);
  const [photoFiles, setPhotoFiles] = useState<FileList | []>([]);
  const [content, setContent] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [tag, setTag] = useState<string>("");

  const { postId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const chipInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (location.pathname.startsWith("/update")) {
      getPostById(postId || "")
        .then((res) => {
          setPreview(res.data.imgUrl);
          res.data.imgUrl.forEach((url: string) => {
            convertURLtoFile(url).then((file: File) => {
              //@ts-ignore
              setPhotoFiles((prev: FileList | []) => [...prev, file]);
            });
          });
          setContent(res.data.content);
          setTags(res.data.tags);
        })
        .catch((err) => {
          alert("존재하지 않는 게시글 입니다.");
          navigate("/");
        });
    }
  }, [location, postId]);

  const cancel = () => {
    setPreview([]);
    setContent("");
    setTags([]);
    setPhotoFiles([]);
  };

  const submit = async () => {
    console.log("photoFiles", photoFiles);
    try {
      const formData = new FormData();
      formData.append("tags", JSON.stringify(tags));
      formData.append("content", content);
      if (photoFiles !== undefined) {
        for (let i = 0; i < photoFiles.length; i++) {
          if (typeof photoFiles[i] === "string") {
            //@ts-ignore
            //type guard 해놓음
            convertURLtoFile(photoFiles[i]).then();
          } else {
            //@ts-ignore
            //type guard 해놓음
            formData.append("photoFiles", photoFiles[i], photoFiles[i].name);
          }
        }
      }
      if (location.pathname.startsWith("/update")) {
        const res = await editPost(postId || "", formData);
        console.log(res.data);
        alert("수정 되었습니다.");
        navigate("/");
      } else {
        const res = await createPost(formData);
        console.log(res.data);
        alert("업로드 되었습니다.");
        navigate("/");
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setTags((prev) => [...prev, tag]);
      setTag("");
    }
  };

  return (
    <>
      <div className="bg-[#FFFBFB] w-[80%] lg:w-[100%] mx-auto py-10 mt-10 mb-10">
        <div className="mx-auto w-[90%]">
          <h1 className="text-4xl font-bold sm:text-center">Upload Post</h1>
          <h3 className="text-[#d9d9d9] sm:text-center">
            rewind your memory with <span className="text-primary">Rewind</span>
          </h3>
          <div className="flex justify-between mt-8 sm:block">
            {previews.length === 0 ? (
              <InputFiles
                setPreview={setPreview}
                setPhotoFiles={setPhotoFiles}
              />
            ) : (
              <div className="w-[50%] h-[60vh] flex flex-wrap border-dashed border-[#00000050] border-[1px]">
                {previews.map((preview, idx) => (
                  <SelectedPhoto
                    key={idx}
                    idx={idx}
                    preview={preview}
                    setPreview={setPreview}
                  />
                ))}
              </div>
            )}
            <div className="w-[40%] sm:w-[100%]">
              <div className="relative">
                <div className="mb-2 text-xl font-bold">
                  Please add a content
                </div>
                <div className="absolute right-1 bottom-12">
                  {content.length}/100
                </div>
                <textarea
                  className="border-[1px] border-[#00000030] focus:outline-primary mb-10 pl-3 w-[100%]"
                  cols={40}
                  rows={5}
                  style={{ resize: "none" }}
                  placeholder="최대 100자까지 입력할 수 있습니다."
                  value={content}
                  maxLength={100}
                  onChange={handleContent}
                ></textarea>
              </div>
              <div className="mb-2 text-xl font-bold">Please add tags</div>
              <div
                className={`h-10 w-full mb-10 overflow-x-auto flex items-center scrollbar-hide border-[1px] border-[#00000030] ${
                  document.activeElement === chipInput.current &&
                  "border-primary border-[2px]"
                }`}
              >
                {tags.map((tag, idx) => (
                  <div
                    className="flex items-center flex-none px-2 ml-2 rounded-lg h-7 border-primary border-[2px]"
                    key={idx}
                  >
                    <div className="inline">{tag}</div>
                    <div
                      className="cursor-pointer inline bg-primary rounded-[50%] w-[20px] h-[20px] leading-5 text-center ml-1 "
                      onClick={() => {
                        setTags((prev) =>
                          prev.filter((item, _idx) => _idx !== idx)
                        );
                      }}
                    >
                      &times;
                    </div>
                  </div>
                ))}
                <input
                  type="text"
                  className="pl-2 outline-none"
                  placeholder="엔터로 구분"
                  ref={chipInput}
                  value={tag}
                  onKeyDown={handleKeyDown}
                  onChange={(e) => {
                    setTag(e.target.value);
                  }}
                />
              </div>
              <div className="flex justify-between">
                <button
                  className="border-[1px] text-2xl px-6 hover:bg-[#000] hover:text-white w-28 text-center"
                  onClick={cancel}
                >
                  cancel
                </button>
                <button
                  className="border-[1px] text-2xl px-6 text-primary hover:bg-primary hover:text-white w-28 text-center"
                  onClick={submit}
                >
                  upload
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Upload;
