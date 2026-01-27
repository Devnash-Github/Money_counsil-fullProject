import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Card from "./Card";

export default function FutureBarChart({ future }) {
  const data = [
    {
      name: "Savings",
      WithoutCouncil: future.currentPath.savingsAfter3Months,
      WithCouncil: future.optimizedPath.savingsAfter3Months,
    },
    {
      name: "Debt",
      WithoutCouncil: future.currentPath.debtAfter3Months,
      WithCouncil: future.optimizedPath.debtAfter3Months,
    },
  ];

  return (
    <Card title="Future Comparison (3 Months)">
      <p className="text-sm text-gray-500 mb-4">
        Same income. Two very different outcomes.
      </p>

      <div className="w-full h-[280px]">
        <ResponsiveContainer>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="WithoutCouncil"
              fill="#EF4444"
              radius={[6, 6, 0, 0]}
            />
            <Bar
              dataKey="WithCouncil"
              fill="#22C55E"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
