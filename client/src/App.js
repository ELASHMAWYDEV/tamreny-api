import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { useAuthContext, useNotifierContext } from "./providers";

//Style
import "./style.scss";

//Screens
import {
  Login,
  Stats,
  Users,
  Articles,
  ImageExercises,
  VideoExercises,
  Halls,
  Products,
  Orders,
  Proteins,
  PaymentMethods,
  TermsOfServices,
  PrivacyPolicy,
} from "./screens";

//Components
import { Notifier, Header } from "./components";

const App = () => {
  const { isLoggedIn } = useAuthContext();
  const { isNotifierVisible } = useNotifierContext();

  return (
    <div className="App">
      {isNotifierVisible && <Notifier />}
      <Router>
        {isLoggedIn ? (
          <>
            <Header />
            <Switch>
              <Route path="/admin/stats" component={Stats} />
              <Route path="/admin/users" component={Users} />
              <Route path="/admin/articles" component={Articles} />
              <Route path="/admin/image-exercises" component={ImageExercises} />
              <Route path="/admin/video-exercises" component={VideoExercises} />
              <Route path="/admin/halls" component={Halls} />
              <Route path="/admin/products" component={Products} />
              <Route path="/admin/orders" component={Orders} />
              <Route path="/admin/proteins" component={Proteins} />
              <Route path="/admin/payment-methods" component={PaymentMethods} />
              <Redirect to="/admin/stats" />
            </Switch>
          </>
        ) : (
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/terms-of-services" component={TermsOfServices} />
            <Route path="/privacy-policy" component={PrivacyPolicy} />
            <Redirect to="/login" />
          </Switch>
        )}
      </Router>
    </div>
  );
};

export default App;
