import Navigation from "./navigation";
import { Provider } from 'react-redux'
import store from './stores/store'
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <Provider store={store}>
      <ToastContainer />
      <Navigation />
    </Provider>
  );
}

export default App;
