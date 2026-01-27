import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FinanceProvider } from "./context/FinanceContext";

import InputPage from "./pages/InputPage";
import PersonaPage from "./pages/PersonaPage";
import BudgetPage from "./pages/BudgetPage";
import StabilityPage from "./pages/StabilityPage";
import InvestmentPage from "./pages/InvestmentPage";
import FuturePage from "./pages/FuturePage";

function App() {
  return (
    <FinanceProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<InputPage />} />
          <Route path="/persona" element={<PersonaPage />} />
          <Route path="/budget" element={<BudgetPage />} />
          <Route path="/stability" element={<StabilityPage />} />
          <Route path="/investment" element={<InvestmentPage />} />
          <Route path="/future" element={<FuturePage />} />
        </Routes>
      </BrowserRouter>
    </FinanceProvider>
  );
}

export default App;
