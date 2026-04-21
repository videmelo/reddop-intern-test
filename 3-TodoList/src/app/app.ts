import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  status: 'Pendente' | 'Em Andamento' | 'Concluída';
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  private fb = inject(FormBuilder);

  tasks: Task[] = [];

  taskForm = this.fb.nonNullable.group({
    title: ['', Validators.required],
    description: [''],
    dueDate: ['', Validators.required],
    status: ['Pendente' as const, Validators.required]
  });

  addTask() {
    if (this.taskForm.invalid) return;

    this.tasks.push({
      id: Date.now(),
      ...this.taskForm.getRawValue()
    });

    this.tasks.sort((a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime());
    this.taskForm.reset({ status: 'Pendente' });
  }

  changeStatus(task: Task, newStatus: Task['status']) {
    task.status = newStatus;
  }
}
