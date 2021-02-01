import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { useAuthContext } from "./providers";

//Style
import "./style.scss";

//Screens
import { Login, Stats, Users } from "./screens";

const App = () => {
  const { isLoggedIn } = useAuthContext();
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          {isLoggedIn && (
            <>
              <Route path="/admin/stats" component={Stats} />
              <Route path="/admin/users" component={Users} />
              <Route path="/admin/articles" component={Stats} />
              <Route path="/admin/image-exercises" component={Stats} />
              <Route path="/admin/video-exercises" component={Stats} />
            </>
          )}
          <Redirect to="/login" />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
