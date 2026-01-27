import { NavLink } from "react-router-dom";

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
  return (
    <div className="sticky top-0 z-50 bg-white border-b">
      <div className="max-w-7xl mx-auto px-6 py-3 flex gap-6 overflow-x-auto">
        {steps.map((step) => (
          <NavLink
            key={step.path}
            to={step.path}
            className={({ isActive }) =>
              `text-sm font-medium whitespace-nowrap ${
                isActive
                  ? "text-primary border-b-2 border-primary pb-1"
                  : "text-gray-500 hover:text-primary"
              }`
            }
          >
            {step.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
}
