import { useState, useEffect } from "react";
import axios from "axios";
import { useNotifierContext } from "../../providers";

//Styles
import "./style.scss";


//Assets
//@ts-ignore
import TrashIcon from "../../assets/img/trash.svg";

const Users = () => {
  const { setNotifiers } = useNotifierContext();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      let response = await axios.post("/api/users/get");
      let data = await response.data;

      if (!data.status) return setNotifiers({ errors: data.errors });
      setUsers(data.users);
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <>
      <div className="main-container">
        <div className="page-position">
          <h2>لوحة التحكم</h2>
          <p>/</p>
          <h6>المستخدمين</h6>
        </div>
        <div className="container users">
          <div className="search-container">
            <h3>البحث المتقدم</h3>
            <div className="search-box">
              <input
                type="text"
                placeholder="اسم المستخدم"
                id="username-search"
              />
              <input
                type="text"
                placeholder="البريد الالكتروني"
                id="email-search"
              />
              <input type="text" placeholder="الاسم" id="name-search" />
              <input type="text" placeholder="رقم الهاتف" id="phone-search" />
              <input type="number" placeholder="#" id="id-search" />
              <div className="select-item">
                <select id="lvl-search" onClick={() => "rotateSelect(this)"}>
                  <option value="">المستوي</option>
                  <option value="مدير">مدير</option>
                  <option value="مشرف">مشرف</option>
                  <option value="فني">فني</option>
                </select>
                <span></span>
              </div>
            </div>
          </div>
          <div className="add-new">
            <button
              className="btn-add-new-user"
              id="add_new_user_btn"
              onClick={() => "popupBox('.add-user-box')"}
            >
              أضف جديد
            </button>
          </div>
          <div className="table-container">
            <div className="table">
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>اسم المستخدم</th>
                    <th>البريد الالكتروني</th>
                    <th>الاسم</th>
                    <th>رقم الهاتف</th>
                    <th>المستوي</th>
                    <th>أخر مرة تسجيل دخول</th>
                    <th>الإجراء</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length != 0 &&
                    users.map((user, i) => {
                      return (
                        <tr key={i}>
                          <td>{user._id}</td>
                          <td>{user.username}</td>
                          <td>{user.email}</td>
                          <td>{user.name}</td>
                          <td>{user.phoneNumber}</td>
                          <td>{user.role}</td>
                          <td>{user.createDate}</td>
                          <td className="action">
                            <button
                              onClick={() => "get_user_edit(this)"}
                              className="btn-edit edit_user_btn"
                              data-user-id="<?= $user->id; ?>"
                            >
                              تعديل
                            </button>
                            <img
                              onClick={() =>
                                "popupBox('.delete-user-box'); get_user_delete(this);"
                              }
                              src={TrashIcon}
                              alt="حذف المستخدم"
                              title="حذف المستخدم"
                              data-user-id="<?= $user->id; ?>"
                              className="delete_user_btn"
                            />
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
            <div
              className="pagination"
              data-update-function="searchForUsers"
            ></div>
          </div>
        </div>
      </div>

      <div className="float-box-container">
        <div className="add-user-box">
          <div className="closing" onClick={() => "closeBox(this)"}>
            <span></span>
            <span></span>
          </div>
          <form method="POST">
            <h3>إضافة مستخدم جديد</h3>
            <div className="input-items">
              <div className="select-item">
                <select name="lvl" onClick={() => "rotateSelect(this);"}>
                  <option value="">المستوي</option>
                  <option value="مدير">مدير</option>
                  <option value="مشرف">مشرف</option>
                  <option value="فني">فني</option>
                </select>
                <span></span>
              </div>
              <div className="input-item">
                <label>اسم المستخدم</label>
                <input type="text" name="username" placeholder="اسم المستخدم" />
              </div>
              <div className="input-item">
                <label>البريد الالكتروني</label>
                <input
                  type="text"
                  name="email"
                  placeholder="البريد الالكتروني"
                />
              </div>
              <div className="input-item">
                <label>الاسم</label>
                <input type="text" name="name" placeholder="الاسم" />
              </div>
              <div className="input-item">
                <label>رقم الهاتف</label>
                <input type="text" name="phone" placeholder="رقم الهاتف" />
              </div>
              <div className="input-item">
                <label>كلمة المرور</label>
                <input type="password" name="pass1" placeholder="كلمة المرور" />
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
                <button className="save-btn" type="submit" name="add_new_user">
                  اضافة
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="float-box-container">
        <div className="edit-user-box">
          <div className="closing" onClick={() => "closeBox(this)"}>
            <span></span>
            <span></span>
          </div>
          <form method="POST" onSubmit={() => "edit_user(this)"}>
            <input type="hidden" name="id" />
            <h3>
              تعديل بيانات المستخدم رقم <span className="user_id"></span>
            </h3>
            <div className="input-items">
              <div className="select-item">
                <select name="lvl" onClick={() => "rotateSelect(this);"}>
                  <option value="">المستوي</option>
                  <option value="مدير">مدير</option>
                  <option value="مشرف">مشرف</option>
                  <option value="فني">فني</option>
                </select>
                <span></span>
              </div>
              <div className="input-item">
                <label>اسم المستخدم</label>
                <input type="text" name="username" placeholder="اسم المستخدم" />
              </div>
              <div className="input-item">
                <label>البريد الالكتروني</label>
                <input
                  type="text"
                  name="email"
                  placeholder="البريد الالكتروني"
                />
              </div>
              <div className="input-item">
                <label>الاسم</label>
                <input type="text" name="name" placeholder="الاسم" />
              </div>
              <div className="input-item">
                <label>رقم الهاتف</label>
                <input type="text" name="phone" placeholder="رقم الهاتف" />
              </div>
              <div className="input-item">
                <button className="save-btn" type="submit">
                  تعديل
                </button>
              </div>
            </div>
          </form>

          <span></span>
          <h3>تغيير كلمة المرور</h3>
          <form method="POST" name="change_user_password_form">
            <input type="hidden" name="id" />
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
                <button
                  className="save-btn"
                  type="submit"
                  name="change_user_password"
                >
                  تحديث كلمة المرور
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="float-box-container">
        <div className="delete-user-box">
          <div className="closing" onClick={() => "closeBox(this)"}>
            <span></span>
            <span></span>
          </div>
          <form method="POST" onSubmit={() => "delete_user(this)"}>
            <input type="hidden" name="id" />
            <h3>
              حذف المستخدم رقم <span className="user_id"></span>
            </h3>
            <div className="input-items">
              <div className="input-item">
                <button className="delete-btn" type="submit">
                  حذف
                </button>
              </div>
              <div className="input-item">
                <button
                  className="abort-btn"
                  onClick={() => "abort('.delete-user-box')"}
                >
                  الغاء
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Users;
