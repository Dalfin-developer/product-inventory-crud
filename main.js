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
const searchProduct = document.getElementById('searchProduct')
const filtterCategory = document.getElementById('filtterCategory')

if (sessionStorage.getItem('Products')) {
    Products = JSON.parse(sessionStorage.getItem('Products'))
    displayProductList()
    console.log(Products);

}
//listen to the seach boxs
searchProduct.addEventListener('input',displayProductList)
filtterCategory.addEventListener('input',displayProductList)

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
                addProductBtn.innerText = "Add Product"
        }
        sessionStorage.setItem('Products', JSON.stringify(Products))
        displayProductList()
        productsForm.reset()
    }
    else {
            alert('please fill the form completely')
        }



    }
  
)

//display products 

function displayProductList() {
    tableBody.innerHTML = ""
    const seachValue = searchProduct.value.toLowerCase()
    const categoryValue = filtterCategory.value.toLowerCase()
    console.log(seachValue,categoryValue);
    
    Products.forEach((item, index) => {
        const foundProduct = item.productName.toLowerCase().includes(seachValue)
        const foundCategory  =item.SelectCategory.toLowerCase().includes(categoryValue)
        if(foundProduct&&foundCategory){
        tableBody.innerHTML += `<tr>
                            <td class="ps-4 fw-bold text-muted">${index+1}</td>
                            <td><span class="font-monospace fw-bold">${item.productID}</span></td>
                            <td class="fw-medium">${item.productName}</td>
                            <td><span class="badge bg-info-subtle text-info border border-info-subtle rounded-pill px-3">${item.SelectCategory}</span></td>
                            <td class="fw-semibold">${item.price}</td>
                            <td><span class="badge bg-secondary rounded-pill">${item.Quantity}</span></td>
                            <td class="text-end pe-4">
                                <button onclick=editProductsDetails(${index}) class="btn btn-sm btn-outline-warning me-1">
                                    <i class="bi bi-pencil"></i> Edit
                                </button>
                                <button onclick=deleteProduct(${index}) class="btn btn-sm btn-outline-danger">
                                    <i class="bi bi-trash"></i> Delete
                                </button>
                            </td>
                        </tr>`
        console.log(item);
        }

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

