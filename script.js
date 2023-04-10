const cards = document.getElementById('cards')
const templateCard = document.getElementById('template-card')
const fragment = document.createDocumentFragment()
const items = document.getElementById('items')
const footer = document.getElementById('footer')
let carrito = []

document.addEventListener('DOMContentLoaded', () => fetchData())
cards.addEventListener('click', e => { 
       agregarCarrito(e)
    })
items.addEventListener('click', eCarrito => { 
        btnAccion(eCarrito)
     })
  
const fetchData = async () => {
    try {
        const res = await fetch('api.json')
        const data = await res.json()
       // console.log(data)
        pintarCards(data)
        
    } catch (error) {
        console.log(error)
    }    
}
// pintar cards de productos
let template = ""
const pintarCards = data => {
    data.forEach(producto => {
        template += 
        `<div class="col-12 mb-2 col-md-4"> 
            <div class="card">
            <img src=${producto.thumbnailUrl} class="card-img-top" alt="imagen-producto">
            <div class="card-body"><h5>${producto.title}</h5><p>${producto.precio}$</p> <button id=${producto.id} class="btn btn-dark" >Comprar</button>
          </div>
        </div>
      </div>`
    //console.log(producto)
    
    });    
    cards.innerHTML = template
}
// Pintar productos con template

  
  
// const pintarCards = data => {
//     data.forEach(item => {
//         console.log(item)
//         templateCard.querySelector('h5').textContent = item.title
//         templateCard.querySelector('p').textContent = item.precio
//         templateCard.querySelector('button').dataset.id = item.id
//         const clone = templateCard.cloneNode(true)
//         fragment.appendChild(clone)
//     })
//     cards.appendChild(fragment)
// }


function agregarCarrito(e) {
    // console.log(e.target)
    // console.log(e.target.classList.contains('btn-dark'))
    if (e.target.classList.contains('btn-dark')) {
        
        //console.log(e.target.parentElement)
        setearCarrito(e.target.parentElement)

    }
    e.stopPropagation()
}
// function setearCarrito (object){
        
//         const producto = {
//         id: object.querySelector('button').id,
//         title: object.querySelector('h5').textContent,
//         precio: object.querySelector('p').textContent,
//         cantidad: 1
//         }
//         if (carrito.hasOwnProperty(producto.id)){
//             producto.cantidad = carrito[producto.id].cantidad +1
//         }
//         carrito[producto.id] = {...producto}
//         console.log(carrito)
// }


function setearCarrito (object){
    const producto = {
        id: object.querySelector('button').id,
        title: object.querySelector('h5').textContent,
        precio: object.querySelector('p').textContent,
        cantidad: 1
    }

    const index = carrito.findIndex(item => item.id === producto.id);
    if (index >= 0) {
        carrito[index].cantidad += 1;
    } else {
        carrito.push(producto);
    }

    pintarCarrito(carrito)
}

function pintarCarrito(carrito) {
    let temp=""
    carrito.forEach(producto =>{
        temp += `<tr>
        <th scope="row">id ${producto.id}</th>
        <td>${producto.title}</td>
        <td>${producto.cantidad}</td>
        <td>
            <button id= ${producto.id} class="btn btn-info btn-sm">
                +
            </button>
            <button id=${producto.id} class="btn btn-danger btn-sm">
                -
            </button>
        </td>
        <td>$ <span>${parseInt(producto.precio) * producto.cantidad}</span></td>
      </tr>`
    })
    pintarFooter()
    items.innerHTML=temp
}
function pintarFooter() {
    if (carrito.length === 0){
        footer.innerHTML = `<th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>`
        return
    }
    const nCantidad = carrito.reduce((acc,{cantidad})=> acc + cantidad ,0)
    const nPrecio = carrito.reduce((acc,{cantidad,precio})=> acc + cantidad * parseInt(precio) ,0)
    footer.innerHTML = `<th scope="row" colspan="2">Total productos</th>
    <td>${nCantidad}</td>
    <td>
        <button class="btn btn-danger btn-sm" id="vaciar-carrito">
            vaciar todo
        </button>
    </td>
    <td class="font-weight-bold">$ <span>${nPrecio}</span></td>`
    const vaciarBtn = document.getElementById('vaciar-carrito')
    vaciarBtn.addEventListener("click", () =>{
        carrito = []
        pintarCarrito(carrito)
    })
}
// function btnAccion(evento){
//     if ( evento.classList.contains('btn-info') ){
//         const index = carrito.findIndex(item => item.id === producto.id);
//         console.log(index)
//     }
// }

const btnAccion = e => {
    // console.log(e.target.classList.contains('btn-info'))
    if (e.target.classList.contains('btn-info')) {
        const index = carrito.findIndex(item => item.id === e.target.id)
        console.log(index)
        carrito[index].cantidad += 1
        pintarCarrito(carrito)
    }
    else if (e.target.classList.contains('btn-danger')) {
        const index = carrito.findIndex(item => item.id === e.target.id)
        console.log(e.target.id)
        carrito[index].cantidad -= 1
        if (carrito[index].cantidad === 0){
            carrito.splice(index,1)
        }
        pintarCarrito(carrito)
    }
}