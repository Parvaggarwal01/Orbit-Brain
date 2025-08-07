import { useEffect, useRef } from "react";
import { DeleteIcon } from "../icons/DeleteIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YouTubeIcon } from "../icons/YoutubeIcon";
import { NotionIcon } from "../icons/NotionIcon";
import { LinkIcon } from "../icons/LinkIcon";
import { NoteIcon } from "../icons/NoteIcon";
import { BACKEND_URL } from "../config";
import axios from "axios";

interface CardProps {
  title: string;
  link: string;
  type:
    | "twitter"
    | "youtube"
    | "note"
    | "links"
    | "notion"
    | "website"
    | "document"
    | "other";
  contentId: string;
  onDelete?: () => void;
  isSharedView?: boolean;
  tags?: string[];
}

function getYouTubeEmbedUrl(url: string): string {
  if (url.includes("embed")) return url;

  try {
    if (url.includes("watch?v=")) {
      const id = new URL(url).searchParams.get("v");
      return `https://www.youtube.com/embed/${id}`;
    }
    if (url.includes("youtu.be/")) {
      const id = url.split("youtu.be/")[1];
      return `https://www.youtube.com/embed/${id}`;
    }
  } catch {
    return "";
  }

  return "";
}

export const Card = ({
  title,
  link,
  type,
  contentId,
  onDelete,
  isSharedView = false,
  tags = [],
}: CardProps) => {
  const twitterRef = useRef<HTMLDivElement>(null);
  console.log(contentId);

  useEffect(() => {
    if (type === "twitter" && window?.twttr?.widgets) {
      window.twttr.widgets.load(twitterRef.current);
    }
  }, [type, link]);

  const normalizedLink = link.replace("x.com", "twitter.com");

  return (
    <div className="flex justify-around flex-col  border border-slate-300 h-auto w-80 overflow-hidden rounded-lg mt-5 ml-5 my-5 py-3 px-5 shadow-md">
      <div className="flex justify-between">
        <div className="flex gap-3">
          <NoteIcon size="lg" />
          <h1 className="font-semibold">{title}</h1>
        </div>
        <div className="flex gap-3">
          <a href={link} target="_blank">
            <ShareIcon size="lg" />
          </a>
          <div
            onClick={async () => {
              try {
                const token = localStorage.getItem("token");
                console.log("Deleting content with ID:", contentId);

                const response = await axios.request({
                  method: "DELETE",
                  url: `${BACKEND_URL}/api/v1/content`,
                  data: {
                    contentId: contentId,
                  },
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                  },
                });

                console.log("Delete response:", response.data);
                if (onDelete) {
                  onDelete();
                }
              } catch (error: any) {
                console.error("Failed to delete content:", error);
                console.error("Error response:", error.response?.data);
              }
            }}
            className="cursor-pointer hover:text-red-600"
          >
            <DeleteIcon size="lg" />
          </div>
        </div>
      </div>
      <div className="w-full h-auto mt-2 mb-2">
        {type === "youtube" && (
          <iframe
            className="rounded-2xl min-h-72 w-full mt-5"
            src={getYouTubeEmbedUrl(link)}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        )}
        {type === "twitter" && (
          <div ref={twitterRef}>
            <blockquote className="twitter-tweet">
              <a href={normalizedLink}></a>
            </blockquote>
          </div>
        )}
      </div>
    </div>
  );
};
