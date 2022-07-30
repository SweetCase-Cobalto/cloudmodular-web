import { Routes, Route } from "react-router-dom";
import FavoritePage from "./pages/FavoritePage";
import SharedDownloadPage from "./pages/SharedDownloadPage";
import StoragePage from "./pages/StoragePage";
import SearchPage from "./pages/SearchPage";


const StorageApp = () => {
    return (
        <Routes>
            <Route path='' element={<StoragePage />} />
            <Route path='/share/:shared' element={<SharedDownloadPage />} />
            <Route path='/favorite' element={<FavoritePage />} />
            <Route path='/search' element={<SearchPage />} />
        </Routes>
    );
}
export default StorageApp;