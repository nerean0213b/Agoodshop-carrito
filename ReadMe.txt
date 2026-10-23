1.Constructor:
    Recibe los productos, que viene de la api creada, y la moneda; los precios los 
    transforma de texto a número, le pone el "quantity" a 0, ya que al comienzo no 
    está seleccionado nada.

2.Prueba:
    Se comprueba que el constructor puede convertir el precio de texto a número y que la cantidad
    es 0.
    Resultado de la prueba: 
    [
        {
            SKU: 'ATGD5XORY1L',
            title: 'Cargador',
            price: 49.99,
            quantity: 0,
            subtotal: 0
        }
    ]
3.Actualizar las unidades:
    Recibe el sku y el número de unidades que se quieren de ese producto concreto.
    Por medio del "find" se busca el producto, si existe se guardan las unidades en "quantity"
    y con "Math.max(0,unidades)" se consigue que nunca puedan ser negativas. A continuación, se calcula el 
    subtotal y se redondea a 2 decimales.

4.Prueba de actualizar unidades:
    Se realizan dos pruebas, una para comprobar que cambian las unidades del producto y el subtotal es calculado,
    y la otra para comrpobar que no se permiten cantidades negativas:

    prueba.actualizarUnidades("ATGD5XORY1L", 8);
    console.log(prueba.productos[0].quantity, prueba.productos[0].subtotal); 
    Resultado: 8 399.92
    prueba.actualizarUnidades("ATGD5XORY1L", -3);
    console.log(prueba.productos[0].quantity, prueba.productos[0].subtotal);
    Resultado: 0 0

5.Obtener información del producto:
    Recibe el sku y devuelve todos los datos. 
    La función busca el producto mediante "Find" y lo guarda en la variable "producto" y si no existe ese SKU 
    devulve null.

6.Pruebas de información del producto:
    console.log(prueba.obtenerInformacionProducto("ATGD5XORY1L"));
    Resultado:
    {
    SKU: 'ATGD5XORY1L',
    title: 'Cargador',
    price: 49.99,
    quantity: 0,
    subtotal: 0
    }
    console.log(prueba.obtenerInformacionProducto("Inventado"));
    Resultado:null

7.Obtener carrito:
    Devuelve lo que hay en el carrito: los productos seleccionados, el total y la moneda.
    Por medio de "filter" solo selecciona los productos con unidades mayores que 0 
    y, después, va sumando los subtotales de cada producto.

8.Prueba de obtener carrito:
    Se crean dos productos, los actualizo y pruebo la función hecha con anterioridad.
        const prueba2 = new Carrito(
            [
                { SKU: "ATGD5XORY1L", title: "Cargador", price:"49.99" },
                { SKU: "AWIEJHFEWD5", title: "Cascos bluetooth", price:"68.99" }
            ],
            "€"
        );
        prueba2.actualizarUnidades("ATGD5XORY1L", 3);
        prueba2.actualizarUnidades("AWIEJHFEWD5", 2);
        console.log(prueba2.obtenerCarrito());
        Resultado:
        {
            products: [
            {
            SKU: 'ATGD5XORY1L',
            title: 'Cargador',
            price: 49.99,
            quantity: 3,
            subtotal: 149.97
            },
            {
            SKU: 'AWIEJHFEWD5',
            title: 'Cascos bluetooth',
            price: 68.99,
            quantity: 2,
            subtotal: 137.98
            }
        ],
        total: 287.95,
        currency: '€'
        }

9.Iniciar:
    Los productos provienen de "api.php", la función iniciar pide los datos de los productos mediante "fetch" y
    se crea el carrito con esos productos.
    Si falla se muestra un mensaje de error.

10.Mostrar:
    Nos proporciona la tabla con los productos, el resumen y el total.
    Los productos poseen un botón +/- .
11.Cambiar:
    Nos permite añadir o quitar unidades del producto pulsando los botones +/- y 
    llama otra vez a la función mostrar para actualizar la pantalla con los nuevos datos.

12.Prueba:
- Inicio: cinco productos, todas las cantidades a 0, total 0.00 €.
- Quitar unidades en 0: se mantiene en 0.
- Añadir un cristal templado: total 25.99 €.
- 1 teléfono, 1 cargador, 2 fundas, 5 cristales templados y 2 cascos bluetooth: total 633.89 €.
- Volver todo a 0: el resumen vuelve a estar vacío.
