using System.ComponentModel.DataAnnotations;

namespace ProductCatalog.Api.DTOs;

public class CreateProductDTO
{
    [Required(ErrorMessage = "O nome do produto é obrigatório.")]
    [MaxLength(100, ErrorMessage = "O nome deve ter no máximo 100 caracteres.")]
    public string Name { get; set; } = string.Empty;

    [Range(0.01, double.MaxValue, ErrorMessage = "O preço deve ser maior que zero.")]
    public decimal Price { get; set; }

    [Required(ErrorMessage = "A categoria é obrigatória.")]
    public int CategoryId { get; set; }
}
