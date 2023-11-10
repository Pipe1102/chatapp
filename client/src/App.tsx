import Layout from "./Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register/page";
import PrivateRoute from "./auth/PrivateRoute";
import { ThemeProvider } from "@material-tailwind/react";
import Placeholder from "./pages/Placeholder";

function App() {
  const queryClient = new QueryClient();
  return (
    <div className="relative">
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<PrivateRoute component={Layout} />}>
                <Route path="/" element={<Placeholder />} />
                <Route path="/:id" element={<Chat />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
