import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { LanguageProvider } from './i18n/LanguageContext.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary fallbackTitle="منصة SO9FIADAK">
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </ErrorBoundary>
);
