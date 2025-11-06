
class TransactionManager {
    constructor() {
        this.transactions = JSON.parse(localStorage.getItem('transactions')) || [];
        this.currentEditId = null;
        this.initializeEventListeners();
        this.renderTransactions();
    }

    initializeEventListeners() {
        document.getElementById('transactionForm').addEventListener('submit', (e) => this.handleFormSubmit(e));
        document.getElementById('transactionTableBody').addEventListener('click', (e) => this.handleTableActions(e));
    }

    generateUniqueId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    handleFormSubmit(e) {
        e.preventDefault();
        const formData = {
            id: this.currentEditId || this.generateUniqueId(),
            date: document.getElementById('transactionDate').value,
            description: document.getElementById('description').value,
            category: document.getElementById('category').value,
            amount: parseFloat(document.getElementById('amount').value),
            type: document.getElementById('type').value,
            paymentMethod: document.getElementById('paymentMethod').value
        };

        if (this.currentEditId) {
            const index = this.transactions.findIndex(t => t.id === this.currentEditId);
            if (index !== -1) {
                this.transactions[index] = formData;
            }
            this.currentEditId = null;
        } else {
            this.transactions.push(formData);
        }

        this.saveTransactions();
        this.renderTransactions();
        this.resetForm();
        bootstrap.Modal.getInstance(document.getElementById('addTransactionModal')).hide();
    }

    handleTableActions(e) {
        const button = e.target.closest('button');
        if (!button) return;

        const row = button.closest('tr');
        const id = row.dataset.id;

        if (button.classList.contains('btn-warning')) {
            this.editTransaction(id);
        } else if (button.classList.contains('btn-danger')) {
            this.deleteTransaction(id);
        }
    }

    editTransaction(id) {
        const transaction = this.transactions.find(t => t.id === id);
        if (!transaction) return;

        this.currentEditId = id;
        document.getElementById('transactionDate').value = transaction.date;
        document.getElementById('description').value = transaction.description;
        document.getElementById('category').value = transaction.category;
        document.getElementById('amount').value = transaction.amount;
        document.getElementById('type').value = transaction.type;
        document.getElementById('paymentMethod').value = transaction.paymentMethod;

        const modal = new bootstrap.Modal(document.getElementById('addTransactionModal'));
        modal.show();
    }

    deleteTransaction(id) {
        if (confirm('Are you sure you want to delete this transaction?')) {
            this.transactions = this.transactions.filter(t => t.id !== id);
            this.saveTransactions();
            this.renderTransactions();
        }
    }

    renderTransactions() {
        const tbody = document.getElementById('transactionTableBody');
        tbody.innerHTML = '';

        this.transactions
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .forEach(transaction => {
                const row = document.createElement('tr');
                row.dataset.id = transaction.id;
                
                const amountClass = transaction.type === 'Income' ? 'text-success' : 'text-danger';
                const amountPrefix = transaction.type === 'Income' ? '+' : '-';
                
                row.innerHTML = `
                    <td>${new Date(transaction.date).toLocaleDateString()}</td>
                    <td>${transaction.description}</td>
                    <td>${transaction.category}</td>
                    <td class="${amountClass}">${amountPrefix}₹${transaction.amount.toFixed(2)}</td>
                    <td>${transaction.type}</td>
                    <td>${transaction.paymentMethod}</td>
                    <td>
                        <button class="btn btn-warning btn-sm">Edit</button>
                        <button class="btn btn-danger btn-sm">Delete</button>
                    </td>
                `;
                tbody.appendChild(row);
            });
    }

    saveTransactions() {
        localStorage.setItem('transactions', JSON.stringify(this.transactions));
        
        window.dispatchEvent(new CustomEvent('transactionsUpdated', {
            detail: { transactions: this.transactions }
        }));
    }

    resetForm() {
        document.getElementById('transactionForm').reset();
        this.currentEditId = null;
    }
}


const transactionManager = new TransactionManager();
