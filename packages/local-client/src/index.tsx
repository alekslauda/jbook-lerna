import '@fortawesome/fontawesome-free/css/all.min.css'; // could not  build them, i've drag and drop the build folder from the course
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import CellList from './components/cell-list';
import { store } from './state';

const App = () => {

  return (
    <Provider store={store}>
      <div>
        <CellList />
      </div>
    </Provider>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
