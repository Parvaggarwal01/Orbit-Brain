import type { ReactElement } from "react";

interface SidebarContentProps {
    icon?: ReactElement;
    text?: string
}

export const SidebarContent = ({ icon, text }: SidebarContentProps) => {
    return <div className="mx-10">

        <div className="flex items-center gap-7 mb-5 cursor-pointer hover:bg-slate-400 p-3 rounded-xl transition-all 0.7s ease-out text-[#036ca1]">
            {icon}
            <span>
                {text}
            </span>
        </div>

    </div>
}