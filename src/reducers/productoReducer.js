const initState = {
    productos: [
        {nombre: "Tasa", precio: "4.25", existencia: 45, descripcion: "Es una tasa"}
    ]
};

const productoReducer = (state = initState, action) => {
    return state;
}

export default productoReducer;