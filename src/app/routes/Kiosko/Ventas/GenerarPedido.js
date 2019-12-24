import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import Button from '@material-ui/core/Button';

const validarPedido = props => {
  let noValido = !props.productos || props.total <= 0 || props.total == "NaN";
  return noValido;
};

const createVenta = (props) => {
  // console.log(props.productos);
  const productosInput = props.productos.map((producto) => (
    {
      id: producto.id,
      nombre: producto.nombre,
      precio: Number(producto.precio),
      cantidad: Number(producto.cantidad)
    }));
  const restaProducto = props.productos.map((producto) => (
    {
      id: producto.id,
      nombre: producto.nombre,
      precio: Number(producto.precio),
      existencia: Number(producto.existencia - producto.cantidad),
      descripcion: producto.descripcion
    }));
  console.log(restaProducto);
  // console.log(productosInput);
  const nuevoPedido = {
    pedido: productosInput,
    total: Number(props.total),
    fecha_venta: new Date(),
    vendedor: props.vendedor,
    estado: 'PENDIENTE'
  };
  console.log(restaProducto)

  // console.log(nuevoPedido);
  const { firestore, history } = props;
  // console.log(firestore);
  firestore
    .add({ collection: "ventas" }, nuevoPedido)
    .then((response) => {
      restaProducto && restaProducto.map((producto) => (
        firestore.update({
          collection: 'productos',
          doc: producto.id
        }, producto)
      ));
      // return response;
    })
    .then((response) => {
      console.log("SOY EL RESPONSE")
      console.log(response);
      // history.push("/app/ventas")
    });
}

const GenerarPedido = props => {
  //   console.log(props);
  return (
    <button
      disabled={validarPedido(props)}
      type="submit"
      className="btn btn-warning mt-2"
      onSubmit={(e) => {
        e.preventDefault();
        createVenta(props);
      }}
    >
      Realizar Venta
    </button>
  );
};

export default withRouter(firestoreConnect()(GenerarPedido));
