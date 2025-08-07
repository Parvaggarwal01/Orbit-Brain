import { Button } from "../../components/button";

import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="p-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center justify-center ml-10 mb-10">
          <h1
            onClick={() => {
              navigate("/");
            }}
            className="text-4xl font-semibold ml-3 cursor-pointer"
          >
            Orbit
          </h1>
        </div>
        <div className="flex justify-end items-end mt-[-25px] mr-10 h-fit w-fit ml-4">
          <Button
            variants="primary"
            size="lg"
            text="Signup"
            onClick={() => {
              navigate("/signup");
            }}
          />
        </div>
      </div>
    </div>
  );
};
