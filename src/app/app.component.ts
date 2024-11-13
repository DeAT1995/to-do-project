import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'to-do-project';
  todoForm!: FormGroup;
  todoList: { name: string; checked: boolean }[] = [];
  todoListChecked: { name: string; checked: boolean }[] = [];

  constructor(private _fb: FormBuilder) {
    this.todoForm = this._fb.group({
      todoInput: [''],
    });
  }

  addTodo() {
    const todoInput = this.todoForm.get('todoInput')?.value.trim();
    if (todoInput !== '') {
      this.todoList.push({ name: todoInput, checked: false });
      this.todoForm.reset();
    }
  }

  updateStatusTask(checked: boolean, index: number) {
    if (checked) {
      const todo = this.todoList[index];
      if (todo) {
        todo.checked = true;
        this.todoListChecked.push(todo);
        this.todoList.splice(index, 1);
      }
    } else {
      const todo = this.todoListChecked[index];
      if (todo) {
        todo.checked = false;
        this.todoList.push(todo);
        this.todoListChecked.splice(index, 1);
      }
    }
  }

  completeTask(index: number) {
    const todo = this.todoList.find(
      (item, currentIndex) => currentIndex === index
    );
    if (todo) {
      todo.checked = true;
      this.todoListChecked.push(todo);
      this.todoList = this.todoList.filter(
        (_, currentIndex) => currentIndex !== index
      );
    }
  }

  removeTask(index: number) {
    this.todoList.splice(index, 1);
  }
}
