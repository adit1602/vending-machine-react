import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { HistoryPage } from "./pages/HistoryPage";
import { AdminPage } from "./pages/AdminPage";
import { TestLayout } from "@/components/TestLayout";
import { ErrorBoundary } from "@/components/ErrorBoundary";
// ... other imports

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <TestLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </TestLayout>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
export default App;
