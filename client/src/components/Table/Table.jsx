import { useEffect, useState } from "react";

//Style
import "./style.scss";

//Assets
//@ts-ignore
import TrashIcon from "../../assets/img/trash.svg";

const Table = ({ headers, data, actions }) => {
  return (
    <div className="table-container">
      <div className="table">
        <table>
          <thead>
            <tr>
              {headers.length !== 0 &&
                headers.map((head, i) => <th key={i}>{head}</th>)}
              {actions && <th>الإجراء</th>}
            </tr>
          </thead>
          <tbody>
            {data &&
              data.length !== 0 &&
              data.map((inputs, i) => (
                <tr key={i}>
                  {inputs.map((input) => (
                    <td>
                      {input && input.type == "img" ? (
                        <img src={input.src} className="main-img" />
                      ) : (
                        input
                      )}
                    </td>
                  ))}
                  {actions && (
                    <td className="action">
                      {actions.edit && (
                        <button
                          onClick={() => actions.edit(inputs[0])}
                          className="btn-edit"
                        >
                          تعديل
                        </button>
                      )}
                      {actions.delete && (
                        <img
                          onClick={() => actions.delete(inputs[0])}
                          src={TrashIcon}
                          alt="حذف"
                          title="حذف"
                        />
                      )}
                    </td>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="pagination" data-update-function="searchForUsers"></div>
    </div>
  );
};

export default Table;
