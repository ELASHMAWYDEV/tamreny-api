//Styles
import "./style.scss";

const Stats = () => {
  return (
    <>
      {/* <Header /> */}
      <div className="main-container">
        <div className="page-position">
          <h2>لوحة التحكم</h2>
          <p>/</p>
          <h6>الإحصائيات</h6>
        </div>

        <div className="stats">
          <div className="head">
            <h3>الإحصائيات</h3>
          </div>
          <div className="boxs">
            <div className="stats-box">
              <div className="item">
                <div className="num">600</div>
                <div className="title">المستخدمين</div>
              </div>
            </div>
            <div className="stats-box">
              <div className="item">
                <div className="num">600</div>
                <div className="title">المقالات</div>
              </div>
            </div>
            <div className="stats-box">
              <div className="item">
                <div className="num">600</div>
                <div className="title">التمارين الجاهزة (فيديو)</div>
              </div>
            </div>
            <div className="stats-box">
              <div className="item">
                <div className="num">600</div>
                <div className="title">التمارين الرياضية (صور)</div>
              </div>
            </div>
            <div className="stats-box">
              <div className="item">
                <div className="num">600</div>
                <div className="title">المكملات الغذائية</div>
              </div>
            </div>
            <div className="stats-box">
              <div className="item">
                <div className="num">600</div>
                <div className="title">الصالات الرياضية</div>
              </div>
            </div>
          </div>
          {/* <span className="line"></span> */}
        </div>
      </div>
    </>
  );
};

export default Stats;
