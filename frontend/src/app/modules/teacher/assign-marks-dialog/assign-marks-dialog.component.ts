import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-assign-marks-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, MatIconModule],
  template: `
    <div class="dialog-header">
      <h2 mat-dialog-title>Assign Marks: {{data.student.name}}</h2>
      <button mat-icon-button (click)="onNoClick()"><mat-icon>close</mat-icon></button>
    </div>
    <div mat-dialog-content>
      <form [formGroup]="markForm" class="dialog-form">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Subject</mat-label>
          <mat-icon matPrefix>book</mat-icon>
          <mat-select formControlName="subjectId">
            <mat-option *ngFor="let sub of data.subjects" [value]="sub._id">{{sub.name}}</mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Numerical Grade (0-100)</mat-label>
          <mat-icon matPrefix>percent</mat-icon>
          <input matInput type="number" formControlName="marks" placeholder="Enter score">
        </mat-form-field>
      </form>
    </div>
    <div mat-dialog-actions align="end" class="dialog-actions">
      <button mat-button (click)="onNoClick()">Cancel</button>
      <button mat-flat-button color="primary" [disabled]="markForm.invalid" (click)="onSubmit()">
        Save Marks
      </button>
    </div>
  `,
  styles: [`
    .dialog-header { display: flex; justify-content: space-between; align-items: center; padding-bottom: 16px; border-bottom: 1px solid rgba(255,255,255,0.1); margin-bottom: 24px; }
    h2 { margin: 0; font-weight: 700; color: white; }
    .dialog-form { display: flex; flex-direction: column; gap: 8px; padding-top: 8px; }
    .full-width { width: 100%; }
    .dialog-actions { padding: 16px 0 0; }
    button[mat-flat-button] { border-radius: 12px; font-weight: 600; padding: 0 24px; }
  `]
})
export class AssignMarksDialogComponent {
  markForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AssignMarksDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.markForm = this.fb.group({
      subjectId: ['', Validators.required],
      marks: ['', [Validators.required, Validators.min(0), Validators.max(100)]]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.dialogRef.close(this.markForm.value);
  }
}
