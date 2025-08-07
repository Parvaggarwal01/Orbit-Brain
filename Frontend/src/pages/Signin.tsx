import { useRef } from "react";
import { Button } from "../components/button";
import { Input } from "../components/input";
import { CrossIcon } from "../icons/CrossIcon";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export const Signin = () => {
  const usernameRef = useRef<HTMLInputElement>(
    null as unknown as HTMLInputElement
  );
  const passwordRef = useRef<HTMLInputElement>(
    null as unknown as HTMLInputElement
  );

  const navigate = useNavigate();

  const signin = async () => {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    if (!username || !password) {
      alert("Please Fill All Fields");
      return;
    }

    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
        username,
        password,
      });
      const jwt = response.data.token;
      localStorage.setItem("token", jwt);
      navigate("/dashboard");
    } catch (err) {
      alert("Signin failed. Please check your credentials.");
      console.log(err);
    }
  };

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="relative flex flex-col items-center justify-center rounded-xl bg-slate-300 h-96 w-80">
        <h1 className="text-2xl font-medium absolute top-4 left-10">Signin</h1>
        <div
          onClick={() => navigate("/")}
          className="absolute top-2 right-3 cursor-pointer "
        >
          <CrossIcon size="lg" />
        </div>
        <div className="flex flex-col justify-center gap-5 mb-2">
          <Input type="text" placeholder="Username" reference={usernameRef} />
          <Input
            type="password"
            placeholder="Password"
            reference={passwordRef}
          />
          <Button onClick={signin} size="md" variants="primary" text="Signin" />
        </div>
        <p>
          Don't have an account
          <span
            onClick={() => navigate("/signup")}
            className="text-blue-600 cursor-pointer ml-2"
          >
            Signup
          </span>
        </p>
      </div>
    </div>
  );
};
