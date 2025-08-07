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

  const contentTypes = [
    { value: "twitter", label: "Twitter" },
    { value: "youtube", label: "YouTube" },
    { value: "document", label: "Document" },
    { value: "notion", label: "Notion" },
    { value: "website", label: "Website" },
    { value: "other", label: "Other" },
  ];

  const addContent = async () => {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;
    const type = selectedType;

    if (!title || !link || !type) {
      alert("Please Fill All Fields");
      return;
    }

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
    onClose();
  };

  return (
    <div>
      {open && (
        <div className="bg-slate-500/80 h-screen w-full fixed top-0 right-0 lg:left-0 flex justify-center items-center">
          <div className="flex flex-col p-4 cursor-pointer h-auto w-96 bg-white rounded-2xl lg:mr-36">
            {/* //input div */}
            <div className="flex flex-col justify-center items-center gap-8 relative ">
              <div
                onClick={onClose}
                className="flex justify-end absolute top-0 right-0"
              >
                <CrossIcon size="lg" />
              </div>
              <div className="flex flex-col mt-10 gap-5">
                <label className="text-sm font-medium text-gray-700">
                    Title*
                  </label>
                <Input type="text" placeholder="Title*" reference={titleRef} />
                <label className="text-sm font-medium text-gray-700">
                    Link*
                  </label>
                <Input type="url" placeholder="Link*" reference={linkRef} />
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">
                    Type*
                  </label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {contentTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div
                onClick={addContent}
                className="flex justify-center rounded-2xl items-center w-full"
              >
                <Button variants="primary" text="Submit" size="md" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
