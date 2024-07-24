const prompt = require("prompt-sync")();
const readline = require("readline");
const CheckingAccount = require("./entities/CheckingAccount");
const SavingsAccount = require("./entities/SavingsAccount");

const waitForKeyPress = () => {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    console.log("\nPressione Enter para voltar ao menu principal...");
    rl.question("", () => {
      rl.close();
      console.clear();
      resolve();
    });
  });
};

let accounts = [];

const showMainMenu = () => {
  console.log(`
1. Criar Conta
2. Depositar
3. Sacar
4. Ver Saldo
5. Aplicar Juros/Rendimento
6. Sair
`);
};

const showAccountTypeMenu = () => {
  console.log(
`1. Corrente
2. Poupança
`);
}

const createAccount = () => {
  console.clear();
  const holder = prompt("Digite o nome do titular da conta: ").trim();
  showAccountTypeMenu();
  const choice = +prompt("Selecione o tipo de conta: ");

  if (choice === 1) {
    const interestRate = parseFloat(prompt("Digite a taxa de juros: ").trim());
    accounts.push(new CheckingAccount(holder, interestRate));
  } else if (choice === 2) {
    const yieldRate = parseFloat(prompt("Digite a taxa de rendimento: ").trim());
    accounts.push(new SavingsAccount(holder, yieldRate));
  } else {
    console.log("Tipo de conta inválido.");
    return;
  }

  console.log("Conta criada com sucesso!");
};

const findAccount = (holder) => {
  const account = accounts.find((acc) => acc.holder.toLowerCase() === holder.toLowerCase());
  if (!account) {
    throw new Error("Conta não encontrada.");
  }
  return account;
};

const depositToAccount = () => {
  console.clear();
  const holder = prompt("Digite o nome do titular da conta: ").trim();

  try {
    const account = findAccount(holder);
    const amount = parseFloat(prompt("Digite o valor para depósito: ").trim());
    account.deposit(amount);
    console.log("Depósito realizado com sucesso!");
  } catch (e) {
    console.log(e.message);
  }
};

const withdrawFromAccount = () => {
  console.clear();
  const holder = prompt("Digite o nome do titular da conta: ").trim();

  try {
    const account = findAccount(holder);
    const amount = parseFloat(prompt("Digite o valor para saque: ").trim());
    account.withdraw(amount);
    console.log("Saque realizado com sucesso!");
  } catch (e) {
    console.log(e.message);
  }
};

const viewAccountBalance = () => {
  console.clear();
  const holder = prompt('Digite o nome do titular da conta: ').trim();

  try {
    const account = findAccount(holder);
    console.log(`Saldo atual: R$ ${account.getBalance().toFixed(2)}`);
  } catch (e) {
    console.log(e.message);
  }
};

const applyInterestOrYield = () => {
  console.clear();
  const holder = prompt("Digite o nome do titular da conta: ").trim();

  try {
    const account = findAccount(holder);
    if (account instanceof CheckingAccount) {
      account.applyInterest();
      console.log("Juros aplicados com sucesso!");
    } else if (account instanceof SavingsAccount) {
      account.applyYield();
      console.log("Rendimento aplicado com sucesso!");
    } else {
      throw new Error("Tipo de conta inválido.");
    }
  } catch (e) {
    console.log(e.message);
  }
};

const main = async () => {
  while (true) {
    console.clear();
    showMainMenu();

    const choice = +prompt("Selecione uma opção: ");

    if (choice === 6) {
      console.clear();
      console.log("Encerrando o programa...");
      break;
    }

    switch (choice) {
      case 1:
        createAccount();
        await waitForKeyPress();
        break;
      case 2:
        depositToAccount();
        await waitForKeyPress();
        break;
      case 3:
        withdrawFromAccount();
        await waitForKeyPress();
        break;
      case 4:
        viewAccountBalance();
        await waitForKeyPress();
        break;
      case 5:
        applyInterestOrYield();
        await waitForKeyPress();
        break;
      default:
        console.clear();
        console.log("Opção inválida");
        await waitForKeyPress();
    }
  }
};

main();
