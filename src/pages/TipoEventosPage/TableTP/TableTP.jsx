import React from "react";
import "./TableTP.css";

import editPen from "../../../assets/images/edit-pen.svg";
import trashDelete from "../../../assets/images/trash-delete.svg";

const TableTP = ({ dados, fnDelete = null, fnUpdate = null }) => {
  return (
    <table className="table-data">
      {/* cabeçalho */}
      <thead className="table-data__head">
        <tr className="table-data__head-row">
          <th className="table-data__head-title table-data__head-title--big">
            Título
          </th>
          <th className="table-data__head-title table-data__head-title--little">
            Editar
          </th>
          <th className="table-data__head-title table-data__head-title--little">
            Deletar
          </th>
        </tr>
      </thead>

      {/* corpo */}
      <tbody>
        {dados.map((tp) => {
          return (
            <tr className="table-data__head-row" key={tp.idTipodeEvento}>
              <td className="table-data__data table-data__data--big">
                {tp.titulo}
              </td>

              <td className="table-data__data table-data__data--little">
                <img className="table-data__icon" src={editPen} alt=""
                onClick={() => {
                  fnUpdate(tp.idTipoEvento)
                }} />
              </td>

              <td className="table-data__data table-data__data--little">
              <img 
                    className="table-data__icon" 
                    src={trashDelete} 
                    onClick={(e) => {
                        fnDelete(tp.idTipoEvento)
                    }}
                    alt="" 
                    />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableTP;
