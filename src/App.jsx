import { Routes, Route } from "react-router-dom";
import LoginApp from "./Apps/Login/Login";


const App = () => {
  return (
    <Routes>
      <Route path='/login' element={<LoginApp />} />
    </Routes>
  );
}

export default App;
