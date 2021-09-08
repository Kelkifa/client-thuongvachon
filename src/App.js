import './App.css';
import 'assets/scss/components/gridLibrary.scss';
import 'assets/scss/base.scss';

import {
  Route,
  BrowserRouter as Router,
  Switch
} from "react-router-dom";
import { Suspense, useEffect } from 'react';

import Game from 'features/game/Game';
import MainLayout from 'layouts/MainLayout';
import NotFound from 'components/NotFound';
import { gameClientGet } from 'features/game/gameSlice';
// import logo from './logo.svg';
import { useDispatch } from 'react-redux';

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
    <div className="custom-scroll">
      <Suspense fallback={<div>Loading ... </div>}>
        <Router>
          <Switch>

            <Route>
              <MainLayout>
                <Switch>
                  <Route path='/playTogether' component={Game} />
                  <Route component={NotFound} />
                </Switch>
              </MainLayout>
            </Route>

            <Route component={NotFound} />

          </Switch>
        </Router>
      </Suspense>
    </div>
  );
}

export default App;
