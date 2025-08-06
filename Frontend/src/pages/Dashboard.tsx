import { PlusIcon } from "../icons/PlusIcon";
import { Button } from "../components/button";
import { ShareIcon } from "../icons/ShareIcon";
import { Card } from "../components/Card";
import { CreateContentModal } from "../components/CreateContentModal";
import { useState } from "react";
import { Sidebar } from "../components/Sidebar";
// import { EarthIcon } from "./icons/EarthIcon";

export const Dashboard = () => {
  const [modalOpen, setModalOpen] = useState(false);
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
            onClick={() => {}}
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
          <Card
            type="twitter"
            link="https://x.com/Tar21Operator/status/1953126712625242599"
            title="First Tweet"
          />
          <Card
            type="youtube"
            link="https://www.youtube.com/watch?v=55c6IlV7BEo&list=RDMM8of5w7RgcTc&index=4"
            title="Song"
          ></Card>
        </div>
      </div>
    </div>
  );
}

