import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, A11y } from "swiper";

//Style
import "./style.scss";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";

SwiperCore.use([Pagination, A11y]);

const DataBox = ({ options, inputs, visible, setVisible }) => {
  const dataBoxRef = useRef(null);
  const inputFileRef = useRef(null);

  const [dataUrls, setDataUrls] = useState([]);

  useEffect(() => {
    window.addEventListener("mouseup", containerHandler);
  }, []);

  const containerHandler = (e) => {
    e.preventDefault();

    if (dataBoxRef.current && !dataBoxRef.current.contains(e.target)) {
      setVisible(false);
      setDataUrls([]);
    }
  };

  const bufferToImage = () => {
    setDataUrls([]);

    console.log(dataUrls);
    for (let i = 0; i < inputFileRef.current.files.length; i++) {
      let reader = new FileReader();
      reader.readAsDataURL(inputFileRef.current.files[i]);
      reader.onload = () => {
        setDataUrls([...dataUrls, reader.result]);
      };
    }
  };

  return (
    visible && (
      <div className="float-box-container">
        <div className="data-box" ref={dataBoxRef}>
          <div className="closing" onClick={() => setVisible(false)}>
            <span></span>
            <span></span>
          </div>
          <form
            method="POST"
            onSubmit={(e) => e.preventDefault()}
            ref={options.formRef}
          >
            {options.title && <h3>{options.title}</h3>}
            <div className="input-items">
              {inputs.length !== 0 &&
                inputs.map((input, i) =>
                  input.tag === "input" ? (
                    <>
                      <div className="input-item">
                        {input.label && <label>{input.label}</label>}
                        <input
                          {...input.props}
                          ref={input.props.type == "file" ? inputFileRef : null}
                          onChange={
                            input.props.type == "file"
                              ? bufferToImage
                              : input.props.onChange
                          }
                        />
                      </div>
                      {input.props.type == "file" && dataUrls.length != 0 && (
                        <div className="input-item">
                          <Swiper
                            spaceBetween={0}
                            slidesPerView={1}
                            pagination={{ clickable: true }}
                          >
                            {dataUrls.map((url, i) => (
                              <SwiperSlide>
                                <img className="slider-img" key={i} src={url} />
                              </SwiperSlide>
                            ))}
                          </Swiper>
                        </div>
                      )}
                    </>
                  ) : input.tag === "select" ? (
                    <div className="select-item">
                      <select {...input.props}>
                        {input.options.map((option) => (
                          <option value={option.value}>{option.label}</option>
                        ))}
                      </select>
                      <span></span>
                    </div>
                  ) : input.tag === "textarea" ? (
                    <div
                      className="input-item"
                      style={{ alignItems: "flex-start" }}
                    >
                      {input.label && <label>{input.label}</label>}

                      <textarea
                        {...input.props}
                        style={{ height: 250, minWidth: "auto" }}
                      ></textarea>
                    </div>
                  ) : null
                )}
              <div className="input-item">
                <button
                  className="save-btn"
                  type="submit"
                  onClick={options.onSave}
                >
                  {options.btnSave || "حفظ"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  );
};
export default DataBox;
