import { Routes, Route } from "react-router-dom";
import LoginApp from "./apps/login/Login";
import ErrorApp from "./apps/error/Error";
import StorageApp from "./apps/storage/Storage";
import AppPage from "./apps/AppPage";
import Error404Page from "./apps/error/pages/Error404Page";
import SettingApp from "./apps/setting/Setting";
import AccountApp from "./apps/account/Account";

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<AppPage />} />
      <Route path='/login/*' element={<LoginApp />} />
      <Route path='/storage/*' element={<StorageApp />} />
      <Route path='/error/*' element={<ErrorApp />} />
      <Route path='/setting/*' element={<SettingApp />} />
      <Route path='/accounts/*' element={<AccountApp />} />
      <Route path='*' element={<Error404Page />} />
    </Routes>
  );
}
export default App;