import React from 'react'
import { Container } from 'reactstrap'
import { Router, Route, Switch, BrowserRouter, useHistory } from 'react-router-dom'
import { Provider } from 'react-redux'
import AddCards from '../AddCards'
import Collection from "../Collection";
import store from '../../store'
import history from '../../utils/history'
import NavigationBar from '../NavigationBar';
import Login from '../LoginScreen';
import Info from '../Info'

import '../../service'
import './index.scss'

const AppContent = () => {

  // let history = useHistory();
  // const token = localStorage.getItem("token")

  // if (token === null || token === '') {
  //   history.push('/login')
  // }

  return (
    <Container className='px-4' fluid={true} role='main'>
      <BrowserRouter>
        <Switch>
          <Route path='/collection/add' component={AddCards} />
          <Route path='/collection' component={Collection} />
          <Route path='/info' component={Info} />
          <Route path='/login' component={Login} />
        </Switch>
      </BrowserRouter>
    </Container>
  )
}

const App = () =>
  <Container fluid={true} className='px-0'>
    <Provider store={store}>
      <Router history={history}>
        <NavigationBar />
        <AppContent />
      </Router>
    </Provider>
  </Container>

export default App;
