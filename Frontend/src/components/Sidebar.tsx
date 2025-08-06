// import { EarthIcon } from "../icons/EarthIcon";
import { LinkIcon } from "../icons/LinkIcon";
import { NoteIcon } from "../icons/NoteIcon";
import { NotionIcon } from "../icons/NotionIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YouTubeIcon } from "../icons/YoutubeIcon";
import { SidebarContent } from "./SidebarItem";

export const Sidebar = () => {
  return (
    <div className="h-screen bg-white border border-slate-300 shadow-md w-72 fixed left-0 top-0">
      <div className="flex items-center justify-center p-4 mt-5 mb-10 cursor-pointer">
        {/* <EarthIcon size="xl" /> */}
        <h1 className="text-4xl font-semibold text-[#036ca1]">Orbit</h1>
      </div>
      <div className="pt-4">
        <SidebarContent text="Twitter" icon={<TwitterIcon size="lg" />} />
        <SidebarContent text="YouTube" icon={<YouTubeIcon size="lg" />} />
        <SidebarContent icon={<NotionIcon size="lg" />} text="Notion" />
        <SidebarContent icon={<NoteIcon size="lg" />} text="Document" />
        <SidebarContent icon={<LinkIcon size="lg" />} text="Links" />
      </div>
    </div>
  );
};
