import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FinanceProvider } from "./context/FinanceContext";
import Layout from "./components/Layout";

import InputPage from "./pages/InputPage";
import PersonaPage from "./pages/PersonaPage";
import BudgetPage from "./pages/BudgetPage";
import StabilityPage from "./pages/StabilityPage";
import InvestmentPage from "./pages/InvestmentPage";
import FuturePage from "./pages/FuturePage";
import ActionPlanPage from "./pages/ActionPlanPage";
import DashboardPage from "./pages/DashboardPage";

function App() {
  return (
    <FinanceProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><InputPage /></Layout>} />
          <Route path="/persona" element={<Layout><PersonaPage /></Layout>} />
          <Route path="/budget" element={<Layout><BudgetPage /></Layout>} />
          <Route path="/stability" element={<Layout><StabilityPage /></Layout>} />
          <Route path="/investment" element={<Layout><InvestmentPage /></Layout>} />
          <Route path="/future" element={<Layout><FuturePage /></Layout>} />
          <Route path="/action-plan" element={<Layout><ActionPlanPage /></Layout>} />
          <Route path="/dashboard" element={<Layout><DashboardPage /></Layout>} />
        </Routes>
      </BrowserRouter>
    </FinanceProvider>
  );
}

export default App;
