import { Redirect } from "react-router-dom";
import { useAuthContext } from "../../providers";

//Components
import { LoginForm } from "../../components";

const Login = () => {
  const { isLoggedIn } = useAuthContext();

  return (
    <div>
      {isLoggedIn && <Redirect to="/admin/stats" />}
      <LoginForm />
    </div>
  );
};

export default Login;
