import React from 'react'
import { Route, IndexRoute } from 'react-router'
import NotFoundPage from './components/NotFoundPage'
import HomePage from './components/HomePage'
import DataPackageViewContainer from "./containers/DataPackageView"; // eslint-disable-line
import App from './containers/App'
import PublisherDetailsPage from './containers/PublisherDetailsPage'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path=":publisher" component={PublisherDetailsPage} />
    <Route path=":publisher/:package" component={DataPackageViewContainer} />
    <Route path="*" component={NotFoundPage} />
  </Route>
)
