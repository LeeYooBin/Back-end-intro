const Account = require("./Account");

class SavingsAccount extends Account {
  constructor(holder, yieldRate) {
    super(holder);
    this.yieldRate = yieldRate;
  }

  applyYield() {
    if (!this.yieldRate || this.yieldRate <= 0 || isNaN(this.yieldRate)) {
      throw new Error("Taxa de rendimento inválida.");
    }
    this.balance += this.balance * this.yieldRate;
  }
}

module.exports = SavingsAccount;
