window.onload = function viewProducts() {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id");
    const productData = localStorage.getItem(`product-${productId}`);

    const product = JSON.parse(productData);

    document.getElementById("product-image").src = product.image;
    document.getElementById("product-name").textContent = product.name;
    document.getElementById("product-price").textContent = product.price;
    document.getElementById("product-description").textContent = product.description;
};