import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {Landing, Policy, NotFound} from './scenes';

const AppRouter = () => (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/policy' element={<Policy />} />
            <Route path='/404' element={<NotFound />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    </BrowserRouter>
);

export default AppRouter;
