// Menu Items Data
const menuItems = [
    // Coffees
    {
        id: 1,
        name: "Espresso",
        category: "coffees",
        price: 150,
        description: "Strong and bold single shot of espresso",
        image: "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=500&h=400&fit=crop"
    },
    {
        id: 2,
        name: "Cappuccino",
        category: "coffees",
        price: 200,
        description: "Creamy cappuccino with velvety foam",
        image: "https://images.unsplash.com/photo-1572442691411-fd4a76ff6e0f?w=500&h=400&fit=crop"
    },
    {
        id: 3,
        name: "Latte",
        category: "coffees",
        price: 220,
        description: "Smooth latte with steamed milk",
        image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&h=400&fit=crop"
    },
    {
        id: 4,
        name: "Americano",
        category: "coffees",
        price: 180,
        description: "Classic americano with hot water",
        image: "https://images.unsplash.com/photo-1559056169-641ef2588b70?w=500&h=400&fit=crop"
    },
    {
        id: 5,
        name: "Macchiato",
        category: "coffees",
        price: 190,
        description: "Bold espresso marked with a touch of foam",
        image: "https://images.unsplash.com/photo-1517668808822-9ebb02ae2a0e?w=500&h=400&fit=crop"
    },

    // Snacks
    {
        id: 6,
        name: "Croissant",
        category: "snacks",
        price: 180,
        description: "Buttery and flaky French croissant",
        image: "https://images.unsplash.com/photo-1585080199000-c9fcceb89180?w=500&h=400&fit=crop"
    },
    {
        id: 7,
        name: "Chocolate Chip Cookie",
        category: "snacks",
        price: 120,
        description: "Chewy chocolate chip cookie",
        image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=500&h=400&fit=crop"
    },
    {
        id: 8,
        name: "Blueberry Muffin",
        category: "snacks",
        price: 200,
        description: "Fresh blueberry muffin with sweet glaze",
        image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=500&h=400&fit=crop"
    },
    {
        id: 9,
        name: "Almond Biscotti",
        category: "snacks",
        price: 150,
        description: "Crunchy almond biscotti perfect for dipping",
        image: "https://images.unsplash.com/photo-1548365328-c9403f173fbf?w=500&h=400&fit=crop"
    },
    {
        id: 10,
        name: "Scone with Jam",
        category: "snacks",
        price: 220,
        description: "Soft scone served with clotted cream and jam",
        image: "https://images.unsplash.com/photo-1599599810694-b3fa3a51b5a5?w=500&h=400&fit=crop"
    },

    // Meals
    {
        id: 11,
        name: "Caesar Salad",
        category: "meals",
        price: 450,
        description: "Fresh romaine lettuce with parmesan and croutons",
        image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500&h=400&fit=crop"
    },
    {
        id: 12,
        name: "Grilled Chicken Sandwich",
        category: "meals",
        price: 580,
        description: "Juicy grilled chicken with fresh vegetables",
        image: "https://images.unsplash.com/photo-1562547256-a9a87cbf6e7e?w=500&h=400&fit=crop"
    },
    {
        id: 13,
        name: "Pasta Carbonara",
        category: "meals",
        price: 680,
        description: "Classic Italian pasta with creamy sauce",
        image: "https://images.unsplash.com/photo-1612874742237-415c69f18133?w=500&h=400&fit=crop"
    },
    {
        id: 14,
        name: "Beef Burger",
        category: "meals",
        price: 620,
        description: "Premium beef burger with all the toppings",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=400&fit=crop"
    },
    {
        id: 15,
        name: "Fish & Chips",
        category: "meals",
        price: 540,
        description: "Crispy fish with golden chips and tartar sauce",
        image: "https://images.unsplash.com/photo-1612231066579-3c83e8e9e3e7?w=500&h=400&fit=crop"
    }
];

// State Management
let cart = [];
let currentCategory = "all";

// DOM Elements
const menuGrid = document.getElementById("menuGrid");
const categoryBtns = document.querySelectorAll(".category-btn");
const cartBtn = document.getElementById("cartBtn");
const cartSidebar = document.getElementById("cartSidebar");
const overlay = document.getElementById("overlay");
const closeCartBtn = document.getElementById("closeCart");
const cartItemsContainer = document.getElementById("cartItems");
const cartCountElement = document.getElementById("cartCount");
const subtotalElement = document.getElementById("subtotal");
const taxElement = document.getElementById("tax");
const totalElement = document.getElementById("total");
const modal = document.getElementById("itemModal");
const modalClose = document.getElementById("modalClose");
const itemModalImage = document.getElementById("modalImage");
const itemModalTitle = document.getElementById("modalTitle");
const itemModalCategory = document.getElementById("modalCategory");
const itemModalDescription = document.getElementById("modalDescription");
const itemModalPrice = document.getElementById("modalPrice");
const qtyInput = document.getElementById("qtyInput");
const increaseQtyBtn = document.getElementById("increaseQty");
const decreaseQtyBtn = document.getElementById("decreaseQty");
const addToCartBtn = document.getElementById("addToCartBtn");

let selectedItem = null;

// Currency Symbol
const CURRENCY_SYMBOL = "₹";

// Initialize
document.addEventListener("DOMContentLoaded", () => {
    renderMenuItems();
    setupEventListeners();
    loadCartFromStorage();
});

// Render Menu Items
function renderMenuItems() {
    const filteredItems = currentCategory === "all" 
        ? menuItems 
        : menuItems.filter(item => item.category === currentCategory);

    menuGrid.innerHTML = filteredItems.map(item => `
        <div class="menu-item" onclick="openItemModal(${item.id})">
            <img src="${item.image}" alt="${item.name}" class="item-image" onerror="this.src='https://via.placeholder.com/500x400?text=${item.name}'">
            <div class="item-content">
                <span class="item-category">${item.category}</span>
                <h3 class="item-name">${item.name}</h3>
                <p class="item-description">${item.description}</p>
                <div class="item-footer">
                    <span class="item-price">${CURRENCY_SYMBOL}${item.price}</span>
                    <button class="quick-add-btn" onclick="addToCartQuick(event, ${item.id})">+ Add</button>
                </div>
            </div>
        </div>
    `).join("");
}

// Setup Event Listeners
function setupEventListeners() {
    // Category Filter
    categoryBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            categoryBtns.forEach(b => b.classList.remove("active"));
            e.target.classList.add("active");
            currentCategory = e.target.dataset.category;
            renderMenuItems();
        });
    });

    // Cart Sidebar
    cartBtn.addEventListener("click", openCart);
    closeCartBtn.addEventListener("click", closeCart);
    overlay.addEventListener("click", closeCart);

    // Modal
    modalClose.addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
    });

    // Quantity Selector in Modal
    increaseQtyBtn.addEventListener("click", () => {
        qtyInput.value = parseInt(qtyInput.value) + 1;
    });

    decreaseQtyBtn.addEventListener("click", () => {
        if (parseInt(qtyInput.value) > 1) {
            qtyInput.value = parseInt(qtyInput.value) - 1;
        }
    });

    addToCartBtn.addEventListener("click", addSelectedItemToCart);
}

// Open Item Modal
function openItemModal(itemId) {
    selectedItem = menuItems.find(item => item.id === itemId);
    if (!selectedItem) return;

    itemModalImage.src = selectedItem.image;
    itemModalTitle.textContent = selectedItem.name;
    itemModalCategory.textContent = selectedItem.category;
    itemModalDescription.textContent = selectedItem.description;
    itemModalPrice.textContent = `${CURRENCY_SYMBOL}${selectedItem.price}`;
    qtyInput.value = 1;

    modal.classList.add("show");
    document.body.style.overflow = "hidden";
}

// Close Modal
function closeModal() {
    modal.classList.remove("show");
    document.body.style.overflow = "auto";
    selectedItem = null;
}

// Add Item to Cart from Modal
function addSelectedItemToCart() {
    if (!selectedItem) return;

    const quantity = parseInt(qtyInput.value);
    addItemToCart(selectedItem.id, quantity);
    closeModal();
}

// Quick Add to Cart
function addToCartQuick(event, itemId) {
    event.stopPropagation();
    addItemToCart(itemId, 1);
    showNotification("Added to cart!");
}

// Add Item to Cart
function addItemToCart(itemId, quantity) {
    const item = menuItems.find(i => i.id === itemId);
    if (!item) return;

    const existingCartItem = cart.find(cartItem => cartItem.id === itemId);

    if (existingCartItem) {
        existingCartItem.quantity += quantity;
    } else {
        cart.push({
            ...item,
            quantity: quantity
        });
    }

    saveCartToStorage();
    updateCart();
}

// Update Cart Display
function updateCart() {
    cartCountElement.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    renderCartItems();
    updateCartSummary();
}

// Render Cart Items
function renderCartItems() {
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        return;
    }

    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image" onerror="this.src='https://via.placeholder.com/80?text=${item.name}'">
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">${CURRENCY_SYMBOL}${item.price}</div>
                <div class="cart-item-controls">
                    <button class="cart-qty-btn" onclick="updateItemQuantity(${item.id}, -1)">−</button>
                    <span class="cart-qty">${item.quantity}</span>
                    <button class="cart-qty-btn" onclick="updateItemQuantity(${item.id}, 1)">+</button>
                    <button class="cart-remove-btn" onclick="removeFromCart(${item.id})">🗑️</button>
                </div>
            </div>
        </div>
    `).join("");
}

// Update Item Quantity
function updateItemQuantity(itemId, change) {
    const cartItem = cart.find(item => item.id === itemId);
    if (!cartItem) return;

    cartItem.quantity += change;

    if (cartItem.quantity <= 0) {
        removeFromCart(itemId);
    } else {
        saveCartToStorage();
        updateCart();
    }
}

// Remove from Cart
function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    saveCartToStorage();
    updateCart();
    showNotification("Item removed from cart");
}

// Update Cart Summary
function updateCartSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.10;
    const total = subtotal + tax;

    subtotalElement.textContent = `${CURRENCY_SYMBOL}${subtotal.toFixed(2)}`;
    taxElement.textContent = `${CURRENCY_SYMBOL}${tax.toFixed(2)}`;
    totalElement.textContent = `${CURRENCY_SYMBOL}${total.toFixed(2)}`;
}

// Open Cart Sidebar
function openCart() {
    cartSidebar.classList.add("open");
    overlay.classList.add("show");
    document.body.style.overflow = "hidden";
}

// Close Cart Sidebar
function closeCart() {
    cartSidebar.classList.remove("open");
    overlay.classList.remove("show");
    document.body.style.overflow = "auto";
}

// Save Cart to Local Storage
function saveCartToStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Load Cart from Local Storage
function loadCartFromStorage() {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }
}

// Show Notification
function showNotification(message) {
    const notification = document.createElement("div");
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #8b5a3c 0%, #d4a574 100%);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        animation: slideDown 0.3s ease;
        font-weight: 600;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = "slideUp 0.3s ease";
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Add slideDown animation
const style = document.createElement("style");
style.textContent = `
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes slideUp {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-20px);
        }
    }
`;
document.head.appendChild(style);
