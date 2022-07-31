import { Routes, Route } from "react-router-dom";
import SettingPage from "./page/SettingPage";

const SettingApp = () => {
    return (
        <Routes>
            <Route path='' element={<SettingPage />} />
        </Routes>
    );
}
export default SettingApp;