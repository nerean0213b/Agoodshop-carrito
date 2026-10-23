class Carrito {
    constructor(productos, moneda) {
        this.productos = productos;
        this.moneda = moneda;
        for (const producto of productos) {
            producto.price = Number(producto.price);
            producto.quantity = 0;
            producto.subtotal = 0;
        }
    }
    //Actualizar unidades de un producto
    actualizarUnidades(sku, unidades){
    const producto= this.productos.find(producto => producto.SKU === sku);
    if (!producto) return;
    producto.quantity = Math.max(0, unidades);
    producto.subtotal = Number((producto.price * producto.quantity).toFixed(2));
    }

    //Obtener información de un producto:
    obtenerInformacionProducto(sku){
        const producto = this.productos.find(producto => producto.SKU === sku);
        if (!producto) return null;
        return producto;
    }

    //Obtener carrito:
    obtenerCarrito(){
        const products = this.productos.filter(producto => producto.quantity > 0);
        let total = 0;
        for (const producto of products) {
            total += producto.subtotal;
        }
        return { products, total: Number(total.toFixed(2)), currency: this.moneda };
    }
}
/*
//Prueba:
const prueba = new Carrito(
[
    { SKU: "ATGD5XORY1L", title: "Cargador", price:"49.99" }]
, "€");
console.log(prueba.productos);



//Prueba de actualizar unidades:
prueba.actualizarUnidades("ATGD5XORY1L", 8);
console.log(prueba.productos[0].quantity, prueba.productos[0].subtotal); 

prueba.actualizarUnidades("ATGD5XORY1L", -3);
console.log(prueba.productos[0].quantity, prueba.productos[0].subtotal);

//Prueba de obtener información de un producto:
console.log(prueba.obtenerInformacionProducto("ATGD5XORY1L"));
console.log(prueba.obtenerInformacionProducto("Inventado"));

//Prueba de obtener carrito:
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
*/

//DOM:

const URL_API = "api.php";
let carrito;
const estado = document.querySelector("#estado");
const tabla = document.querySelector("#productos");
const resumen= document.querySelector("#resumen");
const total= document.querySelector("#total");

//Dinero:
function dinero (numero){
    return numero.toFixed(2) + " " + carrito.moneda;
}

//Mostrar:
function mostrar(){
    tabla.replaceChildren();
    for(const producto of carrito.productos){
        const fila = document.createElement("tr");
        fila.innerHTML=`
            <td><strong></strong><small></small></td>
            <td class="cantidad">
                <button type="button" class="menos">−</button>
                <input type="text" readonly>
                <button type="button" class="mas">+</button>
            </td>
            <td class="precio"></td>
            <td class="subtotal"></td>
        `;
        fila.querySelector("strong").textContent = producto.title;
        fila.querySelector("small").textContent = "REF: " + producto.SKU;
        fila.querySelector(".precio").textContent = dinero(producto.price);
        fila.querySelector(".subtotal").textContent = dinero(producto.subtotal);
        fila.querySelector("input").value = producto.quantity;
        fila.querySelector(".menos").onclick = () => cambiar(producto.SKU, -1);
        fila.querySelector(".mas").onclick = () => cambiar(producto.SKU, 1);
    tabla.append(fila);

    }

    const datos= carrito.obtenerCarrito();
    resumen.replaceChildren();
    for(const producto of datos.products){
    const li = document.createElement("li");
    li.textContent = `${producto.quantity} × ${producto.title}: ${dinero(producto.subtotal)}`;
    resumen.append(li);
    }
    total.textContent=dinero(datos.total);
}

//Cambiar:

function cambiar(sku, cambio){
    const producto = carrito.obtenerInformacionProducto(sku)
    carrito.actualizarUnidades(sku, producto.quantity + cambio);
  mostrar();
}

//Iniciar:
async function iniciar() {
    try {
        const response = await fetch(URL_API);
        if (!response.ok) throw new Error("Error al obtener los productos");
        const datos = await response.json();
        carrito = new Carrito(datos.products, datos.currency);
        estado.textContent="Productos cargados correctamente";
        mostrar();
    } catch (error) {
        estado.textContent = "Error al cargar los productos: " + error.message;
    }
}

iniciar();
