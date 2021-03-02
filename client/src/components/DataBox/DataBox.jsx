import { useEffect, useRef } from "react";

//Style
import "./style.scss";

const DataBox = ({ options, inputs, visible, setVisible }) => {
  const dataBoxRef = useRef(null);

  useEffect(() => {
    window.addEventListener("mouseup", containerHandler);
  }, []);

  const containerHandler = (e) => {
    e.preventDefault();

    if (dataBoxRef.current && !dataBoxRef.current.contains(e.target)) {
      setVisible(false);
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
                    <div className="input-item">
                      {input.label && <label>{input.label}</label>}

                      <input {...input.props} />
                    </div>
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
