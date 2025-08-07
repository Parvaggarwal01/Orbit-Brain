import { useState, useMemo } from "react";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { Button } from "../components/button";
import { Card } from "../components/Card";
import { EnhancedSidebar } from "../components/EnhancedSidebar";
import { UserContent } from "../hooks/UserContent";
import { useUser } from "../context/UserContext";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { CreateContentModal } from "../components/CreateContentModal";

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
  const [isLoading] = useState(false);
  const [shareLoading, setShareLoading] = useState(false);

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
      return "flex flex-col space-y-4";
    }
    return "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 auto-rows-fr";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
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
      />

      <div className="ml-80 p-8">
        <CreateContentModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        />

        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Your Second Brain
              </h1>
              <p className="text-gray-600">
                {filteredAndSortedContent.length}{" "}
                {filteredAndSortedContent.length === 1 ? "item" : "items"}
                {searchQuery && ` matching "${searchQuery}"`}
                {activeFilter !== "all" && ` in ${activeFilter}`}
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                variants="secondary"
                text={shareLoading ? "Sharing..." : "Share Brain"}
                size="md"
                startIcon={<ShareIcon size="md" />}
                onClick={handleShare}
              />
              <Button
                variants="primary"
                text="Add Content"
                size="md"
                startIcon={<PlusIcon size="md" />}
                onClick={() => setModalOpen(true)}
              />
            </div>
          </div>
        </div>

        {contentLoading || isLoading ? (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading your content...</p>
            </div>
          </div>
        ) : filteredAndSortedContent.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
              <div className="bg-blue-100 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <span className="text-blue-600 text-3xl">🧠</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {searchQuery || activeFilter !== "all"
                  ? "No matching content"
                  : "Your brain is empty"}
              </h3>
              <p className="text-gray-600 mb-6">
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
