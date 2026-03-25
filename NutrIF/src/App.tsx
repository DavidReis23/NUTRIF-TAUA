// src/App.tsx
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import "./App.css";

function App() {
  return (
    <>
      <Header />

      <div className="app-container">
        <Sidebar />

        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default App;