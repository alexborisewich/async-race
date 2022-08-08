import 'normalize.css';
import './global.css';
import App from './components/app/app';
import { renderBasicLayout } from './components/view/layout/layout';

renderBasicLayout();
const app = new App();
app.start();
