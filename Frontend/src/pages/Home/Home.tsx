import { Button } from "../../components/button";
import { Navbar } from "./Navbar";
import { BrainIcon } from "../../icons/BrainIcon";
import { ShareIcon } from "../../icons/ShareIcon";
import { SearchIcon } from "../../icons/SearchIcon";
import { FilterIcon } from "../../icons/FilterIcon";

export const Home = () => {
  const features = [
    {
      icon: <BrainIcon size="lg" />,
      title: "Smart Organization",
      description:
        "AI-powered categorization automatically organizes your content by type, topic, and relevance.",
    },
    {
      icon: <SearchIcon size="lg" />,
      title: "Lightning Search",
      description:
        "Find any piece of content instantly with our powerful search that understands context.",
    },
    {
      icon: <ShareIcon size="lg" />,
      title: "Easy Sharing",
      description:
        "Share your curated collections with teams, friends, or make them public for the world.",
    },
    {
      icon: <FilterIcon size="lg" />,
      title: "Advanced Filtering",
      description:
        "Filter by content type, date, tags, or custom categories to find exactly what you need.",
    },
  ];

  const contentTypes = [
    {
      type: "Twitter",
      description: "Save tweets and threads",
      color: "bg-blue-500",
    },
    { type: "YouTube", description: "Bookmark videos", color: "bg-red-500" },
    {
      type: "Articles",
      description: "Save web articles",
      color: "bg-green-500",
    },
    {
      type: "Documents",
      description: "Store documents",
      color: "bg-purple-500",
    },
    {
      type: "Links",
      description: "Organize bookmarks",
      color: "bg-yellow-500",
    },
    { type: "Notes", description: "Personal thoughts", color: "bg-pink-500" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />

      <section className="pt-20 pb-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-2xl">
              <BrainIcon size="xl" />
            </div>
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            Your Second Brain
          </h1>
          <p className="text-xl lg:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
            Capture, organize, and rediscover everything that matters to you.
            Turn information overload into your personal knowledge powerhouse.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              variants="primary"
              size="lg"
              text="Start Building Your Brain"
              onClick={() => (window.location.href = "/signup")}
            />
            <Button
              variants="secondary"
              size="lg"
              text="Watch Demo"
              onClick={() => {}}
            />
          </div>

          <div className="text-sm text-gray-500 mb-8">
            ✨ Free forever • No credit card required • 2 minutes setup
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Support for Every Type of Content
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From social media to documents, organize everything in one
              intelligent workspace
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {contentTypes.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-center"
              >
                <div
                  className={`w-12 h-12 ${item.color} rounded-lg mx-auto mb-4 flex items-center justify-center text-white font-bold text-lg`}
                >
                  {item.type[0]}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {item.type}
                </h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Modern Knowledge Work
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to build and maintain your personal knowledge
              system
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="bg-gradient-to-r from-blue-100 to-purple-100 w-16 h-16 rounded-lg flex items-center justify-center text-blue-600 mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Supercharge Your Productivity?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of creators, researchers, and professionals who trust
            Orbit Brain
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variants="secondary"
              size="lg"
              text="Get Started Free"
              onClick={() => (window.location.href = "/signup")}
            />
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-6 md:mb-0">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <BrainIcon size="md" />
              </div>
              <span className="text-xl font-bold">Orbit Brain</span>
            </div>
            <div className="text-center md:text-right text-gray-400">
              <p>
                &copy; 2024 Orbit Brain. Made with ❤️ for knowledge workers.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
