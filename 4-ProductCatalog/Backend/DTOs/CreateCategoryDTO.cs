using System.ComponentModel.DataAnnotations;

namespace ProductCatalog.Api.DTOs;

public class CreateCategoryDTO
{
    [Required(ErrorMessage = "O nome da categoria é obrigatório.")]
    [MaxLength(100, ErrorMessage = "O nome deve ter no máximo 100 caracteres.")]
    public string Name { get; set; } = string.Empty;
}
