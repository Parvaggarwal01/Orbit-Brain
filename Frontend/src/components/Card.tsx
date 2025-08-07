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

  useEffect(() => {
    if (type === "twitter" && window?.twttr?.widgets) {
      window.twttr.widgets.load(twitterRef.current);
    }
  }, [type, link]);

  const normalizedLink = link.replace("x.com", "twitter.com");

  const getTypeIcon = () => {
    switch (type) {
      case "twitter":
        return <TwitterIcon size="md" />;
      case "youtube":
        return <YouTubeIcon size="md" />;
      case "notion":
        return <NotionIcon size="md" />;
      case "website":
        return <LinkIcon size="md" />;
      default:
        return <NoteIcon size="md" />;
    }
  };

  const getTypeColor = () => {
    switch (type) {
      case "twitter":
        return "bg-blue-100 text-blue-800";
      case "youtube":
        return "bg-red-100 text-red-800";
      case "notion":
        return "bg-gray-100 text-gray-800";
      case "website":
        return "bg-green-100 text-green-800";
      default:
        return "bg-purple-100 text-purple-800";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden group w-full flex flex-col">
      <div className="p-6 flex-grow">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className={`p-2 rounded-lg ${getTypeColor()} flex-shrink-0`}>
              {getTypeIcon()}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-gray-900 text-lg mb-1 line-clamp-2 leading-tight">
                {title}
              </h3>
              <span
                className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getTypeColor()}`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-2">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Open link"
            >
              <ShareIcon size="sm" />
            </a>
            {!isSharedView && (
              <button
                onClick={async () => {
                  try {
                    const token = localStorage.getItem("token");
                    console.log("Deleting content with ID:", contentId);

                    const response = await axios.request({
                      method: "DELETE",
                      url: `${BACKEND_URL}/api/v1/content`,
                      data: { contentId },
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
                className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete content"
              >
                <DeleteIcon size="sm" />
              </button>
            )}
          </div>
        </div>

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
              >
                #{tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                +{tags.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>

      <div className="border-t border-gray-100 flex-shrink-0">
        <div className="px-6 py-3 text-sm text-gray-500">
          <div className="flex items-center justify-between">
            <span className="text-gray-400">
              {type.charAt(0).toUpperCase() + type.slice(1)} content
            </span>
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700 text-xs font-medium"
            >
              View →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
