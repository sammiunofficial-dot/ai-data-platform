import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import PublicationsPage from "./components/Shared/PublicationsPage";
import PlaceholderPage from "./components/Shared/PlaceholderPage";
import Fisheries from "./pages/Fisheries";
import RequestAccess from "./pages/RequestAccess";
import ExploreData from "./pages/ExploreData";
import OceanographyMap from "./pages/OceanographyMap";
import EDNAAnalysisDashboard from "./pages/EDNAAnalysisDashboard";


function App() {
  const [route, setRoute] = useState("home");
  const [isRequestOpen, setIsRequestOpen] = useState(false); // modal state

 const renderPage = () => {
    switch (route) {
      case "home":
        return <HomePage setRoute={setRoute} />;
      case "explore":
        return <ExploreData/>
      case "api-docs":
        return <PlaceholderPage title="API Documentation" description="Detailed API documentation will be available here." />;
      case "demo":
        return <PlaceholderPage title="Platform Demo" description="Comming soon..." />;
      case "publications":
        return <PublicationsPage />;
      case "fisheries":
        return <Fisheries />;
      case "ocean":
        return <OceanographyMap/>
      case "eDNA":
        return <EDNAAnalysisDashboard/>
      case "otoliths":
        return <EDNAAnalysisDashboard/>
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
