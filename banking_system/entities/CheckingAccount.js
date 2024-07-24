const Account = require("./Account");

class CheckingAccount extends Account {
  constructor(holder, interestRate) {
    super(holder);
    this.interestRate = interestRate;
  }

  applyInterest() {
    if (!this.interestRate || this.interestRate <= 0 || isNaN(this.interestRate)) {
      throw new Error("Taxa de juros inválida.");
    }
    this.balance += this.balance * this.interestRate;
  }
}

module.exports = CheckingAccount;
