import { useFinance } from "../context/FinanceContext";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import FutureBarChart from "../components/FutureBarChart";

export default function FuturePage() {
  const { analysis } = useFinance();
  const navigate = useNavigate();

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

  const { futureSimulation } = analysis;

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <h1 className="text-3xl font-extrabold text-primary mb-2">
          Your Financial Future
        </h1>
        <p className="text-gray-600 mb-10 max-w-2xl">
          We simulated where your finances could be in just 3 months — based on
          whether you follow structured guidance or continue on your current
          path.
        </p>

        {/* VISUAL COMPARISON */}
        <div className="mb-10">
          <FutureBarChart future={futureSimulation} />
        </div>

        {/* SIDE BY SIDE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* CURRENT PATH */}
          <Card title="Without Money Council">
            <p className="text-sm text-gray-600 mb-2">
              If current habits continue
            </p>

            <div className="mt-4">
              <p className="text-sm">Savings after 3 months</p>
              <p className="text-xl font-bold text-gray-800">
                ₹{futureSimulation.currentPath.savingsAfter3Months}
              </p>
            </div>

            <div className="mt-4">
              <p className="text-sm">Outstanding debt</p>
              <p className="text-xl font-bold text-danger">
                ₹{futureSimulation.currentPath.debtAfter3Months}
              </p>
            </div>

            <p className="mt-6 text-xs text-gray-500">
              No structured plan, slow progress, higher financial stress.
            </p>
          </Card>

          {/* OPTIMIZED PATH */}
          <Card title="With Money Council">
            <p className="text-sm text-gray-600 mb-2">
              With guided decisions
            </p>

            <div className="mt-4">
              <p className="text-sm">Savings after 3 months</p>
              <p className="text-xl font-bold text-secondary">
                ₹{futureSimulation.optimizedPath.savingsAfter3Months}
              </p>
            </div>

            <div className="mt-4">
              <p className="text-sm">Outstanding debt</p>
              <p className="text-xl font-bold text-gray-800">
                ₹{futureSimulation.optimizedPath.debtAfter3Months}
              </p>
            </div>

            <p className="mt-6 text-xs text-gray-500">
              Structured saving, controlled debt, improved confidence.
            </p>
          </Card>
        </div>

        {/* FINAL MESSAGE */}
        <div className="mt-12 bg-indigo-50 border border-indigo-100 rounded-2xl p-6">
          <p className="text-indigo-700 font-medium">
            Same income. Same person.
            <br />
            <span className="font-bold">
              The difference is intentional decisions.
            </span>
          </p>
        </div>

        {/* CTA → ACTION PLAN */}
        <div className="mt-12 flex justify-end">
          <button
            onClick={() => navigate("/action-plan")}
            className="bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:scale-[1.02] transition"
          >
            View My Action Plan →
          </button>
        </div>
      </div>
    </div>
  );
}
