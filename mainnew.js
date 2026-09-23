let Products = []

// Form and Input Elements
const productsForm = document.getElementById('productsForm')
const productID = document.getElementById('productID')
const productName = document.getElementById('productName')
const SelectCategory = document.getElementById('SelectCategory')
const price = document.getElementById('price')
const Quantity = document.getElementById('Quantity')
const tableBody = document.getElementById('tableBody')
const editStatus = document.getElementById('editStatus')
const addProductBtn = document.getElementById('addProduct')

// New: Search and Filter Elements
const searchProduct = document.getElementById('searchProduct')
const filtterCategory = document.getElementById('filtterCategory')

// Load data on page start
if (sessionStorage.getItem('Products')) {
    Products = JSON.parse(sessionStorage.getItem('Products'))
    displayProductList()
}

// 1. Listen for typing in the Search and Filter boxes
searchProduct.addEventListener('input', displayProductList)
filtterCategory.addEventListener('input', displayProductList)

// Getting data from the form (Add / Edit Logic)
productsForm.addEventListener('submit', (event) => {
    event.preventDefault()
    
    const ProductIDInput = productID.value
    const productNameInput = productName.value
    const productCategoryInput = SelectCategory.value
    const priceInput = price.value
    const QuantityInput = Quantity.value
    
    if (ProductIDInput && productNameInput && productCategoryInput && priceInput && QuantityInput) {
        const editindex = editStatus.value
        
        if (editindex === "") {
            // Add New Product
            Products.push({
                productID: ProductIDInput,
                productName: productNameInput,
                SelectCategory: productCategoryInput,
                price: priceInput,
                Quantity: QuantityInput
            })
        } else {
            // Edit Existing Product
            Products[editindex] = {
                productID: ProductIDInput,
                productName: productNameInput,
                SelectCategory: productCategoryInput,
                price: priceInput,
                Quantity: QuantityInput
            }
            editStatus.value = ""
            addProductBtn.innerText = "Add Product"
        }

        sessionStorage.setItem('Products', JSON.stringify(Products))
        displayProductList()
        
        // Reset form inputs (excluding search/filter boxes)
        productID.value = ""
        productName.value = ""
        SelectCategory.value = "Dress" // Reset to first option
        price.value = ""
        Quantity.value = ""
        
    } else {
        alert('Please fill the form completely')
    }
})

// Display products (Now with Search & Filter logic integrated)
function displayProductList() {
    tableBody.innerHTML = ""
    
    // Get the current text in search/filter boxes and make it lowercase
    const searchValue = searchProduct.value.toLowerCase()
    const filterValue = filtterCategory.value.toLowerCase()

    Products.forEach((item, index) => {
        // Check if the current product matches the search and filter text
        // (Making both lowercase ensures "Jeans" and "jeans" match)
        const nameMatches = item.productName.toLowerCase().includes(searchValue)
        const categoryMatches = item.SelectCategory.toLowerCase().includes(filterValue)

        // Only draw the row IF it matches BOTH the search and the filter
        if (nameMatches && categoryMatches) {
            tableBody.innerHTML += `<tr>
                <td>${index + 1}</td>
                <td>${item.productID}</td>
                <td>${item.productName}</td>
                <td>${item.SelectCategory}</td>
                <td>${item.price}</td>
                <td>${item.Quantity}</td>
                <td>
                    <button class="btn btn-warning" onclick="editProductsDetails(${index})">Edit</button>
                    <button class="btn btn-danger" onclick="deleteProduct(${index})">Delete</button>
                </td>
            </tr>`
        }
    })
}

function deleteProduct(productIndex) {
    if (confirm('Are you sure you want to delete this product?')) {
        Products.splice(productIndex, 1)
        sessionStorage.setItem('Products', JSON.stringify(Products))
        displayProductList()
    }
}

// Edit Products  
function editProductsDetails(editIndex) {
    const productDetails = Products[editIndex]
    
    productID.value = productDetails.productID
    productName.value = productDetails.productName
    SelectCategory.value = productDetails.SelectCategory
    price.value = productDetails.price
    Quantity.value = productDetails.Quantity

    editStatus.value = editIndex
    addProductBtn.innerText = "Update Product"
}