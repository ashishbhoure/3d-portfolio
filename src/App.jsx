import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./index.css";
import Navbar from "./components/Navbar";
import { Home, About, Projects, Contact, Resume } from "./pages";
import Footer from "./components/Footer";
import { Helmet } from "react-helmet";
// import Resume from "./pages/Resume";

const App = () => {
  return (
    <Router>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Ashish Bhoure | Portfolio</title>
        <meta
          name="description"
          content="Ashish Bhoure's portfolio showcases innovative software solutions crafted with precision and creativity."
        />
      </Helmet>
      <Navbar />
      <main className="bg-slate-300/20 h-[100%] scroll-smooth">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} /> */}
          <Route
            path="/*"
            element={
              <>
                <Routes>
                  <Route path="/about" element={<About />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/resume" element={<Resume />} />
                </Routes>
                <Footer />
              </>
            }
          />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
