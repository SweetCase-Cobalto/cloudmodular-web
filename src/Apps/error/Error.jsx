import {Routes, Route} from 'react-router-dom';
import Error404Page from './pages/Error404Page';

const ErrorApp = () => {
    return (
        <Routes>
            <Route path='404' element={<Error404Page />} />
        </Routes>
    );
}
export default ErrorApp;