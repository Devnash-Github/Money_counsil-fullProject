import { useFinance } from "../context/FinanceContext";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function DashboardPage() {
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
    persona,
    savingsPlan,
    futureSimulation,
    councilSynthesis,
    dashboardData,
  } = analysis;

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* HERO */}
        <div>
          <h1 className="text-4xl font-extrabold text-primary">
            Financial Command Center
          </h1>
          <p className="text-gray-600 mt-2 max-w-2xl">
            A complete snapshot of your financial health, future trajectory,
            and recommended actions.
          </p>
        </div>

        {/* AT A GLANCE */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card title="Persona">
            <p className="text-lg font-bold">{persona.type}</p>
            <p className="text-sm text-gray-500 mt-1">
              {persona.reason}
            </p>
          </Card>

          <Card title="Monthly Savings">
            <p className="text-2xl font-bold text-secondary">
              ₹{savingsPlan.monthlySavings}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Planned contribution
            </p>
          </Card>

          <Card title="Debt Remaining">
            <p className="text-2xl font-bold text-danger">
              ₹{futureSimulation.optimizedPath.debtAfter3Months}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              After optimization
            </p>
          </Card>

          <Card title="3-Month Impact">
            <p className="text-2xl font-bold text-primary">
              +₹{futureSimulation.netImpact.additionalSavings}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Net improvement
            </p>
          </Card>
        </div>

        {/* ACTION PLAN PREVIEW */}
        <Card title="Your Action Plan (Preview)">
          <ul className="space-y-3">
            {councilSynthesis.monthlyActionPlan
              .slice(0, 3)
              .map((step, index) => (
                <li key={index} className="flex gap-3">
                  <span className="h-2 w-2 mt-2 rounded-full bg-primary" />
                  <p className="text-gray-700">{step}</p>
                </li>
              ))}
          </ul>

          <div className="mt-6 text-right">
            <button
              onClick={() => navigate("/action-plan")}
              className="text-primary font-semibold hover:underline"
            >
              View full action plan →
            </button>
          </div>
        </Card>

        {/* FINANCIAL TRAJECTORY */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card title="Savings Growth (Next 3 Months)">
            <div className="w-full h-[260px]">
              <ResponsiveContainer>
                <LineChart data={dashboardData.savingsGrowth}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="#22C55E"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card title="Debt Payoff Timeline">
            <div className="w-full h-[260px]">
              <ResponsiveContainer>
                <LineChart data={dashboardData.debtTimeline}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="remainingDebt"
                    stroke="#EF4444"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* INSIGHTS */}
        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6">
          <p className="text-indigo-700 font-medium">
            💡 By following this plan, you improve your savings and reduce debt
            simultaneously — a balance most first-time earners struggle to
            achieve.
          </p>
        </div>

        {/* NEXT ACTIONS */}
        <Card title="What would you like to do next?">
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => navigate("/budget")}
              className="px-5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 font-medium"
            >
              Review Budget
            </button>
            <button
              onClick={() => navigate("/investment")}
              className="px-5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 font-medium"
            >
              Adjust Investments
            </button>
            <button
              onClick={() => navigate("/")}
              className="px-5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 font-medium"
            >
              Update Inputs
            </button>
          </div>
        </Card>

      </div>
    </div>
  );
}
