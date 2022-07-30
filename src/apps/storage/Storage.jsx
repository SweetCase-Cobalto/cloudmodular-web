import { Routes, Route } from "react-router-dom";
import SharedDownloadPage from "./pages/SharedDownloadPage";
import StoragePage from "./pages/StoragePage";


const StorageApp = () => {
    return (
        <Routes>
            <Route path='' element={<StoragePage />} />
            <Route path='/share/:shared' element={<SharedDownloadPage />} />
        </Routes>
    );
}
export default StorageApp;