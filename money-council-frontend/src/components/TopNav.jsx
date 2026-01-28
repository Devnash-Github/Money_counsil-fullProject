import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

const steps = [
  { path: "/", label: "Input" },
  { path: "/persona", label: "Persona" },
  { path: "/budget", label: "Budget" },
  { path: "/stability", label: "Stability" },
  { path: "/investment", label: "Investment" },
  { path: "/future", label: "Future" },
  { path: "/action-plan", label: "Action Plan" },
  { path: "/dashboard", label: "Dashboard" },
];

export default function TopNav() {
  const [darkMode, setDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-6">

        {/* NAV STEPS */}
        <div className="flex gap-6 overflow-x-auto">
          {steps.map((step) => (
            <NavLink
              key={step.path}
              to={step.path}
              className={({ isActive }) =>
                `text-sm font-medium whitespace-nowrap transition ${
                  isActive
                    ? "text-primary border-b-2 border-primary pb-1"
                    : "text-gray-500 dark:text-gray-400 hover:text-primary"
                }`
              }
            >
              {step.label}
            </NavLink>
          ))}
        </div>

        {/* DARK MODE TOGGLE */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-3 py-1.5 rounded-lg text-sm font-medium
                     bg-gray-100 text-gray-700
                     dark:bg-gray-800 dark:text-gray-200
                     hover:opacity-80 transition"
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>
    </div>
  );
}
