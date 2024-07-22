const prompt = require("prompt-sync")();
const readline = require("readline");

// Função para retornar ao menu principal
const waitForKeyPress = () => {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    console.log("\nPressione Enter para voltar ao menu principal...");
    rl.question("", () => {
      rl.close();
      console.clear();
      resolve();
    });
  });
};

// Array para armazenar estudantes cadastrados
let students = [];

// Função que exibe o menu
const showMainMenu = () => console.log(`
1. Cadastrar aluno
2. Mostrar aluno
3. Mostrar todos os alunos 
4. Sair
`);

// Função para registar estudantes
const registerStudent = () => {
  console.clear();
  // Instancia um novo estudante
  const newStudent = {
    name: "",
    subjects: []
  };

  newStudent.name = prompt("Digite o nome do aluno: ").trim();

  let aux = 1; // Variável auxiliar para mostrar o número da matéria que está sendo registrada
  let continueRegisteringSubjects = true; // Variável que simboliza a decisão do usuário de continuar cadastrando matérias
  while (continueRegisteringSubjects) {
    // Instancia uma nova matéria
    const subject = {
      name: "",
      grades: [],
      absencesNumber: 0 
    }

    console.log();
    subject.name = prompt(`Digite o nome da ${aux}° matéria: `);

    // Recebe notas da matéria
    for (let i = 1; i <= 3; i++) {
      const grade = +prompt(`Digite a ${i}° nota da matéria: `);

      // Verifica se a nota é válida
      if (grade === "" || grade < 0 || grade > 10 || isNaN(grade)) {
        console.log("Nota inválida! Por favor, tente novamente.");
        i -= 1;
        continue;
      }

      subject.grades.push(grade);
    }

    // Recebe o número de faltas da matéria
    let absences = parseInt(prompt("Digite o número de faltas da matéria: "));

    // Verifica se o número de faltas inserido é válido
    if (absences === "" || absences < 0 || isNaN(absences)) {
      absences = parseInt(prompt("Número de faltas inválido. Digite novamente: "));
    }

    subject.absencesNumber = absences;

    newStudent.subjects.push(subject);

    // Após 3 matérias cadastradas, passa a verificar se o usuário deseja continuar cadastrando matérias
    if (aux >= 3) {
      let choice = prompt("Deseja cadastrar mais matérias?(S|N): ").trim().toLowerCase();

      if (choice === "n") {
        continueRegisteringSubjects = false;
        continue;
      }

      while (choice !== "n" && choice !== "s") {
        console.log();
        choice = prompt("Resposta inválida. Apenas S ou N: ").trim().toLowerCase();
      }
    }

    aux += 1;
  }

  students.push(newStudent); // Adiciona o novo estudante ao array de estudantes
  showStudent(newStudent); // Mostra o estudante adicionado
}

// Função para mostrar um estudante
const showStudent = (student) => {
  console.log(`\nNome: ${student.name}`);

  const subjectsTable = student.subjects.map(subject => {
    const averageGrade = (subject.grades.reduce((sum, grade) => sum + grade, 0) / subject.grades.length).toFixed(1);
    let status = "Aprovado";

    if (subject.absencesNumber > 5 && averageGrade < 6) status = "Reprovado por média e por falta";
    else if (subject.absencesNumber > 5) status = "Reprovado por falta";
    else if (averageGrade < 6) status = "Reprovado por média";
    
    return {
      'Matéria': subject.name,
      'Nota 1': subject.grades[0],
      'Nota 2': subject.grades[1],
      'Nota 3': subject.grades[2],
      'Média': averageGrade,
      'Faltas': subject.absencesNumber,
      'Situação': status
    };
  });

  console.table(subjectsTable);
};

// Função que mostra todos os estudantes cadastrados, caso haja algum
const showAllStudents = () => {
  console.clear();
  if (!students.length) console.log("Não há alunos registrados.");
  else students.map(student => showStudent(student));
};

// Função que recebe um nome de estudante e retorna os dados do estudante, caso encontre no array de estudantes
const searchStudentByName = () => {
  console.clear();
  if (!students.length) {
    console.log("Não há alunos registrados.");
  } else {
    const name = prompt("Digite o nome do aluno: ").trim();

    const student = students.find(s => s.name.toLowerCase() === name.toLowerCase());
    
    if (student) showStudent(student);
    else console.log("Estudante não encontrado.");
  }
};

const main = async () => {
  while (true) {
    console.clear();
    showMainMenu();

    const choice = +prompt("Selecione uma opção: ");

    if (choice === 4) {
      console.clear();
      console.log("Encerrando o programa...")
      break;
    }

    switch (choice) {
      case 1:
        registerStudent();
        await waitForKeyPress();
        break;
      case 2:
        searchStudentByName();
        await waitForKeyPress();
        break;
      case 3:
        showAllStudents();
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
