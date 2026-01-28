import { useFinance } from "../context/FinanceContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Card from "../components/Card";

export default function PersonaPage() {
  const { analysis } = useFinance();
  const navigate = useNavigate();
  const [reveal, setReveal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setReveal(true), 600);
    return () => clearTimeout(timer);
  }, []);

  if (!analysis) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>No data found. Please start from the input page.</p>
      </div>
    );
  }

  const { persona } = analysis;

  let focusPoints = [];
  let warnings = [];
  let strategy = "";

  if (persona.type.toLowerCase().includes("student")) {
    focusPoints = [
      "Optimize expense-to-income ratio and minimize discretionary leakage",
      "Establish a baseline emergency reserve before pursuing investments",
      "Build disciplined saving behavior through fixed monthly allocations",
    ];
    warnings = [
      "Lifestyle inflation during early income phases",
      "Using high-interest credit for non-essential consumption",
    ];
    strategy =
      "Money Council prioritizes expense discipline and habit formation to maximize long-term compounding potential.";
  } else if (persona.type.toLowerCase().includes("freelancer")) {
    focusPoints = [
      "Smooth income volatility through cash buffer optimization",
      "Segment personal and professional cash flows",
      "Prioritize liquidity over aggressive growth strategies",
    ];
    warnings = [
      "Underestimating low-income cycles",
      "Inconsistent saving during high-revenue months",
    ];
    strategy =
      "Money Council focuses on stabilizing cash flow and protecting downside risk for irregular earners.";
  } else {
    // Salaried / Growth persona
    focusPoints = [
      "Allocate surplus income efficiently across savings and growth assets",
      "Systematically reduce high-interest liabilities",
      "Avoid capital stagnation caused by idle cash",
    ];
    warnings = [
      "Overconfidence in future income growth",
      "Delaying investments despite stable cash flow",
    ];
    strategy =
      "Money Council converts income stability into structured wealth creation through optimized allocation.";
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-6 py-12 transition-colors">

      <div className="max-w-5xl mx-auto space-y-10">

        {/* PERSONA REVEAL */}
        <div className="text-center">
          <span className="inline-block mb-4 px-4 py-1 text-xs font-semibold text-indigo-700 bg-indigo-50 rounded-full">
            PERSONA IDENTIFIED
          </span>

          <div
            className={`transition-all duration-700 ease-out ${
              reveal ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
          >
            <h1 className="text-5xl font-extrabold text-primary tracking-tight">
              {persona.type}
            </h1>

            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              {persona.reason}
            </p>

            <p className="mt-2 text-sm font-semibold text-indigo-600">
              Council Classification Level: Strategic
            </p>
          </div>
        </div>

        {/* HOW YOU SHOULD THINK */}
        <Card title="How individuals with this persona should approach money">
          <ul className="space-y-3 text-gray-700">
            {focusPoints.map((point, idx) => (
              <li key={idx} className="flex gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-primary" />
                <p>{point}</p>
              </li>
            ))}
          </ul>
        </Card>

        {/* COMMON MISTAKES */}
        <Card title="Common financial risks for this persona">
          <ul className="space-y-3 text-gray-700">
            {warnings.map((warn, idx) => (
              <li key={idx} className="flex gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-red-400" />
                <p>{warn}</p>
              </li>
            ))}
          </ul>
        </Card>

        {/* STRATEGY */}
        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6">
          <p className="text-indigo-700 font-medium">
            💡 {strategy}
          </p>
        </div>

        {/* CTA */}
        <div className="flex justify-end">
          <button
            onClick={() => navigate("/budget")}
            className="bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:scale-[1.02] transition"
          >
            Show me what to optimize first →
          </button>
        </div>

      </div>
    </div>
  );
}
