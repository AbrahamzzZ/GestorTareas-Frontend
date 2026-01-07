import { Component, inject, OnInit } from '@angular/core';
import { Task } from '../../core/interface/task';
import { TaskService } from '../../core/service/task-service';
import { MaterialModule } from '../../shared/ui/material-module';
import { TokenService } from '../../core/service/token-service';
import { Router } from '@angular/router';
import { Tasks } from '../tasks/tasks';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  imports: [MaterialModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent implements OnInit {
  tasks: Task[] = [];
  loading = false;
  private readonly taskService = inject(TaskService);
  private readonly tokenService = inject(TokenService);
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.loading = true;

    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  toggleTask(task: Task): void {
    this.taskService.updateTask(task.id, {
      completed: !task.completed
    }).subscribe(() => {
      task.completed = !task.completed;
    });
  }

  openTaskModal(): void {
    const dialogRef = this.dialog.open(Tasks, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.loadTasks();
      }
    });
  }

  deleteTask(taskId: string): void {
    this.taskService.deleteTask(taskId).subscribe(() => {
      this.tasks = this.tasks.filter(t => t.id !== taskId);
    });
  }

  logout(): void {
    this.tokenService.removeToken();
    this.router.navigate(['/login']);
  }
}