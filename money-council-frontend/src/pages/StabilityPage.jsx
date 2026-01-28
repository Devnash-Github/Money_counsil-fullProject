import { useNavigate } from "react-router-dom";
import { useFinance } from "../context/FinanceContext";
import Card from "../components/Card";

export default function StabilityPage() {
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

  const { savingsPlan, debtPlan } = analysis;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-6 py-8 transition-colors">

      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <h1 className="text-3xl font-extrabold text-primary mb-2">
          Financial Stability
        </h1>
        <p className="text-gray-600 mb-8">
          Before growing wealth, it’s important to build a safety net and
          manage obligations responsibly.
        </p>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* SAVINGS */}
          <Card title="Savings Plan">
            <p className="text-lg font-semibold mb-2">
              Monthly Savings: ₹{savingsPlan.monthlySavings}
            </p>
            <p className="text-sm text-gray-600 mb-3">
              Recommended Emergency Fund Target
            </p>
            <p className="text-xl font-bold text-secondary">
              ₹{savingsPlan.emergencyFundTarget}
            </p>

            <ul className="mt-4 text-sm text-gray-600 list-disc list-inside">
              <li>Emergency fund first</li>
              <li>Separate savings account recommended</li>
              <li>Automate savings monthly</li>
            </ul>
          </Card>

          {/* DEBT */}
          <Card title="Debt Management">
            {debtPlan.message ? (
              <p className="text-sm text-gray-600">
                {debtPlan.message}
              </p>
            ) : (
              <>
                <p className="text-sm mb-1">
                  Strategy:
                  <span className="font-semibold">
                    {" "}{debtPlan.strategy}
                  </span>
                </p>
                <p className="text-sm mb-1">
                  Monthly Payment:
                  <span className="font-semibold">
                    {" "}₹{debtPlan.monthlyPayment}
                  </span>
                </p>
                <p className="text-sm mb-3">
                  Estimated Time to Clear:
                  <span className="font-semibold">
                    {" "}{debtPlan.monthsToClear} months
                  </span>
                </p>

                <p className="text-xs text-gray-500">
                  Paying off high-interest debt early reduces financial stress
                  and frees up cash for long-term goals.
                </p>
              </>
            )}
          </Card>
        </div>

        {/* INSIGHT STRIP */}
        <div className="mt-8 bg-green-50 border border-green-100 rounded-xl p-4">
          <p className="text-sm text-green-700">
            🛡️ Stability creates freedom. Once your emergency fund and debt
            plan are in place, investing becomes safer and more effective.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-10 flex justify-end">
          <button
            onClick={() => navigate("/investment")}
            className="bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:scale-[1.02] transition"
          >
            Explore Investment Options →
          </button>
        </div>
      </div>
    </div>
  );
}
