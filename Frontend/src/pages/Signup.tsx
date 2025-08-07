import { useRef } from "react";
import { Button } from "../components/button";
import { Input } from "../components/input";
import { CrossIcon } from "../icons/CrossIcon";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const usernameRef = useRef<HTMLInputElement>(
    null as unknown as HTMLInputElement
  );
  const passwordRef = useRef<HTMLInputElement>(
    null as unknown as HTMLInputElement
  );

  const navigate = useNavigate();

  const signup = async () => {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    if (!username || !password) {
      alert("Please Fill All Fields");
      return;
    }

    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
        username,
        password,
      });

      // Since signup doesn't return a token, sign them in after successful signup
      if (response.status === 200) {
        const signinResponse = await axios.post(
          `${BACKEND_URL}/api/v1/signin`,
          {
            username,
            password,
          }
        );
        const token = signinResponse.data.token;
        if (token) {
          localStorage.setItem("token", token);
        }
        navigate("/dashboard");
      }
    } catch (err: any) {
      if (err.response?.status === 403) {
        alert("User already exists. Please try signing in.");
      } else {
        alert("Signup failed. Please try again.");
      }
      console.log(err);
    }
  };

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="relative flex flex-col items-center justify-center rounded-xl bg-slate-300 h-96 w-80">
        <h1 className="text-2xl font-medium absolute top-4 left-10">Signup</h1>
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
          <Button onClick={signup} variants="primary" text="Signup" size="lg" />
        </div>
        <p>
          Already have an account
          <span
            onClick={() => navigate("/signin")}
            className="text-blue-600 cursor-pointer ml-2"
          >
            Signin
          </span>
        </p>
      </div>
    </div>
  );
};
