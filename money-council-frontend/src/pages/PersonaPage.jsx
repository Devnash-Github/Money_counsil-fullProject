import { useNavigate } from "react-router-dom";
import { useFinance } from "../context/FinanceContext";
import Card from "../components/Card";

export default function PersonaPage() {
  const navigate = useNavigate();
  const { analysis } = useFinance();

  // Safety check (direct URL access)
  if (!analysis) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">
          No data found. Please start from the input page.
        </p>
      </div>
    );
  }

  const { persona } = analysis;

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <div className="max-w-4xl mx-auto">
        {/* HEADER */}
        <h1 className="text-3xl font-extrabold text-primary mb-2">
          Your Financial Persona
        </h1>
        <p className="text-gray-600 mb-8">
          We analyzed your income, expenses, risk comfort, and obligations to
          understand how you should approach money.
        </p>

        {/* PERSONA CARD */}
        <Card title="Persona Summary">
          <p className="text-2xl font-bold mb-2">
            {persona.type}
          </p>
          <p className="text-gray-700">
            {persona.reason}
          </p>
        </Card>

        {/* INTERPRETATION */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card title="Income Pattern">
            <p className="text-sm text-gray-600">
              Your income stability allows for structured planning and
              predictable monthly decisions.
            </p>
          </Card>

          <Card title="Risk Behavior">
            <p className="text-sm text-gray-600">
              Your risk comfort influences how aggressively you should invest
              and how much safety buffer you need.
            </p>
          </Card>

          <Card title="Primary Focus">
            <p className="text-sm text-gray-600">
              Your persona suggests prioritizing balance — stability first,
              growth next.
            </p>
          </Card>
        </div>

        {/* CTA */}
        <div className="mt-10 flex justify-end">
          <button
            onClick={() => navigate("/budget")}
            className="bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:scale-[1.02] transition"
          >
            View My Budget Insights →
          </button>
        </div>
      </div>
    </div>
  );
}
