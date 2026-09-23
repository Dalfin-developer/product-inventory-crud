let Products = []

const productsForm = document.getElementById('productsForm')
const productID = document.getElementById('productID')
const productName = document.getElementById('productName')
const SelectCategory = document.getElementById('SelectCategory')
const price = document.getElementById('price')
const Quantity = document.getElementById('Quantity')
const tableBody = document.getElementById('tableBody')
const editStatus = document.getElementById('editStatus')
const addProductBtn= document.getElementById('addProduct')

if (sessionStorage.getItem('Products')) {
    Products = JSON.parse(sessionStorage.getItem('Products'))
    displayProductList()
    console.log(Products);

}

//getting data from the form
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
            Products.push(
                {
                    productID: ProductIDInput,
                    productName: productNameInput,
                    SelectCategory: productCategoryInput,
                    price: priceInput,
                    Quantity: QuantityInput
                })
            console.log(Products);

            
        }
        else {
            
        Products[editindex]={
                    productID: ProductIDInput,
                    productName: productNameInput,
                    SelectCategory: productCategoryInput,
                    price: priceInput,
                    Quantity: QuantityInput
                }
            console.log(Products[editindex]);
            
                editStatus.value =""
        }
        sessionStorage.setItem('Products', JSON.stringify(Products))
        displayProductList()
        productsForm.reset()
    }
    else {
            alert('please fill the form completely')
        }



    })

//display products 

function displayProductList() {
    tableBody.innerHTML = ""
    Products.forEach((item, index) => {

        tableBody.innerHTML += `<tr>
                <td>${index + 1}</td>
                <td>${item.productID}</td>
                <td>${item.productName}</td>
                <td>${item.SelectCategory}</td>
                <td>${item.price}</td>
                <td>${item.Quantity}</td>
                <td><button class="btn btn-warning" onclick="editProductsDetails(${index})">Edit</button>
                <button class="btn btn-danger" onclick="deleteProduct(${index})">Delete</button></td>
                </tr>`
        console.log(item);

    })
}

function deleteProduct(productIndex) {
    if (confirm('Are you sure! Do you want to delete this product details')) {
        Products.splice(productIndex, 1)
        console.log(Products);
        sessionStorage.setItem('Products', JSON.stringify(Products))
        displayProductList()

    }
}

//Edit Products  

function editProductsDetails(editIndex) {
    const productDetails = Products[editIndex]
    productID.value = productDetails.productID
    productName.value = productDetails.productName
    SelectCategory.value = productDetails.SelectCategory
    price.value = productDetails.price
    Quantity.value = productDetails.Quantity
    console.log(productDetails);


    editStatus.value = editIndex
    addProductBtn.innerText = "Update Product"
}

//Search products 
function seachProducts(searchProduct){
 Products.filter(items=>items['SelectCategory']=="searchProducts")
}