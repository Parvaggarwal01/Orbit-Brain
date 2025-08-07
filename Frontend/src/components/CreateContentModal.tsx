import { useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./button";
import { Input } from "./input";
import axios from "axios";
import { BACKEND_URL } from "../config";

interface CreateContentModelProps {
  open: boolean;
  onClose: () => void;
}

export const CreateContentModal = ({
  open,
  onClose,
}: CreateContentModelProps) => {
  const titleRef = useRef<HTMLInputElement>(
    null as unknown as HTMLInputElement
  );
  const linkRef = useRef<HTMLInputElement>(null as unknown as HTMLInputElement);
  const [selectedType, setSelectedType] = useState("twitter");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contentTypes = [
    {
      value: "twitter",
      label: "Twitter",
      icon: "🐦",
      description: "Twitter posts and threads",
    },
    {
      value: "youtube",
      label: "YouTube",
      icon: "📺",
      description: "YouTube videos",
    },
    {
      value: "document",
      label: "Document",
      icon: "📄",
      description: "Articles and documents",
    },
    {
      value: "notion",
      label: "Notion",
      icon: "📝",
      description: "Notion pages",
    },
    {
      value: "website",
      label: "Website",
      icon: "🌐",
      description: "Website links",
    },
    {
      value: "other",
      label: "Other",
      icon: "📎",
      description: "Other content types",
    },
  ];

  const addContent = async () => {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;
    const type = selectedType;

    if (!title || !link) {
      alert("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${BACKEND_URL}/api/v1/content`,
        {
          title,
          link,
          type,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const successMessage = document.createElement("div");
      successMessage.className =
        "fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50";
      successMessage.textContent = "Content added successfully!";
      document.body.appendChild(successMessage);

      setTimeout(() => {
        successMessage.style.transform = "translateX(400px)";
        setTimeout(() => document.body.removeChild(successMessage), 300);
      }, 2000);

      onClose();
      window.location.reload();
    } catch (error) {
      alert("Failed to add content. Please try again.");
      console.error("Error adding content:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto transform transition-all">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">
              Add New Content
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <CrossIcon size="md" />
            </button>
          </div>
          <p className="text-gray-600 mt-1">
            Save content to your second brain
          </p>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <Input
              type="text"
              placeholder="Give your content a descriptive title..."
              reference={titleRef}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Link *
            </label>
            <Input
              type="url"
              placeholder="https://example.com/content"
              reference={linkRef}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Content Type *
            </label>
            <div className="grid grid-cols-2 gap-3">
              {contentTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => setSelectedType(type.value)}
                  className={`p-4 rounded-xl border-2 text-left transition-all hover:shadow-md ${
                    selectedType === type.value
                      ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{type.icon}</span>
                    <span className="font-medium text-gray-900">
                      {type.label}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">{type.description}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 flex gap-3">
          {/* <button
            onClick={onClose}
            disabled={isSubmitting}
            className="px-5 py-3rounded-md font-normal m-2 bg-[#94d6f7] text-[#036ca1] flex justify-center hover:bg-[#0284C7] trasition-all hover:duration-300 hover:scale-105"
          >
            Cancel
          </button> */}
          <Button
            variants="secondary"
            text="Cancel"
            size="md"
            onClick={onClose}>

          </Button>
          <Button
            variants="primary"
            text={isSubmitting ? "Adding..." : "Add Content"}
            size="md"
            onClick={addContent}
          />
        </div>
      </div>
    </div>
  );
};
