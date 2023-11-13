import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux';
import store from './redux/store/Store';
import { saveLogin } from './redux/slices/AuthSlice';
// import { persistor, store } from './redux/store/Store.ts'
// import { Provider } from 'react-redux'
// import { PersistGate } from 'redux-persist/integration/react'

const savedUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null;

if (savedUser) {
  store.dispatch(saveLogin(savedUser));
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>
)
