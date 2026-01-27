import { useState } from "react";
import { analyzeFinances } from "../services/api";

import InputForm from "../components/InputForm";
import PersonaCard from "../components/PersonaCard";
import BudgetCard from "../components/BudgetCard";
import SavingsCard from "../components/SavingsCard";
import DebtCard from "../components/DebtCard";
import InvestmentCard from "../components/InvestmentCard";
import FutureComparison from "../components/FutureComparison";

export default function Dashboard() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async (data) => {
    setLoading(true);
    try {
      const res = await analyzeFinances(data);
      setResult(res);
    } catch (err) {
      alert("Backend error");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      {/* HERO HEADER */}
      <div className="mb-10 max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-primary">
          Money Council
        </h1>
        <p className="text-gray-600 mt-2 text-lg max-w-2xl">
          Your AI-powered financial advisory board that shows
          <span className="font-semibold">
            {" "}how today’s decisions shape your future
          </span>.
        </p>
      </div>

      {/* INPUT */}
      <div className="max-w-5xl mx-auto mb-8">
        <InputForm onSubmit={handleAnalyze} />
      </div>

      {/* LOADING STATE */}
      {loading && (
        <div className="max-w-5xl mx-auto text-center mt-10">
          <p className="text-lg font-medium text-gray-600 animate-pulse">
            Analyzing your finances…
          </p>
        </div>
      )}

      {/* RESULTS */}
      {result && (
        <div className="max-w-5xl mx-auto">
          {/* MAIN GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PersonaCard persona={result.persona} />
            <BudgetCard budget={result.budgetAdvice} />
            <SavingsCard savings={result.savingsPlan} />
            <DebtCard debt={result.debtPlan} />
            <InvestmentCard investment={result.investmentPlan} />
          </div>

          {/* FUTURE COMPARISON – HIGHLIGHT */}
          <div className="mt-10">
            <FutureComparison future={result.futureSimulation} />
          </div>
        </div>
      )}
    </div>
  );
}
