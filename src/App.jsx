import { Routes, Route } from "react-router-dom";
import LoginApp from "./apps/login/Login";
import AppPage from "./apps/AppPage";

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<AppPage />} />
      <Route path='/login/*' element={<LoginApp />} />
    </Routes>
  );
}

export default App;
