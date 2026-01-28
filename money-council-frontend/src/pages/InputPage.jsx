import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { analyzeFinances } from "../services/api";
import { useFinance } from "../context/FinanceContext";

export default function InputPage() {
  const navigate = useNavigate();
  const { setAnalysis, setInputData } = useFinance();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    income: 50000,
    expenses: [
      { category: "Rent", amount: 15000 },
      { category: "Food", amount: 8000 },
      { category: "Transport", amount: 3000 },
      { category: "Entertainment", amount: 4000 },
      { category: "Miscellaneous", amount: 2000 },
    ],
    debt: {
      exists: true,
      amount: 30000,
      interest: 24,
    },
    risk: "medium",
    userType: "salaried",
  });

  const handleChange = (section, key, value) => {
    if (section === "expenses") {
      setForm((prev) => ({
        ...prev,
        expenses: prev.expenses.map((exp, idx) =>
          idx === key ? { ...exp, amount: value } : exp
        ),
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [key]: value,
        },
      }));
    }
  };

  const handleSubmit = async () => {
    setError("");

    const totalExpenses = form.expenses.reduce(
      (sum, e) => sum + e.amount,
      0
    );

    if (form.income <= 0) {
      setError("Income must be greater than zero.");
      return;
    }

    if (totalExpenses > form.income) {
      setError("Total expenses cannot exceed income.");
      return;
    }

    setLoading(true);
    try {
      const result = await analyzeFinances(form);
      setAnalysis(result);
      setInputData(form);
      navigate("/persona");
    } catch (err) {
      setError("Failed to analyze finances. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-gray-50 px-6 py-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* HERO SECTION */}
        <div>
          <h1 className="text-5xl font-extrabold text-primary leading-tight">
            Your Personal
            <br />
            <span className="text-indigo-600">
              AI Financial Council
            </span>
          </h1>

          <p className="mt-6 text-lg text-gray-600 max-w-xl">
            Understand your spending, optimize savings, manage debt,
            and visualize your financial future — all in one guided flow.
          </p>

          <ul className="mt-8 space-y-3 text-gray-700">
            <li>✔ Personalized advice, not generic tips</li>
            <li>✔ Built for students & young professionals</li>
            <li>✔ See 3-month impact instantly</li>
          </ul>

          <p className="mt-10 text-sm text-gray-500">
            No sign-up required • Takes less than 2 minutes
          </p>
        </div>

        {/* FORM SECTION */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Start your financial analysis
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Enter your monthly details. You can revise everything later.
          </p>

          {error && (
            <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg p-3">
              {error}
            </div>
          )}

          {/* INCOME */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">
              Monthly Income (₹)
            </label>
            <input
              type="number"
              value={form.income}
              onChange={(e) =>
                setForm({ ...form, income: Number(e.target.value) })
              }
              className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* EXPENSES */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Monthly Expenses</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {form.expenses.map((expense, idx) => (
                <div key={idx}>
                  <label className="block text-sm mb-1">
                    {expense.category}
                  </label>
                  <input
                    type="number"
                    value={expense.amount}
                    onChange={(e) =>
                      handleChange(
                        "expenses",
                        idx,
                        Number(e.target.value)
                      )
                    }
                    className="w-full border rounded-xl px-3 py-2"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* USER TYPE & RISK */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium mb-1">
                User Type
              </label>
              <select
                value={form.userType}
                onChange={(e) =>
                  setForm({ ...form, userType: e.target.value })
                }
                className="w-full border rounded-xl px-3 py-2"
              >
                <option value="student">Student</option>
                <option value="salaried">Salaried</option>
                <option value="freelancer">Freelancer</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Risk Comfort
              </label>
              <select
                value={form.risk}
                onChange={(e) =>
                  setForm({ ...form, risk: e.target.value })
                }
                className="w-full border rounded-xl px-3 py-2"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          {/* DEBT */}
          <div className="mb-8">
            <label className="flex items-center gap-2 mb-3">
              <input
                type="checkbox"
                checked={form.debt.exists}
                onChange={(e) =>
                  setForm({
                    ...form,
                    debt: {
                      ...form.debt,
                      exists: e.target.checked,
                    },
                  })
                }
              />
              <span className="font-medium">
                I have existing debt
              </span>
            </label>

            {form.debt.exists && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="number"
                  placeholder="Debt Amount (₹)"
                  value={form.debt.amount}
                  onChange={(e) =>
                    handleChange(
                      "debt",
                      "amount",
                      Number(e.target.value)
                    )
                  }
                  className="border rounded-xl px-3 py-2"
                />
                <input
                  type="number"
                  placeholder="Interest Rate (%)"
                  value={form.debt.interest}
                  onChange={(e) =>
                    handleChange(
                      "debt",
                      "interest",
                      Number(e.target.value)
                    )
                  }
                  className="border rounded-xl px-3 py-2"
                />
              </div>
            )}
          </div>

          {/* CTA */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:scale-[1.02] transition"
          >
            {loading
              ? "Analyzing your finances…"
              : "Continue to My Financial Persona"}
          </button>
        </div>
      </div>
    </div>
  );
}
