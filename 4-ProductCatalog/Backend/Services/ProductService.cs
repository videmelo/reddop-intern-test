using Microsoft.EntityFrameworkCore;
using ProductCatalog.Api.Data;
using ProductCatalog.Api.DTOs;
using ProductCatalog.Api.Entities;
using ProductCatalog.Api.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductCatalog.Api.Services;

public class ProductService : IProductService
{
    private readonly ProductCatalogDbContext context;

    public ProductService(ProductCatalogDbContext context)
    {
        this.context = context;
    }

    public async Task<int> CreateProductAsync(CreateProductDTO dto)
    {
        var product = new Product
        {
            Name = dto.Name,
            Price = dto.Price,
            CategoryId = dto.CategoryId
        };

        context.Products.Add(product);
        await context.SaveChangesAsync();
        
        return product.Id;
    }

    public async Task<IEnumerable<ProductListViewModel>> GetAllProductsAsync()
    {
        var products = await context.Products.Include(p => p.Category).ToListAsync();
        
        return products.Select(p => new ProductListViewModel
        {
            Id = p.Id,
            Name = p.Name,
            Price = p.Price,
            CategoryName = p.Category?.Name ?? "Sem Categoria"
        });
    }

    public async Task<ProductDetailDTO?> GetProductByIdAsync(int id)
    {
        var product = await context.Products
                                    .Include(p => p.Category)
                                    .FirstOrDefaultAsync(p => p.Id == id);

        if (product == null)
            return null;

        return new ProductDetailDTO
        {
            Id = product.Id,
            Name = product.Name,
            Price = product.Price,
            CategoryId = product.CategoryId,
            CategoryName = product.Category?.Name ?? string.Empty
        };
    }
}
