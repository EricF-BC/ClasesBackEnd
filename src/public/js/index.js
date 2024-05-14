const socketClient = io()

socketClient.on('saludosDesdeBack', (message) =>{
    console.log(message);

    socketClient.emit('respuestaDesdeFront', 'Muchas Gracias')
})


const form = document.getElementById('form')
const inputTitle = document.getElementById('title')
const inputPrice = document.getElementById('price')
const products = document.getElementById('products')

form.onsubmit = (e) =>{
    e.preventDefault();
    const title = inputTitle.value;
    const price = inputPrice.value;
    const product = {
        title,
        price,
        description: "descriptionEjemplo"
    };
    socketClient.emit('newProduct', product);
    
}

// socketClient.on('products', (arrayProducts) =>{
//     let infoProducts = '';
//     arrayProducts.map((prod) =>{
//         infoProducts += `${prod.name} - $${prod.price} <br>` 
//     })
//     products.innerHTML = infoProducts;
// })

socketClient.on('products', (arrayProducts) => {
    let infoProducts = '';
    arrayProducts.forEach((prod) => {
        infoProducts += `<li>${prod.title} - $${prod.price}</li>`;
    });
    products.innerHTML = infoProducts;
});
