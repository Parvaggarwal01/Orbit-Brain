import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Card } from "../components/Card";
import { EarthIcon } from "../icons/EarthIcon";

interface SharedContent {
  _id: string;
  title: string;
  link: string;
  type: string;
  tags: string[];
}

interface SharedBrain {
  username: string;
  content: SharedContent[];
}

export const SharePage = () => {
  const { shareId } = useParams<{ shareId: string }>();
  const [sharedBrain, setSharedBrain] = useState<SharedBrain | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (shareId) {
      fetchSharedBrain(shareId);
    }
  }, [shareId]);

  const fetchSharedBrain = async (shareId: string) => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/v1/brain/${shareId}`
      );
      setSharedBrain(response.data);
    } catch (error: any) {
      if (error.response?.status === 404) {
        setError("This shared brain link is invalid or has been removed.");
      } else {
        setError("Failed to load shared brain. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading shared brain...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="bg-red-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <span className="text-red-600 text-2xl">⚠️</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Oops!</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <a
            href="/"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Homepage
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-2 rounded-lg">
                <EarthIcon size="lg" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {sharedBrain?.username}'s Brain
                </h1>
                <p className="text-gray-600 mt-1">
                  Shared collection • {sharedBrain?.content?.length || 0} items
                </p>
              </div>
            </div>
            <a
              href="/"
              className="hidden sm:inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Create Your Own
            </a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {sharedBrain?.content?.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-gray-100 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <span className="text-gray-400 text-3xl">📭</span>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                No content shared yet
              </h3>
              <p className="text-gray-600">
                This brain doesn't have any content to display.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sharedBrain?.content?.map((item) => (
                <Card
                  key={item._id}
                  title={item.title}
                  link={item.link}
                  type={
                    item.type as
                      | "twitter"
                      | "youtube"
                      | "note"
                      | "links"
                      | "notion"
                  }
                  contentId={item._id}
                  isSharedView={true}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Want to create your own second brain?
          </h3>
          <p className="text-gray-600 mb-4">
            Organize, save, and share your digital content effortlessly.
          </p>
          <a
            href="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Get Started Free
          </a>
        </div>
      </footer>
    </div>
  );
};
