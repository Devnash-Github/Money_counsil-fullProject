import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { analyzeFinances } from "../services/api";
import { useFinance } from "../context/FinanceContext";

export default function InputPage() {
  const navigate = useNavigate();
  const { setAnalysis, setInputData } = useFinance();

  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    try {
      const result = await analyzeFinances(form);
      setAnalysis(result);
      setInputData(form);
      navigate("/persona");
    } catch (err) {
      alert("Failed to analyze finances");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-md p-8 max-w-3xl w-full">
        {/* HEADER */}
        <h1 className="text-3xl font-extrabold text-primary mb-2">
          Tell us about your finances
        </h1>
        <p className="text-gray-600 mb-8">
          This helps Money Council personalize advice just for you.
        </p>

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
            className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* EXPENSES */}
        <div className="mb-6">
          <h2 className="font-semibold mb-3">Monthly Expenses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {form.expenses.map((expense, idx) => (
              <div key={idx}>
                <label className="block text-sm capitalize mb-1">
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

        {/* USER TYPE + RISK */}
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
                  debt: { ...form.debt, exists: e.target.checked },
                })
              }
            />
            <span className="font-medium">I have existing debt</span>
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
          {loading ? "Analyzing..." : "Continue to My Financial Persona"}
        </button>
      </div>
    </div>
  );
}
