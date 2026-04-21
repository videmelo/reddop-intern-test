using Microsoft.AspNetCore.Mvc;
using ProductCatalog.Api.DTOs;
using ProductCatalog.Api.Interfaces;

namespace ProductCatalog.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController : ControllerBase
{
    private readonly ICategoryService categoryService;

    public CategoriesController(ICategoryService categoryService)
    {
        this.categoryService = categoryService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<CategoryListViewModel>>> Get()
    {
        var result = await categoryService.GetAllCategoriesAsync();
        return Ok(result);
    }

    [HttpPost]
    public async Task<ActionResult> Create([FromBody] CreateCategoryDTO dto)
    {
        var id = await categoryService.CreateCategoryAsync(dto);
        return CreatedAtAction(nameof(Get), new { id }, new { id = id });
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(int id)
    {
        var success = await categoryService.DeleteCategoryAsync(id);
        
        if (!success)
        {
            return BadRequest(new { message = "Não é possível excluir esta categoria pois ela não existe ou possui produtos vinculados." });
        }

        return NoContent();
    }
}
