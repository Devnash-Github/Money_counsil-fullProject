import { useNavigate } from "react-router-dom";
import { useFinance } from "../context/FinanceContext";
import Card from "../components/Card";

export default function InvestmentPage() {
  const navigate = useNavigate();
  const { analysis } = useFinance();

  // Safety check
  if (!analysis) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">
          No data found. Please start from the input page.
        </p>
      </div>
    );
  }

  const { investmentPlan, persona } = analysis;

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <h1 className="text-3xl font-extrabold text-primary mb-2">
          Investment Guidance
        </h1>
        <p className="text-gray-600 mb-8">
          Based on your financial persona, we recommend starting with simple,
          low-stress investment options that match your risk comfort.
        </p>

        {/* PERSONA CONTEXT */}
        <div className="mb-6 bg-indigo-50 border border-indigo-100 rounded-xl p-4">
          <p className="text-sm text-indigo-700">
            👤 <span className="font-semibold">Persona:</span> {persona.type} —{" "}
            {persona.reason}
          </p>
        </div>

        {/* INVESTMENT OPTIONS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card title="Recommended Instruments">
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              {investmentPlan.recommendedOptions.map((opt, index) => (
                <li key={index}>{opt}</li>
              ))}
            </ul>

            <p className="mt-4 text-sm text-gray-600">
              These options are selected to minimize complexity while building
              long-term wealth steadily.
            </p>
          </Card>

          <Card title="How to Start">
            <p className="text-lg font-semibold mb-2">
              Suggested Monthly Amount
            </p>
            <p className="text-2xl font-bold text-secondary mb-3">
              ₹{investmentPlan.startingAmount}
            </p>

            <ul className="text-sm text-gray-600 list-disc list-inside">
              <li>Start small, increase gradually</li>
              <li>Automate monthly contributions</li>
              <li>Avoid frequent buying & selling</li>
            </ul>
          </Card>
        </div>

        {/* RESPONSIBILITY STRIP */}
        <div className="mt-8 bg-yellow-50 border border-yellow-100 rounded-xl p-4">
          <p className="text-sm text-yellow-700">
            ⚠️ Investing works best when done patiently. Avoid chasing short-term
            returns or reacting emotionally to market fluctuations.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-10 flex justify-end">
          <button
            onClick={() => navigate("/future")}
            className="bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:scale-[1.02] transition"
          >
            See My Financial Future →
          </button>
        </div>
      </div>
    </div>
  );
}
