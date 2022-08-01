import AccountPage from "./pages/AccountPage";
import { Route, Routes } from "react-router-dom";

const AccountApp = () => {
    return (
        <div>
            <Routes>
                <Route path="" element={<AccountPage />} />
            </Routes>
        </div>
    );
}
export default AccountApp;