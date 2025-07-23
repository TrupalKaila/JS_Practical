function saveProduct() {
  const productName = document.getElementById("new-product-name").value;
  const productImageInput = document.getElementById("new-product-image");
  const productPrice = document.getElementById("new-product-price").value;
  const productDesc = document.getElementById("new-product-description").value;
  let productId = parseInt(localStorage.getItem("upcomingProductId")) || 1;

  let file = productImageInput.files[0];

  let reader = new FileReader();

  reader.onload = function () {
    const product = {
      id: productId,
      name: productName,
      price: productPrice,
      description: productDesc,
      image: reader.result // base64 data URL
    };

    localStorage.setItem(`product-${productId}`, JSON.stringify(product));
    localStorage.setItem("upcomingProductId", productId + 1);
    document.getElementById("add-product-form").reset();
    loadProducts(); // Refresh the product list
  };

  reader.readAsDataURL(file); // converts image to base64
}
loadProducts();
function loadProducts() {
  let productList = document.getElementById('product-list');
  productList.innerHTML = "";

  if ((localStorage.length === 0) || (localStorage.length === 1)) {
    productList.innerHTML = '<h5>No products is listed yet!</h5>';
    return;
  }

  const lastId = parseInt(localStorage.getItem("upcomingProductId")) || 0;
  for (let i = 1; i <= lastId; i++) {
    const item = localStorage.getItem(`product-${i}`);
    if (item) {
      const product = JSON.parse(item);

      const card = document.createElement("div");
      card.style.width = "14rem";

      card.innerHTML = `
        <img src="${product.image || '../images/default.jpeg'}" class="card-img-top card me-5" alt="${product.name}">
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text">Price: ${product.price}</p>
          <p class="card-text">Description: ${product.description}</p>
          <div class="flex-wrap">
          <a href="#" class="btn btn-primary" onclick="editProduct(${product.id})">Edit</a>
          <a href="#" class="btn btn-danger" onclick="deleteProduct(${product.id})">Delete</a>
          </div>  
        </div>`;
      productList.append(card);
    };
  }
}


function editProduct(id) {
  showPage('editproducts');

  const item = localStorage.getItem(`product-${id}`);

  const product = JSON.parse(item);

  // Fill the edit form with existing values
  document.getElementById("edit-product-name").value = product.name;
  document.getElementById("edit-product-price").value = product.price;
  document.getElementById("edit-product-description").value = product.description;

  // Used to preview the image in input form
  // const preview = document.getElementById("edit-product-preview");
  // if (preview) {
  //   preview.src = product.image;
  //   preview.style.display = "block";
  // }
  // Store the current product ID temporarily for updating later
  localStorage.setItem("editingProductId", id);
}

function saveEditedProduct() {
  const productId = localStorage.getItem("editingProductId");

  const name = document.getElementById("edit-product-name").value;
  const price = document.getElementById("edit-product-price").value;
  const desc = document.getElementById("edit-product-description").value;
  const imageInput = document.getElementById("edit-product-image");
  const existingProduct = JSON.parse(localStorage.getItem(`product-${productId}`));

  const file = imageInput.files[0];

  // If new image is uploaded, update it using FileReader
  if (file) {
    const reader = new FileReader();
    reader.onload = function () {
      const updatedProduct = {
        id: parseInt(productId),
        name,
        price: "&#8377;" + price,
        description: desc,
        image: reader.result // updated base64 image
      };

      localStorage.setItem(`product-${productId}`, JSON.stringify(updatedProduct));
      document.getElementById("edit-product-form").reset();
      loadProducts();
      alert("Product updated successfully!");
    };
    reader.readAsDataURL(file);
  } else {
    // No new image; keep the existing one
    const updatedProduct = {
      id: parseInt(productId),
      name,
      price: "&#8377;" + price,
      description: desc,
      image: existingProduct.image
    };

    localStorage.setItem(`product-${productId}`, JSON.stringify(updatedProduct));
    document.getElementById("edit-product-form").reset();
    loadProducts();
    // alert("Product updated successfully!");
  }
}

function deleteProduct(id) {
  const item = localStorage.getItem(`product-${id}`);
  localStorage.removeItem(`product-${id}`);
  location.reload();
}

function getAllProducts() {
  const allProducts = [];
  const lastId = parseInt(localStorage.getItem("upcomingProductId")) || 0;

  for (let i = 1; i <= lastId; i++) {
    const item = localStorage.getItem(`product-${i}`);
    if (item) {
      const product = JSON.parse(item);
      allProducts.push(product);
    }
  }
  return allProducts;
}

function sortById() {
  const items = getAllProducts();
  items.sort((a, b) => a.id - b.id)
  return items;
}

function sortByName() {
  const items = getAllProducts();
  items.sort((a, b) => a.name.localeCompare(b.name));
  return items;
}

function sortByPrice() {
  const items = getAllProducts();
  items.sort((a, b) => a.price - b.price)
  return items;
}

document.getElementById("sortById").addEventListener('click', function () {
  const items = sortById();
  let productList = document.getElementById('product-list');
  productList.innerHTML = "";
  for (let i = 1; i <= items.length; i++) {
    const product = items[i - 1];
    const card = document.createElement("div");
    card.style.width = "14rem";
    card.innerHTML = `
        <img src="${product.image || '../images/default.jpeg'}" class="card-img-top card me-5" alt="${product.name}">
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text">Price: ${product.price}</p>
          <p class="card-text">Description: ${product.description}</p>
          <div class="flex-wrap">
          <a href="#" class="btn btn-primary" onclick="editProduct(${product.id})">Edit</a>
          <a href="#" class="btn btn-danger" onclick="deleteProduct(${product.id})">Delete</a>
          </div>  
        </div>`;
    productList.append(card);
  };
})


document.getElementById("sortByName").addEventListener('click', function () {
  const items = sortByName();
  let productList = document.getElementById('product-list');
  productList.innerHTML = "";
  for (let i = 1; i <= items.length; i++) {
    const product = items[i - 1];
    const card = document.createElement("div");
    card.style.width = "14rem";
    card.innerHTML = `
        <img src="${product.image || '../images/default.jpeg'}" class="card-img-top card me-5" alt="${product.name}">
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text">Price: ${product.price}</p>
          <p class="card-text">Description: ${product.description}</p>
          <div class="flex-wrap">
          <a href="#" class="btn btn-primary" onclick="editProduct(${product.id})">Edit</a>
          <a href="#" class="btn btn-danger" onclick="deleteProduct(${product.id})">Delete</a>
          </div>  
        </div>`;
    productList.append(card);
  };
})


document.getElementById("sortByPrice").addEventListener('click', function () {
  const items = sortByPrice();
  let productList = document.getElementById('product-list');
  productList.innerHTML = "";
  for (let i = 1; i <= items.length; i++) {
    const product = items[i - 1];
    const card = document.createElement("div");
    card.style.width = "14rem";
    card.innerHTML = `
        <img src="${product.image || '../images/default.jpeg'}" class="card-img-top card me-5" alt="${product.name}">
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text">Price: ${product.price}</p>
          <p class="card-text">Description: ${product.description}</p>
          <div class="flex-wrap">
          <a href="#" class="btn btn-primary" onclick="editProduct(${product.id})">Edit</a>
          <a href="#" class="btn btn-danger" onclick="deleteProduct(${product.id})">Delete</a>
          </div>  
        </div>`;
    productList.append(card);
  };
})


document.getElementById("filterById").addEventListener('click', function () {
  const items = getAllProducts();
  const searchItem = document.getElementById("searchitem").value.trim();
  const filtered = items.filter(item => item.id === parseInt(searchItem));
  const product = filtered[0];

  let productList = document.getElementById('product-list');
  productList.innerHTML = "";

  if (product) {
    const card = document.createElement("div");
    card.style.width = "14rem";
    card.innerHTML = `
        <img src="${product.image || '../images/default.jpeg'}" class="card-img-top card me-5" alt="${product.name}">
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text">Price: ${product.price}</p>
          <p class="card-text">Description: ${product.description}</p>
          <div class="flex-wrap">
            <a href="#" class="btn btn-primary" onclick="editProduct(${product.id})">Edit</a>
            <a href="#" class="btn btn-danger" onclick="deleteProduct(${product.id})">Delete</a>
          </div>  
        </div>`;
    productList.append(card);
  } else {
    productList.innerHTML = `<h5>No product found with ID ${searchItem}</h5>`;
  }
});
