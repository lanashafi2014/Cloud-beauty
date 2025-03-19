// Shopping Cart Functionality
document.addEventListener('DOMContentLoaded', function() {
  // Initialize cart from localStorage or create empty cart
  let cart = JSON.parse(localStorage.getItem('cloudBeautyCart')) || [];
  updateCartCount();

  // Add event listeners to all "Add to Cart" buttons
  const addToCartButtons = document.querySelectorAll('.btn');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Get product details from the parent element
      const product = this.closest('.product');
      const productName = product.querySelector('h3').textContent;
      const productPrice = product.querySelector('p').textContent;
      const productImage = product.querySelector('img').src;
      
      // Get selected shade (if applicable)
      let selectedShade = '';
      const shades = product.querySelectorAll('.shade');
      shades.forEach(shade => {
        if(shade.classList.contains('selected')) {
          selectedShade = shade.style.backgroundColor;
        }
      });
      
      // If no shade is selected, default to the first one
      if(!selectedShade && shades.length > 0) {
        selectedShade = shades[0].style.backgroundColor;
      }
      
      // Create product object
      const productItem = {
        name: productName,
        price: productPrice,
        image: productImage,
        shade: selectedShade,
        quantity: 1
      };
      
      // Check if product already exists in cart
      const existingProductIndex = cart.findIndex(item => 
        item.name === productName && item.shade === selectedShade
      );
      
      if(existingProductIndex > -1) {
        // Product exists, increase quantity
        cart[existingProductIndex].quantity += 1;
      } else {
        // Add new product to cart
        cart.push(productItem);
      }
      
      // Save updated cart to localStorage
      localStorage.setItem('cloudBeautyCart', JSON.stringify(cart));
      
      // Update cart count
      updateCartCount();
      
      // Show confirmation message
      showConfirmation(productName);
    });
  });
  
  // Add click event listeners to shade options
  const shadeOptions = document.querySelectorAll('.shade');
  shadeOptions.forEach(shade => {
    shade.addEventListener('click', function() {
      // Remove selected class from all shades in this product
      const shades = this.closest('.shade-options').querySelectorAll('.shade');
      shades.forEach(s => s.classList.remove('selected'));
      
      // Add selected class to clicked shade
      this.classList.add('selected');
      
      // Add visual indicator of selection
      this.style.border = '3px solid #333';
      
      // Reset borders of other shades
      shades.forEach(s => {
        if (!s.classList.contains('selected')) {
          s.style.border = '1px solid #ccc';
        }
      });
    });
  });
  
  // Function to update cart count
  function updateCartCount() {
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
      const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
      
      // Create or update cart count element
      let cartCount = document.querySelector('.cart-count');
      if (!cartCount) {
        cartCount = document.createElement('span');
        cartCount.className = 'cart-count';
        cartIcon.appendChild(cartCount);
      }
      
      cartCount.textContent = totalItems;
      
      // Hide count if zero
      if (totalItems === 0) {
        cartCount.style.display = 'none';
      } else {
        cartCount.style.display = 'inline-block';
      }
    }
  }
  
  // Function to show confirmation when product is added 
  function showConfirmation(productName) {
    // Create confirmation element
    const confirmation = document.createElement('div');
    confirmation.className = 'add-confirmation';
    confirmation.textContent = `${productName} added to cart!`;
    
    // Style the confirmation
    confirmation.style.position = 'fixed';
    confirmation.style.top = '20px';
    confirmation.style.left = '50%';
    confirmation.style.transform = 'translateX(-50%)';
    confirmation.style.backgroundColor = '#5c85d6';
    confirmation.style.color = 'white';
    confirmation.style.padding = '10px 20px';
    confirmation.style.borderRadius = '5px';
    confirmation.style.zIndex = '1000';
    confirmation.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    
    // Add to body
    document.body.appendChild(confirmation);
    
    // Remove after 3 seconds
    setTimeout(() => {
      confirmation.remove();
    }, 3000);
  }
});