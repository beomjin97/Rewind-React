import { FiUpload } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

interface props {
  isVisible: boolean;
  tags: string[];
}

const Sidebar = ({ isVisible, tags }: props) => {
  const boxStyle = "border-b-[1px] border-[#00000030] py-4";
  const navigate = useNavigate();
  return (
    <div
      className={`lg:w-[70vw] w-[490px] ${
        isVisible
          ? "md:absolute left-[12px] top-[calc(3rem+36px)] drop-shadow-lg border-t-[1px] border-[#00000030]"
          : "md:hidden"
      } block relative bg-[#f2f2f2] z-10`}
    >
      <div className={boxStyle}>
        <button
          className="flex px-2 border-2 border-primary hover:bg-primary"
          onClick={() => {
            navigate("/upload");
          }}
        >
          <FiUpload className="text-4xl" />
          <span className="text-2xl font-bold">upload</span>
        </button>
      </div>
      <div className={boxStyle}>
        <div className="mb-4 text-2xl font-bold">popular tags</div>
        <div className="flex flex-wrap ">
          {tags.map((tag) => (
            <button
              className="min-w-[80px] h-[40px] border-primary border-2 rounded-[20px] text-[20px] text-center font-bold hover:bg-primary m-1 px-2"
              onClick={() => navigate(`/?tag=${tag}`)}
            >
              {`#${tag}`}
            </button>
          ))}
        </div>
      </div>
      <div className={boxStyle}>
        <div className="mb-4 text-2xl font-bold">recommended accounts</div>
        {/* <Profile inHeader={false} />
        <Profile inHeader={false} />
        <Profile inHeader={false} />
        <Profile inHeader={false} /> */}
      </div>
    </div>
  );
};

export default Sidebar;
