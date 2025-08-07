import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

interface ContentItem {
  _id: string;
  title: string;
  link: string;
  type: string;
  tags: string[];
  userId: string;
  __v: number;
}

export const UserContent = () => {
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    setLoading(true);
    axios
      .get(`${BACKEND_URL}/api/v1/content`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Fetched content:", response.data.content);
        setContents(response.data.content);
      })
      .catch((error) => {
        console.error("Failed to fetch content:", error);
        // Only remove token for authentication errors
        if (error.response?.status === 401 || error.response?.status === 403) {
          console.log("Authentication failed, removing token");
          localStorage.removeItem("token");
          window.location.href = "/signin";
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { contents, loading };
};
