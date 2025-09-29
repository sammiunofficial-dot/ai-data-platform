import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import PublicationsPage from "./components/Shared/PublicationsPage";
import PlaceholderPage from "./components/Shared/PlaceholderPage";
import Fisheries from "./pages/Fisheries";
import RequestAccess from "./pages/RequestAccess";

function App() {
  const [route, setRoute] = useState("home");
  const [isRequestOpen, setIsRequestOpen] = useState(false); // modal state

 const renderPage = () => {
    switch (route) {
      case "home":
        return <HomePage setRoute={setRoute} />;
      case "explore":
        return <PlaceholderPage title="Explore Data" description="This is where the data exploration interface will be." />;
      case "api-docs":
        return <PlaceholderPage title="API Documentation" description="Detailed API documentation will be available here." />;
      case "demo":
        return <PlaceholderPage title="Platform Demo" description="An interactive demo of the platform will be presented here." />;
      case "publications":
        return <PublicationsPage />;
      case "fisheries":
        return <Fisheries />;
      case "ocean":
        return <PlaceholderPage title="Ocean Data" description="Explore ocean data and insights here." />;
      case "taxonomy":
        return <PlaceholderPage title="Taxonomy Data" description="Explore taxonomy data and insights here." />;
      case "otoliths":
        return <PlaceholderPage title="Otoliths Data" description="Explore otoliths data and insights here." />;
      case "eDNA":
        return <PlaceholderPage title="eDNA Data" description="Explore eDNA data and insights here." />;
      case "futuretrends":
        return <PlaceholderPage title="Future Trends Data" description="Explore future trends data and insights here." />;
      // IMPORTANT: do NOT return RequestAccess here — keep the page rendering as normal (home or other)
      default:
        return <HomePage setRoute={setRoute} />;
    }
  };

  return (
    <div
      className="bg-[#111618] text-white min-h-screen"
      style={{ fontFamily: `"Space Grotesk", "Noto Sans", sans-serif` }}
    >
      <div className="relative flex flex-col min-h-screen">
        {/* Pass openRequestModal to Header */}
        <Header setRoute={setRoute} openRequestModal={() => setIsRequestOpen(true)} />

        <main className="flex-1">{renderPage()}</main>

        <Footer />

        {/* Request Access modal */}
        <RequestAccess
          isOpen={isRequestOpen}
          onClose={() => setIsRequestOpen(false)}
          onSubmit={(data) => {
            console.log("RequestAccess submitted:", data);
          }}
        />
      </div>
    </div>
  );
}

export default App;
