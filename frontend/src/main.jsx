import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { FavoritesProvider } from './FavoritesContext'; // <-- Добавь импорт провайдера

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FavoritesProvider> {/* <-- Обернули App в контекст избранного */}
      <App />
    </FavoritesProvider>
  </StrictMode>
);
