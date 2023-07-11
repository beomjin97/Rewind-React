import { useNavigate } from "react-router-dom";

interface Props {
  following: { name: string; _id: string }[];
}

const Following = ({ following }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="mx-auto my-10">
      {following.map((item) => (
        <div className="flex justify-center my-3" key={item._id}>
          <div
            className="w-[40px] h-[40px] rounded-[20px] bg-primary mr-3 cursor-pointer"
            onClick={() => navigate(`/user/${item._id}`)}
          ></div>
          <div
            className="max-w-[130px] cursor-pointer font-bold text-lg leading-10"
            onClick={() => navigate(`/user/${item._id}`)}
          >
            {item.name}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Following;
