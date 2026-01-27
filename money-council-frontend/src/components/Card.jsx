export default function Card({ title, children }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-6">
      {title && (
        <h3 className="text-lg font-semibold mb-4">
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}
