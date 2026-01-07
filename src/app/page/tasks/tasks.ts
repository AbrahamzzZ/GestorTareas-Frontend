import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../shared/ui/material-module';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TaskService } from '../../core/service/task-service';

@Component({
  selector: 'app-tasks',
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})
export class Tasks {
  loading = false;
  private readonly fb = inject(FormBuilder);
  private readonly taskService = inject(TaskService)
  private readonly dialogRef = inject (MatDialogRef<Tasks>)

  form = this.fb.group({
    title: ['', Validators.required],
    description: ['']
  });

  submit(): void {
    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    this.taskService.createTask(this.form.value as any).subscribe({
      next: () => {
        this.dialogRef.close(true);
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  close(): void {
    this.dialogRef.close(false);
  }
}