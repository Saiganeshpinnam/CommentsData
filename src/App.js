import {BrowserRouter, Route, Switch} from 'react-router-dom'

import CommentsDashboard from './components/CommentsDashboard'

import ProfileScreen from './components/ProfileScreen'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={CommentsDashboard} />
      <Route exact path="/profile-screen" component={ProfileScreen} />
    </Switch>
  </BrowserRouter>
)
export default App
