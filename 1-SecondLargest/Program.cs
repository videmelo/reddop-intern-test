using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static void Main()
    {
        Console.WriteLine("--- Encontre o Segundo Maior Dentre os Valores ---");
        Console.WriteLine("Digite os números separados por espaço (exemplo: 3 2 1 5 5 4): ");
        Console.Write("> ");
        var input = Console.ReadLine();
        
        if (string.IsNullOrWhiteSpace(input))
        {
            Console.WriteLine("Nenhum número foi inserido. Encerrando.");
            return;
        }

        try
        {
            var numbers = input.Split(new[] { ' ' }, StringSplitOptions.RemoveEmptyEntries)
                               .Select(int.Parse)
                               .ToList();

            var result = SecondLargestDistinct(numbers);

            if (result.HasValue)
            {
                Console.WriteLine($"Segundo maior distinto: {result.Value}");
            }
            else
            {
                Console.WriteLine("Não há segundo maior distinto.");
            }
        }
        catch (FormatException)
        {
            Console.WriteLine("Entrada inválida. Certifique-se de digitar apenas números inteiros.");
        }
    }

    public static int? SecondLargestDistinct(IEnumerable<int> numbers)
    {
        if (numbers == null)
            return null;

        var orderedDistinctNumbers = numbers.Distinct().OrderByDescending(x => x).ToList();

        if (orderedDistinctNumbers.Count >= 2)
        {
            return orderedDistinctNumbers[1];
        }

        return null;
    }
}
