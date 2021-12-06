import '../scss/app.scss'
import axios from 'axios'
const addToCart = document.getElementsByClassName('add-to-cart');
const cartCounter = document.getElementById('cartCounter')
const notification = document.getElementById('notification')

const showNofification = () => {
    notification.innerHTML = `<p class="text-white font-bold">Item added to cart</p>`
    notification.classList.replace('hidden', 'block')
    setTimeout(() => {
        notification.classList.replace('block', 'hidden')
    }, 3000)
}

const updateCart = pizza => {
    axios.post('/update-cart', pizza)
        .then(res => {
            showNofification()
            cartCounter.innerText = res.data.totalQty
        })
        .catch(err => {
            console.log(err)
        })
}

[...addToCart].forEach(btn => {
    btn.addEventListener('click', e => {
        const pizza = JSON.parse(btn.dataset.pizza)
        updateCart(pizza)
    })
})
