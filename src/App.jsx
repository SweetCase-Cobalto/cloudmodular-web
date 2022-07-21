import { Routes, Route } from "react-router-dom";
import LoginApp from "./Apps/Login/Login";
import AppPage from "./Apps/AppPage";


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<AppPage />} />
      <Route path='/login/*' element={<LoginApp />} />
    </Routes>
  );
}

export default App;
