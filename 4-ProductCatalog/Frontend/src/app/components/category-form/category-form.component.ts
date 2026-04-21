import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './category-form.component.html'
})
export class CategoryFormComponent {
  categoryForm: FormGroup;
  isSubmitting = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService
  ) {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  onSubmit(): void {
    if (this.categoryForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    this.categoryService.create(this.categoryForm.value).subscribe({
      next: () => {
        this.isSubmitting = false;
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Categoria criada com sucesso!',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true
        });
        this.categoryForm.reset();
      },
      error: (err) => {
        this.isSubmitting = false;
        this.errorMessage = 'Ocorreu um erro ao salvar a categoria.';
      }
    });
  }
}