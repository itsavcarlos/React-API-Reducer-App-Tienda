const estadoInicial = {
    productos: [
        { id: 1, nombre: 'Producto 1' },
        { id: 2, nombre: 'Producto B' },
        { id: 3, nombre: 'Producto 3' },
        { id: 4, nombre: 'Producto 4' }
    ],
    carrito: []
}

// Reducer es una funcion que se va a encargar
// de administrar el estado global de nuestra APP.
const reducer = (estado = estadoInicial, accion) => {
    switch (accion.type) {
        case 'AGREGAR_PRODUCTO_AL_CARRITO':
            const { nombre, idProductoAAgregar } = accion;
            // Si el carrito no tiene producto entonces agregar al carrito.
            if (estado.carrito.length === 0) {
                return {
                    ...estado,
                    carrito: [{ id: idProductoAAgregar, nombre: nombre, cantidad: 1 }]
                }
            } else {
                // De otra forma tenemmos que revisar que el carrito no tenga ya el producto
                // si ya lo tiene entonces queremos actualizar su valor.
                // si no tinen el producto entonces lo agregamos.

                // Para poder editar el arreglo tenemos que clonarlo.
                const nuevoCarrito = [...estado.carrito];

                //Comprobamos si el carrtio ya tiene el ID del producto a agregar.
                // Es una funcion es comprobar si el elemento ya se encuentra en carrito
                const yaEstaEnCarrito = nuevoCarrito.filter((productoDeCarrito) => {
                    return productoDeCarrito.id === idProductoAAgregar
                }).length > 0;

                // Si ya tiene el producto hay que actualizar el carrito.
                if (yaEstaEnCarrito) {
                    // Para Ello tenemos que buscarlo, obtener su posicion en el arreglo
                    // Y en base a su posicion ya actualizar el visualViewport.
                    nuevoCarrito.forEach((productoDeCarrito, index) => {
                        if (productoDeCarrito.id === idProductoAAgregar) {
                            const cantidad = nuevoCarrito[index].cantidad;
                            nuevoCarrito[index] = {
                                id: idProductoAAgregar,
                                nombre: nombre,
                                cantidad: cantidad + 1
                            }
                        }

                    });
                    // De otra forma entonces agrgamos el producto al arreglo.
                } else {
                    nuevoCarrito.push(
                        {
                            id: idProductoAAgregar,
                            nombre: nombre,
                            cantidad: 1
                        }
                    );
                }

                return {
                    ...estado,
                    carrito: nuevoCarrito
                }
            }
        default:
            return estado;
    }
}

export default reducer;