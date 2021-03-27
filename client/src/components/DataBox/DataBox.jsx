import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, A11y } from "swiper";
import GoogleMapReact from "google-map-react";

//Style
import "./style.scss";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";

//Assets
// @ts-ignore
import LocationMark from "../../assets/img/location-mark.svg";

SwiperCore.use([Pagination, A11y]);

const DataBox = ({ options, inputs, visible, setVisible }) => {
  const dataBoxRef = useRef(null);
  const inputFileRef = useRef(null);

  const [dataUrls, setDataUrls] = useState([]);

  useEffect(() => {
    if (options.images) bufferToImage({ images: options.images });

    window.addEventListener("mouseup", containerHandler);
  }, []);

  const containerHandler = (e) => {
    e.preventDefault();

    if (dataBoxRef.current && !dataBoxRef.current.contains(e.target)) {
      setVisible(false);
      setDataUrls([]);
    }
  };

  const bufferToImage = async ({ images = [] }) => {
    if (images.length != 0) {
      for (let i = 0; i < images.length; i++) {
        let blob = await fetch(images[i]).then((r) => r.blob());
        let reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onload = () => {
          setDataUrls([...dataUrls, reader.result]);
          inputFileRef.current &&
            inputFileRef.current.files.append(reader.result);
        };
      }
    }

    if (inputFileRef.current)
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
                  ) : input.tag == "location" ? (
                    <div className="map-box">
                      <GoogleMapReact
                        bootstrapURLKeys={{
                          key: "AIzaSyDUZp6H0YLdfkwOA7EZwEv6ndNAkjleN9w",
                        }}
                        defaultCenter={{
                          lat: input.lat,
                          lng: input.lng,
                        }}
                        defaultZoom={16}
                        onClick={(data) => {
                          input.setLocation({ lng: data.lng, lat: data.lat });
                        }}
                      >
                        <img
                          src={LocationMark}
                          lat={input.lat}
                          lng={input.lng}
                          className="mark-img"
                        />
                      </GoogleMapReact>
                    </div>
                  ) : (
                    <></>
                  )
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
