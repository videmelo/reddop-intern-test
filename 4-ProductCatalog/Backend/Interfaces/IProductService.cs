using ProductCatalog.Api.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ProductCatalog.Api.Interfaces;

public interface IProductService
{
    Task<int> CreateProductAsync(CreateProductDTO dto);
    Task<IEnumerable<ProductListViewModel>> GetAllProductsAsync();
    Task<ProductDetailDTO?> GetProductByIdAsync(int id);
}
