//Styles
import "./style.scss";


//Assets
// @ts-ignore
import LockImage from "../../assets/img/lock.svg";
// @ts-ignore
import ProfileImage from "../../assets/img/profile.svg";

const LoginForm = () => {
  return (
    <div className="login-container">
      <div className="login-box">
        <div className="head">
          <h2>تسجيل الدخول</h2>
        </div>
        <form method="POST">
          <div className="content">
            <div className="input-items">
              <div className="input-item">
                <img src={ProfileImage} alt="user" />
                <input
                  type="text"
                  name="user"
                  placeholder="اسم المستخدم أو البريد الالكتروني"
                  required
                />
              </div>
              <div className="input-item">
                <img src={LockImage} alt="Lock" />
                <input
                  type="password"
                  name="pass"
                  placeholder="كلمة المرور"
                  required
                />
              </div>
              <div className="input-item">
                <button className="btn-login" type="submit" name="">
                  تسجيل الدخول
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
