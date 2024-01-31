// ... (Your existing Produto class code remains unchanged)
class Produto {
    constructor() {
        this.id = 1;
        this.arrayProdutos = [];
        this.editId = null;
    }

    salvar() {
        let produto = this.lerDados();

        if (this.validaCampos(produto)) {
            if(this.editId == null) {
                this.adicionar(produto);
            } else {
                    this.atualizar(this.editId, produto);
                }
        }

        this.listaTabela();
        this.cancelar();
        // Close the modal
        modal.close();
        updateDashboardCards();
        
    }

    listaTabela() {
        let tbody = document.getElementById('tbody');
        tbody.innerHTML = '';

        for (let i = 0; i < this.arrayProdutos.length; i++) {
            let tr = tbody.insertRow();

            let td_id = tr.insertCell();
            let td_quantidade = tr.insertCell();
            let td_produto = tr.insertCell();
            let td_modelo = tr.insertCell();
            let td_valor = tr.insertCell();
            let td_acoes = tr.insertCell();

            td_id.innerText = this.arrayProdutos[i].id;
            td_quantidade.innerText = this.arrayProdutos[i].quantidadeProduto;
            td_produto.innerText = this.arrayProdutos[i].nomeProduto;
            td_modelo.innerText = this.arrayProdutos[i].modeloProduto;
            td_valor.innerText = this.arrayProdutos[i].preco;

            td_id.classList.add('center');
            td_quantidade.classList.add('center');
            td_acoes.classList.add('center');

            let imgEdit = document.createElement('img');
            imgEdit.src = 'img/imgEdit.svg';
            imgEdit.setAttribute('onclick', "produto.prepararaEdicao(" + JSON.stringify(this.arrayProdutos[i]) + "); modal.showModal();");

            let imgDelete = document.createElement('img');
            imgDelete.src = 'img/imgDelete.svg';
            imgDelete.setAttribute('onclick', "produto.deletar("+ this.arrayProdutos[i].id +")");

            td_acoes.appendChild(imgEdit);
            td_acoes.appendChild(imgDelete);
        }
    }

    adicionar(produto) {
        produto.preco = parseFloat(produto.preco);
        this.arrayProdutos.push(produto);
        this.id++;
    }

    atualizar(id, produto) {
        for (let i = 0; i < this.arrayProdutos.length; i++) {
            if(this.arrayProdutos[i].id === id) {
                this.arrayProdutos[i].quantidadeProduto = produto.quantidadeProduto;
                this.arrayProdutos[i].nomeProduto = produto.nomeProduto;
                this.arrayProdutos[i].modeloProduto = produto.modeloProduto;
                this.arrayProdutos[i].preco = produto.preco;
            }
        }

    }
    

    prepararaEdicao(dados) {
        this.editId = dados.id;

        document.getElementById('quantidade').value = dados.quantidadeProduto;
        document.getElementById("produto").value = dados.nomeProduto;
        document.getElementById("modelo").value = dados.modeloProduto;
        document.getElementById("preco").value = dados.preco;

        document.getElementById("btn1").innerText = "Atualizar";

    }

    lerDados() {
        let produto = {};

        produto.id = this.id;
        produto.quantidadeProduto = document.getElementById('quantidade').value;
        produto.nomeProduto = document.getElementById('produto').value;
        produto.modeloProduto = document.getElementById('modelo').value;
        produto.preco = document.getElementById('preco').value;

        return produto;
    }

    validaCampos(produto) {
        let msg = '';

        if (produto.quantidadeProduto == '') {
            msg += '- Informe a quantidade do produto \n';
        }

        if (produto.nomeProduto === '') {
            msg += '- Informe o nome do produto \n';
        }

        if (produto.modeloProduto === '') {
            msg += '- Informe o modelo do produto \n';
        }

        if (produto.preco === '') {
            msg += '- Informe o preço do produto \n';
        }

        if (msg !== '') {
            alert(msg);
            return false;
        }

        return true;
    }

    cancelar() {
        document.getElementById('quantidade').value = '';
        document.getElementById('produto').value = '';
        document.getElementById('modelo').value = '';
        document.getElementById('preco').value = '';

        document.getElementById('btn1').innerText = "Salvar";
        this.editId = null;

        modal.close();
    }

    deletar(id) {
        if(confirm('Deseja realmente deleter o produto do ID ' + id)) {

        }
        let tbody = document.getElementById('tbody');

        for (let i = 0; i < this.arrayProdutos.length; i++) {
            if (this.arrayProdutos[i].id == id) {
                this.arrayProdutos.splice(i, 1);
                this.listaTabela(); // Update the table after deletion
                break;
            }
        }
    }

    search() {
        let term = document.getElementById('searchTerm').value.toLowerCase();
        let searchResults = [];

        for (let i = 0; i < this.arrayProdutos.length; i++) {
            let produto = this.arrayProdutos[i];
            if (
                produto.id.toString().includes(term) ||
                produto.nomeProduto.toLowerCase().includes(term) ||
                produto.modeloProduto.toLowerCase().includes(term) ||
                produto.preco.toString().includes(term)
            ) {
                searchResults.push(produto);
            }
        }

        // Display search results
        this.displaySearchResults(searchResults);
    }

    displaySearchResults(results) {
        let tbody = document.getElementById('tbody');
        tbody.innerHTML = '';

        for (let i = 0; i < results.length; i++) {
            let tr = tbody.insertRow();

            let td_id = tr.insertCell();
            let td_quantidade = tr.insertCell();
            let td_produto = tr.insertCell();
            let td_modelo = tr.insertCell();
            let td_valor = tr.insertCell();
            let td_acoes = tr.insertCell();

            td_id.innerText = results[i].id;
            td_produto.innerText = results[i].nomeProduto;
            td_modelo.innerText = results[i].modeloProduto;
            td_valor.innerText = results[i].preco;

            td_id.classList.add('center');
            td_quantidade.classList.add('center');
            td_acoes.classList.add('center');
        }
    }

    handleCSVUpload() {
        // Get the input element
        const fileInput = document.getElementById('csvFile');
        
        // Check if a file is selected
        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];
            
            // Create a new FileReader
            const reader = new FileReader();
    
            // Define the onload function for FileReader
            reader.onload = function (e) {
                // Parse CSV data
                const csvData = e.target.result;
                const parsedData = Produto.parseCSV(csvData);
    
                // Add the parsed data to your product table
                if (parsedData.length > 0) {
                    Produto.appendCSVDataToTable(parsedData);
                } else {
                    alert('Error parsing CSV file. Please check the file format.');
                }
            };
    
            // Read the file as text
            reader.readAsText(file);
        } else {
            alert('Please select a CSV file to upload.');
        }
    }

    static parseCSV(csvData) {
        // Split the CSV data into rows
        const rows = csvData.split('\n');
    
        // Parse each row into an array of values
        const parsedData = rows.map(row => row.split(','));
    
        return parsedData;
    }
    
    static appendCSVDataToTable(csvData) {
        // Get the table body element
        const tbody = document.getElementById('tbody');
    
        // Clear existing table rows
        tbody.innerHTML = '';
    
        // Iterate through the CSV data and append rows to the table
        csvData.forEach(rowData => {
            const row = document.createElement('tr');
    
            rowData.forEach(value => {
                const cell = document.createElement('td');
                cell.textContent = value;
                row.appendChild(cell);
            });
    
            // Add any additional cells or actions as needed
    
            tbody.appendChild(row);
        });
    
        alert('CSV file uploaded successfully.');
    }

}

var produto = new Produto();


// Function to update dashboard cards
function updateDashboardCards() {
    // Assuming you have a global variable named 'dashboard'
    document.getElementById('total-products').textContent = dashboard.totalProducts();
    document.getElementById('total-value').textContent = `R$${dashboard.totalValue().toFixed(2)}`;
}

// Assuming you have a global variable named 'dashboard'
var dashboard = {
    totalProducts: function () {
        // Calculate total products from the 'produto' array
        return produto.arrayProdutos.length;
    },

    totalValue: function () {
        // Calculate total value from the 'produto' array
        return produto.arrayProdutos.reduce((sum, product) => sum + parseFloat(product.preco), 0);
    },
};

// Initial update of dashboard cards
updateDashboardCards();

const modal = document.querySelector('dialog');
const button = document.querySelector('btn+');

function newProd() {
    modal.showModal();
}

function cancelProd() {
    modal.close();
}

