import { PlusIcon } from "../icons/PlusIcon";
import { Button } from "../components/button";
import { ShareIcon } from "../icons/ShareIcon";
import { Card } from "../components/Card";
import { CreateContentModal } from "../components/CreateContentModal";
import { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { UserContent } from "../hooks/UserContent";
import axios from "axios";
import { BACKEND_URL } from "../config";
// import { useNavigate } from "react-router-dom";
// import { EarthIcon } from "./icons/EarthIcon";

export const Dashboard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const content = UserContent();
  const token = localStorage.getItem("token");
  // const navigate = useNavigate();


  return (
    <div>
      <Sidebar />
      <div className="p-4 ml-72 bg-[#F8FBFC] min-h-screen">
        <CreateContentModal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
          }}
        />
        <div className="flex justify-end gap-4">
          <Button
            variants="secondary"
            text="Share Brain"
            size="md"
            startIcon={<ShareIcon size="lg" />}
            onClick={async() => {
              if(!token){
                alert("You're not logged in");
                return;
              }
              try {
                const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`, {
                  share: true
                }, {
                  headers: {
                    Authorization: `Bearer ${token}`
                  }
                })

                const shareURL = `http://localhost:5173/share/${response.data.hash}`;
                await navigator.clipboard.writeText(shareURL)
                alert("Brain shared successfully! Link copied to clipboard.");
              } catch (error) {
                alert("Failed to share brain. Please try again.");
                console.error("Error sharing brain:", error);
              }
            }}
          ></Button>
          <Button
            variants="primary"
            text="Add Content"
            size="md"
            startIcon={<PlusIcon size="lg" />}
            onClick={() => {
              setModalOpen(true);
            }}
          ></Button>
        </div>

        <div className="flex gap-4">
          {content.map((content) =>
            <Card
            key={content._id}
            contentId={content._id}
            type={content.type as "twitter" | "youtube" | "note" | "links" | "notion"}
            link={content.link}
            title={content.title}
            onDelete={()=> {}}
          />
          )}
        </div>
      </div>
    </div>
  );
}
