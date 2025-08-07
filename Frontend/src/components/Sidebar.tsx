import { useState } from "react";
import { BrainIcon } from "../icons/BrainIcon";
import { LogoutIcon } from "../icons/LogoutIcon";
import { FilterIcon } from "../icons/FilterIcon";
import { SortIcon } from "../icons/SortIcon";
import { GridIcon } from "../icons/GridIcon";
import { ListIcon } from "../icons/ListIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YouTubeIcon } from "../icons/YoutubeIcon";
import { NotionIcon } from "../icons/NotionIcon";
import { LinkIcon } from "../icons/LinkIcon";
import { NoteIcon } from "../icons/NoteIcon";

interface EnhancedSidebarProps {
  onFilterChange: (filter: string) => void;
  onSortChange: (sort: string) => void;
  onSearchChange: (search: string) => void;
  onViewChange: (view: "grid" | "list") => void;
  activeFilter: string;
  activeSort: string;
  currentView: "grid" | "list";
  searchQuery: string;
  onLogout: () => void;
  username?: string;
  onClose?: () => void;
}

export const EnhancedSidebar = ({
  onFilterChange,
  onSortChange,
  onSearchChange,
  onViewChange,
  activeFilter,
  activeSort,
  currentView,
  searchQuery,
  onLogout,
  username,
  onClose,
}: EnhancedSidebarProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const filterOptions = [
    {
      id: "all",
      label: "All Content",
      icon: <BrainIcon size="md" />,
      count: 0,
    },
    {
      id: "twitter",
      label: "Twitter",
      icon: <TwitterIcon size="md" />,
      count: 0,
    },
    {
      id: "youtube",
      label: "YouTube",
      icon: <YouTubeIcon size="md" />,
      count: 0,
    },
    { id: "notion", label: "Notion", icon: <NotionIcon size="md" />, count: 0 },
    { id: "website", label: "Website", icon: <LinkIcon size="md" />, count: 0 },
    {
      id: "document",
      label: "Document",
      icon: <NoteIcon size="md" />,
      count: 0,
    },
  ];

  const sortOptions = [
    { id: "newest", label: "Newest First" },
    { id: "oldest", label: "Oldest First" },
    { id: "title", label: "Title A-Z" },
    { id: "type", label: "Type" },
  ];

  return (
    // FIX: Removed fixed, left-0, top-0, and z-50 from this className.
    // The parent component now correctly controls positioning.
    <div className="h-screen bg-white border-r border-gray-200 shadow-lg w-72 sm:w-80 lg:w-80 flex flex-col">
      <div className="p-3 sm:p-4 lg:p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-3 sm:mb-4 lg:mb-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <h1 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Orbit Brain
            </h1>
          </div>
          {/* Close button for mobile. This will now work correctly. */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClose?.();
            }}
            className="lg:hidden p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors touch-manipulation"
            type="button"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Search your content..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-6 sm:pl-8 lg:pl-10 pr-3 sm:pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="p-3 sm:p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className="flex items-center gap-1 sm:gap-2">
            <FilterIcon size="md" />
            <span className="font-medium text-gray-700 text-sm sm:text-base">
              Filters
            </span>
          </div>
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="text-gray-500 hover:text-gray-700 p-1"
          >
            {isFilterOpen ? "−" : "+"}
          </button>
        </div>

        {isFilterOpen && (
          <div className="space-y-1">
            {filterOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => onFilterChange(option.id)}
                className={`w-full flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2 rounded-lg transition-colors ${
                  activeFilter === option.id
                    ? "bg-blue-100 text-blue-800 border border-blue-200"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                <span
                  className={
                    activeFilter === option.id
                      ? "text-blue-600"
                      : "text-gray-500"
                  }
                >
                  {option.icon}
                </span>
                <span className="flex-1 text-left text-xs sm:text-sm font-medium">
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="p-3 sm:p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className="flex items-center gap-1 sm:gap-2">
            <SortIcon size="md" />
            <span className="font-medium text-gray-700 text-sm sm:text-base">
              Sort
            </span>
          </div>
          <button
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="text-gray-500 hover:text-gray-700 p-1"
          >
            {isSortOpen ? "−" : "+"}
          </button>
        </div>

        {isSortOpen && (
          <div className="space-y-1">
            {sortOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => onSortChange(option.id)}
                className={`w-full text-left px-2 sm:px-3 py-2 rounded-lg transition-colors text-xs sm:text-sm ${
                  activeSort === option.id
                    ? "bg-blue-100 text-blue-800"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="p-3 sm:p-4 border-b border-gray-200">
        <div className="flex items-center gap-1 sm:gap-2 mb-2 sm:mb-3">
          <span className="font-medium text-gray-700 text-sm sm:text-base">
            View
          </span>
        </div>
        <div className="flex gap-1 sm:gap-2">
          <button
            onClick={() => onViewChange("grid")}
            className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 rounded-lg transition-colors text-xs sm:text-sm ${
              currentView === "grid"
                ? "bg-blue-100 text-blue-800"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <GridIcon size="sm" />
            <span>Grid</span>
          </button>
          <button
            onClick={() => onViewChange("list")}
            className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 rounded-lg transition-colors text-xs sm:text-sm ${
              currentView === "list"
                ? "bg-blue-100 text-blue-800"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <ListIcon size="sm" />
            <span>List</span>
          </button>
        </div>
      </div>

      <div className="flex-1"></div>

      <div className="p-3 sm:p-4 border-t border-gray-200">
        <div className="flex items-center justify-between mb-2 sm:mb-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium text-xs sm:text-sm">
              {username ? username.charAt(0).toUpperCase() : "U"}
            </div>
            <div>
              <div className="font-medium text-gray-900 text-xs sm:text-sm">
                {username || "User"}
              </div>
              <div className="text-xs text-gray-500">Free Plan</div>
            </div>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogoutIcon size="md" />
          <span className="text-xs sm:text-sm">Logout</span>
        </button>
      </div>
    </div>
  );
};