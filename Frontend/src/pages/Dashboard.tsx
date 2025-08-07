import { useState, useMemo } from "react";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { Button } from "../components/button";
import { Card } from "../components/Card";
import { EnhancedSidebar } from "../components/Sidebar";
import { UserContent } from "../hooks/UserContent";
import { useUser } from "../context/UserContext";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { EnhancedCreateContentModal } from "../components/CreateContentModal";

interface ContentItem {
  _id: string;
  title: string;
  link: string;
  type: string;
  tags: string[];
  createdAt?: string;
}

export const Dashboard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeSort, setActiveSort] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentView, setCurrentView] = useState<"grid" | "list">("grid");
  const [shareLoading, setShareLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { contents: content, loading: contentLoading } = UserContent();
  const { logout, user } = useUser();

  const filteredAndSortedContent = useMemo(() => {
    let filtered = content.filter((item: ContentItem) => {
      const matchesFilter =
        activeFilter === "all" || item.type === activeFilter;
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.link.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });

    return filtered.sort((a: ContentItem, b: ContentItem) => {
      switch (activeSort) {
        case "newest":
          return (
            new Date(b.createdAt || "").getTime() -
            new Date(a.createdAt || "").getTime()
          );
        case "oldest":
          return (
            new Date(a.createdAt || "").getTime() -
            new Date(b.createdAt || "").getTime()
          );
        case "title":
          return a.title.localeCompare(b.title);
        case "type":
          return a.type.localeCompare(b.type);
        default:
          return 0;
      }
    });
  }, [content, activeFilter, activeSort, searchQuery]);

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleShare = async () => {
    setShareLoading(true);
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You're not logged in");
      setShareLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/brain/share`,
        { share: true },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const shareURL = `${window.location.origin}/share/${response.data.hash}`;
      await navigator.clipboard.writeText(shareURL);

      const customAlert = document.createElement("div");
      customAlert.className =
        "fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-all duration-300";
      customAlert.innerHTML = `
        <div class="flex items-center gap-2">
          <span>✓</span>
          <span>Share link copied to clipboard!</span>
        </div>
      `;
      document.body.appendChild(customAlert);

      setTimeout(() => {
        customAlert.style.transform = "translateX(400px)";
        setTimeout(() => document.body.removeChild(customAlert), 300);
      }, 3000);
    } catch (error) {
      alert("Failed to share brain. Please try again.");
      console.error("Error sharing brain:", error);
    } finally {
      setShareLoading(false);
    }
  };

  const getViewStyles = () => {
    if (currentView === "list") {
      return "flex flex-col space-y-3 sm:space-y-4";
    }
    return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8 auto-rows-fr";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* FIX: Mobile sidebar overlay
        Removed `bg-black bg-opacity-50` from the className to make the overlay transparent.
        The div is still here, so tapping on it will close the sidebar.
      */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Wrapper */}
      <div
        className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <EnhancedSidebar
          onFilterChange={setActiveFilter}
          onSortChange={setActiveSort}
          onSearchChange={setSearchQuery}
          onViewChange={setCurrentView}
          activeFilter={activeFilter}
          activeSort={activeSort}
          currentView={currentView}
          searchQuery={searchQuery}
          onLogout={logout}
          username={user?.username}
          onClose={() => setSidebarOpen(false)}
        />
      </div>

      {/* Main content */}
      <div className="lg:ml-80 p-3 sm:p-4 lg:p-8">
        {/* Mobile header with Hamburger Menu */}
        <div className="lg:hidden mb-4 sm:mb-6 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 text-gray-600 hover:text-gray-900 bg-white rounded-lg shadow-sm"
            type="button"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Orbit Brain
          </h1>
          <div className="w-8 h-8"></div>
        </div>

        <EnhancedCreateContentModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        />

        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
                Your Second Brain
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                {filteredAndSortedContent.length}{" "}
                {filteredAndSortedContent.length === 1 ? "item" : "items"}
                {searchQuery && ` matching "${searchQuery}"`}
                {activeFilter !== "all" && ` in ${activeFilter}`}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <div className="w-full sm:w-auto">
                <Button
                  onClick={() => setModalOpen(true)}
                  variants="primary"
                  text="Add Content"
                  size="md"
                  startIcon={<PlusIcon size="md" />}
                />
              </div>
              <div className="w-full sm:w-auto">
                <Button
                  onClick={handleShare}
                  variants="secondary"
                  text={shareLoading ? "Sharing..." : "Share Brain"}
                  size="md"
                  startIcon={<ShareIcon size="md" />}
                />
              </div>
            </div>
          </div>
        </div>

        {contentLoading ? (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading your content...</p>
            </div>
          </div>
        ) : filteredAndSortedContent.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 max-w-md mx-auto">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 flex items-center justify-center">
                <span className="text-blue-600 text-2xl sm:text-3xl">🧠</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                {searchQuery || activeFilter !== "all"
                  ? "No matching content"
                  : "Your brain is empty"}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                {searchQuery || activeFilter !== "all"
                  ? "Try adjusting your filters or search query."
                  : "Start building your second brain by adding your first piece of content."}
              </p>
              {!searchQuery && activeFilter === "all" && (
                <Button
                  variants="primary"
                  text="Add Your First Content"
                  size="lg"
                  startIcon={<PlusIcon size="md" />}
                  onClick={() => setModalOpen(true)}
                />
              )}
            </div>
          </div>
        ) : (
          <div className={getViewStyles()}>
            {filteredAndSortedContent.map((item: ContentItem) => (
              <Card
                key={item._id}
                title={item.title}
                link={item.link}
                type={item.type as any}
                contentId={item._id}
                tags={item.tags}
                onDelete={handleRefresh}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};