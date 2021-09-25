import './App.css';
import 'assets/scss/components/gridLibrary.scss';
import 'assets/scss/base.scss';

import {
  Route,
  BrowserRouter as Router,
  Switch
} from "react-router-dom";
import { Suspense, useEffect } from 'react';

import Admin from 'features/admin/Admin';
import AdminLayout from 'layouts/AdminLayout';
import Game from 'features/game/Game';
import HomePage from 'components/Home/HomePage';
import MainLayout from 'layouts/MainLayout';
import NotFound from 'components/NotFound';
import ToDoMain from 'features/ToDo/ToDoMain';
import { gameClientGet } from 'features/game/gameSlice';
import { todoGet } from 'features/ToDo/todoSlice';
// import logo from './logo.svg';
import { useDispatch } from 'react-redux';

// import 'assets/scss/base.scss';


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const firstFetchData = async () => {
      try {
        // const response = await dispatch(gameClientGet());

        await Promise.all([
          dispatch(gameClientGet()),
          dispatch(todoGet())
        ])
      } catch (err) {
        console.log(err);
      }
    }

    firstFetchData();
  }, [])

  // Render
  return (
    <div>
      <Suspense fallback={<div>Loading ... </div>}>
        <Router>
          <Switch>
            <Route path='/admin'>
              <AdminLayout>
                <Admin />
              </AdminLayout>
            </Route>

            <Route path='/'>
              <MainLayout>
                <Switch>
                  <Route path='/todo' component={ToDoMain} />
                  <Route path='/playTogether' component={Game} />
                  <Route path='/home' component={HomePage} />
                  <Route path='/' component={HomePage} />
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
