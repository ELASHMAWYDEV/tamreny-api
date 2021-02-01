import { Link, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useAuthContext } from "../../providers";
//Style
import "./style.scss";

//Assets
//@ts-ignore
import UserIcon from "../../assets/img/user.svg";
//@ts-ignore
import SettingsIcon from "../../assets/img/settings.png";
//@ts-ignore
import GraphicIcon from "../../assets/img/graphic.svg";
//@ts-ignore
import BossIcon from "../../assets/img/boss.svg";
//@ts-ignore
import Logo from "../../assets/img/logo.png";

const Header = () => {
  const { pathname } = useLocation();
  const { setIsLoggedIn } = useAuthContext();

  const [sidebarActive, setSidebarActive] = useState(false);
  const [floatingBoxActive, setFloatingBoxActive] = useState(false);
  const [settingsBoxActive, setSettingsBoxActive] = useState(false);
  const sidebarRef = useRef(null);
  const floatingBoxRef = useRef(null);
  const settingsBoxRef = useRef(null);

  useEffect(() => {
    window.addEventListener("mouseup", sidebarHandler);
    window.addEventListener("mouseup", floatingBoxHandler);
    window.addEventListener("mouseup", settingsBoxHandler);
  }, []);

  const sidebarHandler = (e) => {
    e.preventDefault();

    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setSidebarActive(false);
    }
    return () => {
      window.removeEventListener("mouseup", sidebarHandler);
    };
  };

  const floatingBoxHandler = (e) => {
    e.preventDefault();

    if (floatingBoxRef.current && !floatingBoxRef.current.contains(e.target)) {
      setFloatingBoxActive(false);
    }
    return () => {
      window.removeEventListener("mouseup", floatingBoxHandler);
    };
  };

  const settingsBoxHandler = (e) => {
    e.preventDefault();

    if (settingsBoxRef.current && !settingsBoxRef.current.contains(e.target)) {
      setSettingsBoxActive(false);
    }
    return () => {
      window.removeEventListener("mouseup", settingsBoxHandler);
    };
  };

  return (
    <>
      <header>
        <div
          className="burger-menu"
          onClick={() => setSidebarActive(!sidebarActive)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className="left-items">
          <div className="user-info">
            <div className="user-img">
              <img src={UserIcon} alt="User" />
            </div>
            <div className="user-name">محمود العشماوي</div>
          </div>
          <span></span>
          <div
            className="settings-icon"
            onClick={() => setFloatingBoxActive(!floatingBoxActive)}
          >
            <img src={SettingsIcon} alt="settings" />
          </div>
        </div>

        <div
          className="floating-box"
          ref={floatingBoxRef}
          style={{ display: floatingBoxActive ? "block" : "none" }}
        >
          <div>
            <button
              className="btn-settings"
              onClick={() => setSettingsBoxActive(true)}
            >
              اعدادت الحساب
            </button>
            <Link
              to="/login"
              className="btn-logout"
              onClick={() => setIsLoggedIn(false)}
            >
              تسجيل الخروج
            </Link>
          </div>
        </div>
      </header>

      <aside
        className="sidebar"
        ref={sidebarRef}
        style={{ right: sidebarActive ? 0 : -300 }}
      >
        <div className="logo-container">
          <div className="logo">
            <img src={Logo} alt="Logo" />
          </div>
        </div>
        <div className="side-links">
          <Link
            to="/admin/stats"
            className={`link ${
              pathname.startsWith("/admin/stats") ? "active-link" : ""
            }`}
            onClick={() => setSidebarActive(false)}
          >
            <img src={GraphicIcon} alt="icon" className="link-icon" />
            <h2>الإحصائيات</h2>
          </Link>
          <Link
            to="/admin/users"
            className={`link ${
              pathname.startsWith("/admin/users") ? "active-link" : ""
            }`}
            onClick={() => setSidebarActive(false)}
          >
            <img src={BossIcon} alt="icon" className="link-icon" />
            <h2>المستخدمين</h2>
          </Link>
          <Link
            to="/admin/articles"
            className={`link ${
              pathname.startsWith("/admin/articles") ? "active-link" : ""
            }`}
            onClick={() => setSidebarActive(false)}
          >
            <img src={BossIcon} alt="icon" className="link-icon" />
            <h2>المقالات</h2>
          </Link>
          <Link
            to="/admin/video-exercises"
            className={`link ${
              pathname.startsWith("/admin/video-exercises") ? "active-link" : ""
            }`}
            onClick={() => setSidebarActive(false)}
          >
            <img src={BossIcon} alt="icon" className="link-icon" />
            <h2>تمارين جاهزة (فيديو)</h2>
          </Link>
          <Link
            to="/admin/image-exercises"
            className={`link ${
              pathname.startsWith("/admin/image-exercises") ? "active-link" : ""
            }`}
            onClick={() => setSidebarActive(false)}
          >
            <img src={BossIcon} alt="icon" className="link-icon" />
            <h2>تمارين رياضية (صور)</h2>
          </Link>
        </div>
      </aside>

      <div
        className="float-box-container"
        style={{ display: settingsBoxActive ? "flex" : "none" }}
      >
        <div className="settings-box" ref={settingsBoxRef}>
          <div className="closing" onClick={() => "closeBox(this)"}>
            <span></span>
            <span></span>
          </div>
          <form
            method="POST"
            id="update_account_settings_form"
            onSubmit={() => "update_account_settings(this)"}
          >
            <div className="input-items">
              <div className="input-item">
                <label>اسم المستخدم</label>
                <input
                  type="text"
                  name="username"
                  placeholder="اسم المستخدم"
                  value="<?= $_SESSION['username']; ?>"
                />
              </div>
              <div className="input-item">
                <label>البريد الالكتروني</label>
                <input
                  type="text"
                  name="email"
                  placeholder="البريد الالكتروني"
                  value="<?= $_SESSION['email']; ?>"
                />
              </div>
              <div className="input-item">
                <label>الاسم</label>
                <input
                  type="text"
                  name="name"
                  placeholder="الاسم"
                  value="<?= $_SESSION['name']; ?>"
                />
              </div>
              <div className="input-item">
                <label>رقم الهاتف</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="رقم الهاتف"
                  value="<?= $_SESSION['phone']; ?>"
                />
              </div>
              <div className="input-item">
                <button className="save-btn" type="submit">
                  حفظ البيانات
                </button>
              </div>
            </div>
          </form>
          <span></span>
          <h3>تغيير كلمة المرور</h3>
          <form
            method="POST"
            id="change_account_password_form"
            onSubmit={() => "change_account_password(this)"}
          >
            <div className="input-items">
              <div className="input-item">
                <label>كلمة المرور الجديدة</label>
                <input
                  type="password"
                  name="pass1"
                  placeholder="كلمة المرور الجديدة"
                />
              </div>
              <div className="input-item">
                <label>تأكيد كلمة المرور</label>
                <input
                  type="password"
                  name="pass2"
                  placeholder="تأكيد كلمة المرور"
                />
              </div>
              <div className="input-item">
                <button className="save-btn" type="submit">
                  تحديث كلمة المرور
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div
        className="box-container"
        style={{ display: "none" }}
        onClick={() => "this.style.display = 'none';"}
      ></div>
    </>
  );
};

export default Header;
