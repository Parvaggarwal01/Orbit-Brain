// import { Dashboard } from "./pages/Dashboard";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { SharePage } from "./pages/SharePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { UserProvider } from "./context/UserContext";
import { Dashboard } from "./pages/Dashboard";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/share/:shareId" element={<SharePage />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
//
