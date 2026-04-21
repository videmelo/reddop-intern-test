using Microsoft.EntityFrameworkCore;
using ProductCatalog.Api.Data;
using ProductCatalog.Api.DTOs;
using ProductCatalog.Api.Entities;
using ProductCatalog.Api.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductCatalog.Api.Services;

public class CategoryService : ICategoryService
{
    private readonly ProductCatalogDbContext context;

    public CategoryService(ProductCatalogDbContext context)
    {
        this.context = context;
    }

    public async Task<int> CreateCategoryAsync(CreateCategoryDTO dto)
    {
        var category = new Category { Name = dto.Name };
        context.Categories.Add(category);
        await context.SaveChangesAsync();
        return category.Id;
    }

    public async Task<bool> DeleteCategoryAsync(int id)
    {
        var category = await context.Categories
                                     .Include(c => c.Products)
                                     .FirstOrDefaultAsync(c => c.Id == id);

        if (category == null)
            return false;

        if (category.Products.Any())
            return false;

        context.Categories.Remove(category);
        await context.SaveChangesAsync();
        return true;
    }

    public async Task<IEnumerable<CategoryListViewModel>> GetAllCategoriesAsync()
    {
        return await context.Categories
                             .Select(c => new CategoryListViewModel { Id = c.Id, Name = c.Name })
                             .ToListAsync();
    }
}
