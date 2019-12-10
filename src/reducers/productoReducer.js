const initState = {
    productos: [
        {nombre: "Tasa", precio: "4.25", existencia: 45, descripcion: "Es una tasa"}
    ]
};

const productoReducer = (state = initState, action) => {
    switch(action.type) {
        case 'CREATE_PRODUCTO':
            console.log('Producto action: ', action.producto)
    }
    return state;
}

export default productoReducer;