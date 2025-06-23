import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import RouterUrl from './routes';
import 'react-toastify/dist/ReactToastify.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <RouterUrl />
    </BrowserRouter>
);
