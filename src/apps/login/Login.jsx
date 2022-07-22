import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";

const LoginApp = () => {
    return (
        <div>
            <Routes>
                <Route path="" element={<LoginPage />} />
            </Routes>
        </div>
    );
}
export default LoginApp;