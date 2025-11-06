class DashboardManager {
    constructor() {
        this.transactions = JSON.parse(localStorage.getItem('transactions')) || [];
        this.monthlyIncome = parseFloat(localStorage.getItem('monthlyIncome')) || 0;
        this.charts = {};
        this.initializeCharts();
        this.initializeEventListeners();
        this.updateDashboard();
    }

    initializeEventListeners() {
        window.addEventListener('transactionsUpdated', (e) => {
            this.transactions = e.detail.transactions;
            this.updateDashboard();
        });

        document.getElementById('monthlyIncomeForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.updateMonthlyIncome();
        });
    }

    updateMonthlyIncome() {
        const amount = parseFloat(document.getElementById('monthlyIncomeAmount').value);
        this.monthlyIncome = amount;
        localStorage.setItem('monthlyIncome', amount.toString());
        
        bootstrap.Modal.getInstance(document.getElementById('monthlyIncomeModal')).hide();
        
        this.updateDashboard();
    }

    initializeCharts() {
        this.charts.expenses = new Chart(document.getElementById('expensesChart'), {
            type: 'bar',
            data: {
                labels: [],
                datasets: [{
                    label: 'Monthly Expenses',
                    data: [],
                    backgroundColor: 'rgba(239, 68, 68, 0.5)',
                    borderColor: 'rgb(239, 68, 68)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: value => '₹' + value
                        }
                    }
                }
            }
        });

        this.charts.balance = new Chart(document.getElementById('balanceChart'), {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Balance Trend',
                    data: [],
                    fill: true,
                    backgroundColor: 'rgba(34, 197, 94, 0.2)',
                    borderColor: 'rgb(34, 197, 94)',
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        ticks: {
                            callback: value => '₹' + value
                        }
                    }
                }
            }
        });

        this.charts.expensePie = new Chart(document.getElementById('expensePieChart'), {
            type: 'doughnut',
            data: {
                labels: [],
                datasets: [{
                    data: [],
                    backgroundColor: [
                        'rgba(239, 68, 68, 0.5)',
                        'rgba(59, 130, 246, 0.5)',
                        'rgba(16, 185, 129, 0.5)',
                        'rgba(251, 191, 36, 0.5)',
                        'rgba(139, 92, 246, 0.5)',
                        'rgba(236, 72, 153, 0.5)'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right'
                    }
                }
            }
        });
    }

    updateDashboard() {
        this.updateSummaryCards();
        this.updateExpensesChart();
        this.updateBalanceChart();
        this.updateExpensePieChart();
    }

    getCurrentMonthExpenses() {
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();
        
        return this.transactions
            .filter(t => {
                const transDate = new Date(t.date);
                return t.type === 'Expense' && 
                       transDate.getMonth() === currentMonth && 
                       transDate.getFullYear() === currentYear;
            })
            .reduce((sum, t) => sum + t.amount, 0);
    }

    updateSummaryCards() {
        const currentMonthExpenses = this.getCurrentMonthExpenses();
        const remainingBalance = this.monthlyIncome - currentMonthExpenses;

        document.getElementById('currentMonthlyIncome').textContent = `₹${this.monthlyIncome.toFixed(2)}`;
        document.getElementById('monthlyIncome').textContent = `₹${this.monthlyIncome.toFixed(2)}`;
        
        document.getElementById('totalExpenses').textContent = `₹${currentMonthExpenses.toFixed(2)}`;
        
        document.getElementById('currentBalance').textContent = `₹${remainingBalance.toFixed(2)}`;
        document.getElementById('totalBalance').textContent = `₹${remainingBalance.toFixed(2)}`;
        
        document.getElementById('transactionCount').textContent = this.transactions.length;

        document.getElementById('monthlyIncomeAmount').value = this.monthlyIncome;
    }

    updateExpensesChart() {
        const monthlyExpenses = {};
        const last6Months = new Date();
        last6Months.setMonth(last6Months.getMonth() - 5);

        this.transactions
            .filter(t => t.type === 'Expense' && new Date(t.date) >= last6Months)
            .forEach(t => {
                const month = new Date(t.date).toLocaleString('default', { month: 'short', year: '2-digit' });
                monthlyExpenses[month] = (monthlyExpenses[month] || 0) + t.amount;
            });

        this.charts.expenses.data.labels = Object.keys(monthlyExpenses);
        this.charts.expenses.data.datasets[0].data = Object.values(monthlyExpenses);
        this.charts.expenses.update();
    }

    updateBalanceChart() {
        const dailyBalance = {};
        let runningBalance = this.monthlyIncome;
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();

        this.transactions
            .filter(t => {
                const transDate = new Date(t.date);
                return transDate.getMonth() === currentMonth && 
                       transDate.getFullYear() === currentYear;
            })
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .forEach(t => {
                const date = new Date(t.date).toLocaleDateString();
                if (t.type === 'Expense') {
                    runningBalance -= t.amount;
                }
                dailyBalance[date] = runningBalance;
            });

        this.charts.balance.data.labels = Object.keys(dailyBalance);
        this.charts.balance.data.datasets[0].data = Object.values(dailyBalance);
        this.charts.balance.update();
    }

    updateExpensePieChart() {
        const categoryExpenses = {};
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        
        this.transactions
            .filter(t => {
                const transDate = new Date(t.date);
                return t.type === 'Expense' && 
                       transDate.getMonth() === currentMonth && 
                       transDate.getFullYear() === currentYear;
            })
            .forEach(t => {
                categoryExpenses[t.category] = (categoryExpenses[t.category] || 0) + t.amount;
            });

        this.charts.expensePie.data.labels = Object.keys(categoryExpenses);
        this.charts.expensePie.data.datasets[0].data = Object.values(categoryExpenses);
        this.charts.expensePie.update();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const dashboardManager = new DashboardManager();
});
