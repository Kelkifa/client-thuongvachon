import './App.css';
import 'assets/scss/components/gridLibrary.scss';
import 'assets/scss/base.scss';

import { gameClientGet } from 'features/game/gameSlice';
// import logo from './logo.svg';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

// import 'assets/scss/base.scss';


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const firstFetchData = async () => {
      try {
        const response = await dispatch(gameClientGet());
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    }

    firstFetchData();
  }, [])

  // Render
  return (
    <div className="App">
      <h1>Thuong va chon hello world</h1>
    </div>
  );
}

export default App;
