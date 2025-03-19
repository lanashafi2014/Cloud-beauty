document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    function updateCartDisplay() {
        const cartContainer = document.getElementById("cart-items");
        const cartTotal = document.getElementById("cart-total");

        if (!cartContainer || !cartTotal) return;

        cartContainer.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            total += item.price * item.quantity;
            cartContainer.innerHTML += `
                <div class="cart-item">
                    <span>${item.name} - $${item.price} x ${item.quantity}</span>
                    <button class="remove" data-index="${index}">Remove</button>
                </div>
            `;
        });

        cartTotal.textContent = `Total: $${total.toFixed(2)}`;

        document.querySelectorAll(".remove").forEach(button => {
            button.addEventListener("click", function () {
                const index = this.getAttribute("data-index");
                cart.splice(index, 1);
                saveCart();
                updateCartDisplay();
            });
        });
    }

    function addToCart(name, price) {
        let item = cart.find(i => i.name === name);
        if (item) {
            item.quantity++;
        } else {
            cart.push({ name, price, quantity: 1 });
        }
        saveCart();
        updateCartDisplay();
    }

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            const name = this.getAttribute("data-name");
            const price = parseFloat(this.getAttribute("data-price"));
            addToCart(name, price);
        });
    });

    updateCartDisplay();
});
