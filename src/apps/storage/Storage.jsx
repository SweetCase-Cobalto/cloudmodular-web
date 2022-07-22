import { Routes, Route } from "react-router-dom";
import StoragePage from "./pages/StoragePage";


const StorageApp = () => {
    return (
        <Routes>
            <Route path='' element={<StoragePage />} />
        </Routes>
    );
}
export default StorageApp;