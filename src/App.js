import Navigation from "./navigation";
import { Provider } from 'react-redux'
import store from './stores/store'

function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}

export default App;
