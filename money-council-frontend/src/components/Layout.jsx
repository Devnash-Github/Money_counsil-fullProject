import TopNav from "./TopNav";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      {/* HEADER */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-primary">
              Money Council
            </h1>
            <p className="text-xs text-gray-500">
              Your AI-powered financial advisory board
            </p>
          </div>

          <div className="text-sm text-gray-500">
            Hackathon Demo
          </div>
        </div>
      </header>

      {/* NAV */}
      <TopNav />

      {/* PAGE CONTENT */}
      <main className="py-8">
        {children}
      </main>
    </div>
  );
}
