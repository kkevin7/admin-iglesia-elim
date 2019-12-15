import React from "react";
import { withRouter } from "react-router-dom";

const validarPedido = props => {
  let noValido = !props.productos || props.total <= 0 || props.total =="NaN";
  return noValido;
};

const GenerarPedido = props => {
//   console.log(props);
  return (
    <button
      disabled={validarPedido(props)}
      type="button"
      className="btn btn-warning mt-2"
      onClick={e => {
        // console.log(props.productos);
        const productosInput = props.productos.map(
          ({ nombre, precio, existencia, ...objeto }) => objeto
        );
        console.log(productosInput);
        const nuevoPedido = {
          pedido: productosInput,
          total: Number(props.total)
        };
      }}
    >
      GeneraPedido
    </button>
  );
};

export default withRouter(GenerarPedido);
