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
import Develop from 'features/develop/Develop';
import DocMain from 'features/doc/DocMain';
import Game from 'features/game/Game';
import HomePage from 'components/Home/HomePage';
import MainLayout from 'layouts/MainLayout';
import NotFound from 'components/NotFound';
import ToDoMain from 'features/ToDo/ToDoMain';
import { docGetTypes } from 'features/doc/docSlice';
import { gameClientGet } from 'features/game/gameSlice';
import { todoGet } from 'features/ToDo/todoSlice';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const firstFetchData = async () => {
      if (!dispatch) return;
      try {
        // const response = await dispatch(gameClientGet());

        await Promise.all([
          dispatch(gameClientGet()),
          dispatch(todoGet()),
          dispatch(docGetTypes())
        ])
      } catch (err) {
        console.log(err);
      }
    }

    firstFetchData();
  }, [dispatch])

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
                  <Route path='/docs' component={DocMain} />
                  <Route path='/todo' component={ToDoMain} />
                  <Route path='/playTogether' component={Game} />
                  <Route path='/home' component={HomePage} />
                  <Route path='/develop' component={Develop} />
                  <Route exact path='/' component={HomePage} />
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
