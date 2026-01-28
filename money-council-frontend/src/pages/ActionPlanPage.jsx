import { useFinance } from "../context/FinanceContext";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";

export default function ActionPlanPage() {
  const { analysis } = useFinance();
  const navigate = useNavigate();

  if (!analysis) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>No data found. Please start from the input page.</p>
      </div>
    );
  }

  const {
    councilSynthesis,
    futureSimulation
  } = analysis;

  const actions = councilSynthesis.monthlyActionPlan;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-6 py-12 transition-colors">

      <div className="max-w-5xl mx-auto space-y-10">

        {/* HERO */}
        <div>
          <span className="inline-block mb-3 px-4 py-1 text-xs font-semibold text-indigo-700 bg-indigo-50 rounded-full">
            YOUR FINANCIAL PLAYBOOK
          </span>

          <h1 className="text-4xl font-extrabold text-primary">
            Your 30-Day Action Plan
          </h1>

          <p className="mt-3 text-gray-600 max-w-2xl">
            This plan combines insights from budgeting, savings, debt,
            and investing agents. Follow these steps consistently to
            improve your financial position within the next month.
          </p>
        </div>

        {/* PRIORITIZED ACTIONS */}
<div className="space-y-6">
  {actions.map((step, index) => {
    let badgeText = "";
    let badgeStyle = "";
    let insight = "";

    if (index === 0) {
      badgeText = "HIGH PRIORITY";
      badgeStyle = "bg-red-100 text-red-700";
      insight =
        "This action creates immediate financial relief and sets the foundation for all other improvements.";
    } else if (index === 1) {
      badgeText = "MEDIUM PRIORITY";
      badgeStyle = "bg-yellow-100 text-yellow-700";
      insight =
        "This step strengthens your financial stability and prevents future pressure.";
    } else {
      badgeText = "FOUNDATIONAL";
      badgeStyle = "bg-green-100 text-green-700";
      insight =
        "This is a habit-building action that compounds benefits over time.";
    }

    return (
      <Card key={index} title={`Action ${index + 1}`}>
        <div className="space-y-3">
          {/* PRIORITY BADGE */}
          <span
            className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${badgeStyle}`}
          >
            {badgeText}
          </span>

          {/* ACTION TEXT */}
          <p className="text-gray-800 font-medium">
            {step}
          </p>

          {/* INSIGHT */}
          <p className="text-sm text-gray-600">
            {insight}
          </p>
        </div>
      </Card>
    );
  })}
</div>


        {/* IMPACT SUMMARY */}
        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6">
          <h3 className="font-semibold text-indigo-800 mb-2">
            Why this plan matters
          </h3>
          <p className="text-indigo-700 text-sm">
            If you follow this plan consistently, you can build
            approximately{" "}
            <span className="font-bold">
              ₹{futureSimulation.netImpact.additionalSavings}
            </span>{" "}
            in additional savings over the next 3 months while
            reducing financial stress.
          </p>
        </div>

        {/* MONTHLY RHYTHM */}
        <Card title="How to follow this plan">
          <ul className="space-y-3 text-gray-700 text-sm">
            <li>📅 Week 1: Adjust spending and set up automatic savings</li>
            <li>📅 Week 2: Begin debt repayment as suggested</li>
            <li>📅 Ongoing: Maintain investment contributions</li>
          </ul>
        </Card>

        {/* CTA */}
        <div className="flex justify-end gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:scale-[1.02] transition"
          >
            Track Progress in Dashboard →
          </button>
        </div>
      </div>
    </div>
  );
}
