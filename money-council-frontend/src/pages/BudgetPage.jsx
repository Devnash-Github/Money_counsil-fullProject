import { useNavigate } from "react-router-dom";
import { useFinance } from "../context/FinanceContext";
import Card from "../components/Card";
import ExpenseChart from "../components/ExpenseChart";

export default function BudgetPage() {
  const navigate = useNavigate();
  const { analysis, inputData } = useFinance();

  // Safety check
  if (!analysis || !inputData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">
          No data found. Please start from the input page.
        </p>
      </div>
    );
  }

  const { budgetAdvice } = analysis;
  const { expenses } = inputData;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-6 py-8 transition-colors">

      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <h1 className="text-3xl font-extrabold text-primary mb-2">
          Budget Insights
        </h1>
        <p className="text-gray-600 mb-8">
          We analyzed your monthly spending to find areas where small changes
          can unlock meaningful savings.
        </p>

        {/* TOP SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* EXPENSE CHART */}
          <ExpenseChart expenses={expenses} />

          {/* SUGGESTIONS */}
          <Card title="Spending Optimization">
            {budgetAdvice.suggestions.map((item, index) => (
              <div
                key={index}
                className="border-b last:border-b-0 py-3"
              >
                <p className="font-medium capitalize">
                  {item.category}
                </p>
                <p className="text-sm text-gray-600">
                  Current: ₹{item.currentSpend}
                </p>
                <p className="text-sm mt-1">
                  Reduce by{" "}
                  <span className="font-semibold">
                    {item.suggestedCutPercent}%
                  </span>{" "}
                  →{" "}
                  <span className="text-secondary font-semibold">
                    Save ₹{item.estimatedSavings} / month
                  </span>
                </p>
              </div>
            ))}
          </Card>
        </div>

        {/* INSIGHT STRIP */}
        <div className="mt-8 bg-indigo-50 border border-indigo-100 rounded-xl p-4">
          <p className="text-sm text-indigo-700">
            💡 Even small reductions in top spending categories can
            significantly improve your monthly cash flow without impacting
            lifestyle.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-10 flex justify-end">
          <button
            onClick={() => navigate("/stability")}
            className="bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:scale-[1.02] transition"
          >
            Secure My Finances →
          </button>
        </div>
      </div>
    </div>
  );
}
