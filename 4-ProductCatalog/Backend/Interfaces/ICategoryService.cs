using ProductCatalog.Api.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ProductCatalog.Api.Interfaces;

public interface ICategoryService
{
    Task<int> CreateCategoryAsync(CreateCategoryDTO dto);
    Task<bool> DeleteCategoryAsync(int id);
    Task<IEnumerable<CategoryListViewModel>> GetAllCategoriesAsync();
}
