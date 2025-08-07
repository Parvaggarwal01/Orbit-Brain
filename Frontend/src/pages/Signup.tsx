import { useRef, useState } from "react";
import { Button } from "../components/button";
import { Input } from "../components/input";
import { BrainIcon } from "../icons/BrainIcon";
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const signup = async () => {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    if (!username || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);
    setError("");

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
        setError("User already exists. Please try signing in instead.");
      } else {
        setError("Signup failed. Please try again.");
      }
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-white p-3 rounded-2xl shadow-lg">
              <BrainIcon size="xl" />
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Join Orbit Brain
          </h1>
          <p className="text-gray-600">
            Create your account and start organizing your digital life
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <Input
                  type="text"
                  placeholder="Choose a username"
                  reference={usernameRef}
                />
                <p className="text-xs text-gray-500 mt-1">
                  This will be your unique identifier
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <Input
                  type="password"
                  placeholder="Create a password"
                  reference={passwordRef}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Minimum 6 characters required
                </p>
              </div>
            </div>

            <div className="w-full">
              <Button
                onClick={signup}
                size="lg"
                variants="primary"
                text={loading ? "Creating account..." : "Create Account"}
              />
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/signin")}
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate("/")}
            className="text-gray-500 hover:text-gray-700 text-sm transition-colors"
          >
            ← Back to home
          </button>
        </div>

        {/* Terms */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">
            By creating an account, you agree to our Terms of Service and
            Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};
