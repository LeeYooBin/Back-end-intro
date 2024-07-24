class Account {
  constructor(holder) {
    this.holder = holder;
    this.balance = 0;
  }

  deposit(amount) {
    if (!amount || amount <= 0 || isNaN(amount)) {
      throw new Error("Valor inválido para depósito.");
    }
    this.balance += amount;
  }

  withdraw(amount) {
    if (!amount || amount <= 0 || isNaN(amount)) {
      throw new Error("Valor inválido para saque.");
    }
    if (amount > this.balance) {
      throw new Error("Saldo insuficiente para saque.");
    }
    this.balance -= amount;
  }

  getBalance() {
    return this.balance;
  }
}

module.exports = Account;
