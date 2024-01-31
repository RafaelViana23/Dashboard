// script_vendas.js

const modal = document.querySelector('dialog');
const salesForm = document.getElementById('salesForm');
const salesList = document.getElementById('salesList');
const totalValueElement = document.getElementById('total-value');
const salesCountElement = document.getElementById('sales');

let totalValue = 0;
let salesCount = 0;

function newSale() {
    modal.showModal();
}

function cancelSale() {
    modal.close();
}

function addSale() {
    const productName = document.getElementById('productName').value;
    const quantity = parseInt(document.getElementById('quantity').value, 10);
    const price = parseFloat(document.getElementById('price').value);
    const transactionType = document.getElementById('transaction-type').value;
    const date = document.getElementById('date').value;

    if (!productName || isNaN(quantity) || isNaN(price) || !transactionType || !date) {
        alert('Please fill in all fields with valid values.');
        return;
    }

    const total = quantity * price;
    const saleItem = document.createElement('li');

    // Main sale details with line breaks
    const saleDetails = document.createElement('div');
    saleDetails.innerHTML = `Data: ${date}<br>
                            Nome do Produto: ${productName}<br>
                            Quantidade: ${quantity}<br>
                            Preço: R$${price.toFixed(2)}<br>
                            Forma de Pagamento: ${transactionType}<br>
                            Total: R$${total.toFixed(2)}<br>`;

    // Append the sale details to the list item
    saleItem.appendChild(saleDetails);

    // Append the list item to the salesList
    salesList.appendChild(saleItem);

    // Update total value and sales count
    totalValue += total;
    salesCount++;

    // Update the display
    totalValueElement.textContent = `R$${totalValue.toFixed(2)}`;
    salesCountElement.textContent = salesCount;

    // Log the sale to the console
    console.log(`Sale: ${productName}, Quantity: ${quantity}, Price: R$${price.toFixed(2)}, Transaction Type: ${transactionType}, Date: ${date}, Total: R$${total.toFixed(2)}`);

    // Clear the form
    salesForm.reset();

    // Close the modal
    modal.close();
}

function filterSales() {
    const filterValue = document.getElementById('filterValue').value.toLowerCase();

    // Get all sale items
    const saleItems = salesList.getElementsByTagName('li');

    // Iterate through each sale item and toggle its visibility based on the search value
    for (const saleItem of saleItems) {
        const saleDetails = saleItem.getElementsByTagName('div')[0]; // Assuming the first div contains the sale details

        // Check if any part of the sale details contains the search value
        const isVisible = saleDetails.textContent.toLowerCase().includes(filterValue);

        // Toggle visibility
        saleItem.style.display = isVisible ? 'block' : 'none';
    }
}
