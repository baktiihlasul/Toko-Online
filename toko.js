const products = [
    { id: 1, name: 'Laptop', category: 'Elektronik', price: 15000000, stock: 10 },
    { id: 2, name: 'Smartphone', category: 'Elektronik', price: 8000000, stock: 15 },
    { id: 3, name: 'Kipas Angin', category: 'Rumah Tangga', price: 30000, stock: 5 },
    { id: 4, name: 'Kompor Gas', category: 'Rumah Tangga', price: 250000, stock: 8 },
    { id: 5, name: 'Keyboard', category: 'Elektronik', price: 120000, stock: 20 },
  ];

  let cart = [];

  function displayProducts() {
    const tbody = document.querySelector('#product-table tbody');
    tbody.innerHTML = '';
    products.forEach(product => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td>${product.category}</td>
        <td>${product.price}</td>
        <td>${product.stock}</td>
        <td><button onclick="addToCart(${product.id})">Tambah ke Keranjang</button></td>
      `;
      tbody.appendChild(row);
    });
  }

  function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product && product.stock > 0) {
      product.stock -= 1;
      const cartItem = cart.find(item => item.id === productId);
      if (cartItem) {
        cartItem.quantity += 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }
      displayProducts();
      displayCart();
    } else {
      alert('Produk habis!');
    }
  }
  
  function removeFromCart(productId) {
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
      cartItem.quantity -= 1;
      const product = products.find(p => p.id === productId);
      product.stock += 1;
  
      if (cartItem.quantity === 0) {
        cart = cart.filter(item => item.id !== productId);
      }
      displayProducts();
      displayCart();
    }
  }

  function displayCart() {
    const cartItemsDiv = document.getElementById('cart-items');
    const cartSummaryDiv = document.getElementById('cart-summary');
    cartItemsDiv.innerHTML = '';
  
    cart.forEach(item => {
      const cartItemDiv = document.createElement('div');
      cartItemDiv.className = 'cart-item';
      cartItemDiv.innerHTML = `
        ${item.name} - Rp${item.price} x ${item.quantity} 
        <button onclick="removeFromCart(${item.id})">Hapus</button>
      `;
      cartItemsDiv.appendChild(cartItemDiv);
    });
  
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartSummaryDiv.innerHTML = `Total: Rp${total}`;
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    displayCart();
  });
  