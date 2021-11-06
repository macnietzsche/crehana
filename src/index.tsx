import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainNavbar from "./common/navbar";
import "bootstrap/dist/css/bootstrap.min.css";

const LandingPage = lazy(() => import("./components/landing-page"));
const CountryDetail = lazy(() => import("./components/country-detail"));
const PageNotFound = lazy(() => import("./components/page-not-found"));

const Fallback = <div>Loading...</div>;
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <MainNavbar />
      <Suspense fallback={Fallback}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path=":id" element={<CountryDetail />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
