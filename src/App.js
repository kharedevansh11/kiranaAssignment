import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';
import Dashboard from './pages/Dashboard';
import ContestDetails from './pages/ContestDetails';
import '@shopify/polaris/build/esm/styles.css';
import './styles/global.css';

function App() {
  return (
    <AppProvider i18n={enTranslations}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/contest/:contestId" element={<ContestDetails />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
