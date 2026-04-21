using System;
using System.Collections.Generic;
using System.Linq;

public record Student(string Name, int Grade)
{
    public string Status => Grade >= 7 ? "Aprovado" : Grade >= 5 ? "Recuperação" : "Reprovado";
}

class Program
{
    static void Main()
    {
        var students = new List<Student>();

        while (true)
        {
            Console.WriteLine("\n--- Menu: Notas dos Alunos ---");
            Console.WriteLine("1. Cadastrar aluno");
            Console.WriteLine("2. Ver situação dos alunos cadastrados");
            Console.WriteLine("0. Sair");
            Console.Write("Escolha uma opção: ");
            
            var option = Console.ReadLine();
            
            if (option == "0") break;
            
            if (option == "1")
            {
                Console.Write("Digite o nome do aluno: ");
                var name = Console.ReadLine();
                
                if (string.IsNullOrWhiteSpace(name)) 
                {
                    Console.WriteLine("Nome inválido, tente novamente.");
                    continue;
                }

                Console.Write("Digite a nota do aluno (número inteiro): ");
                
                if (int.TryParse(Console.ReadLine(), out int grade))
                {
                    students.Add(new Student(name, grade));
                    Console.WriteLine("Aluno cadastrado com sucesso!");
                }
                else
                {
                    Console.WriteLine("Nota inválida, o cadastro foi cancelado.");
                }
            }
            else if (option == "2")
            {
                if (students.Count > 0)
                {
                    Console.WriteLine("\n--- Resultados ---");
                    DisplayStudentResults(students);
                }
                else
                {
                    Console.WriteLine("Nenhum aluno foi cadastrado ainda.");
                }
            }
            else
            {
                Console.WriteLine("Opção inválida.");
            }
        }
    }

    public static void DisplayStudentResults(List<Student> students)
    {
        foreach (var student in students)
        {
            Console.WriteLine($"{student.Name} -> {student.Status}");
        }

        var approvedCount = students.Count(s => s.Status == "Aprovado");
        var recoveryCount = students.Count(s => s.Status == "Recuperação");
        var failedCount = students.Count(s => s.Status == "Reprovado");

        Console.WriteLine();
        Console.WriteLine($"Aprovados: {approvedCount}");
        Console.WriteLine($"Recuperação: {recoveryCount}");
        Console.WriteLine($"Reprovados: {failedCount}");
    }
}
