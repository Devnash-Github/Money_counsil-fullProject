import { useNavigate } from "react-router-dom";
import { useFinance } from "../context/FinanceContext";
import Card from "../components/Card";

export default function ActionPlanPage() {
  const navigate = useNavigate();
  const { analysis } = useFinance();

  if (!analysis) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>No data found. Please start from input page.</p>
      </div>
    );
  }

  const { councilSynthesis } = analysis;

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold text-primary mb-2">
          Your Monthly Action Plan
        </h1>
        <p className="text-gray-600 mb-8">
          A clear, step-by-step plan combining advice from all financial agents.
        </p>

        <Card title="What to do every month">
          <ul className="space-y-4">
            {councilSynthesis.monthlyActionPlan.map((step, index) => (
              <li
                key={index}
                className="flex items-start gap-3"
              >
                <span className="mt-1 h-2 w-2 rounded-full bg-primary"></span>
                <p className="text-gray-700">{step}</p>
              </li>
            ))}
          </ul>
        </Card>

        <div className="mt-10 flex justify-end">
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:scale-[1.02] transition"
          >
            View Financial Dashboard →
          </button>
        </div>
      </div>
    </div>
  );
}
