import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../../services/data.service';
import { AuthService } from '../../../services/auth.service';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';
import { AddSubjectDialogComponent } from '../add-subject-dialog/add-subject-dialog.component';
import { AddGradeDialogComponent } from '../add-grade-dialog/add-grade-dialog.component';

import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule, 
    MatTabsModule, 
    MatTableModule, 
    MatButtonModule, 
    MatDialogModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  teachers: any[] = [];
  students: any[] = [];
  subjects: any[] = [];
  grades: any[] = [];

  constructor(
    private dataService: DataService, 
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.dataService.getTeachers().subscribe((data: any[]) => {
      this.teachers = data;
      this.cdr.detectChanges();
    });
    this.dataService.getStudents().subscribe((data: any[]) => {
      this.students = data;
      this.cdr.detectChanges();
    });
    this.dataService.getSubjects().subscribe((data: any[]) => {
      this.subjects = data;
      this.cdr.detectChanges();
    });
    this.dataService.getGrades().subscribe((data: any[]) => {
      this.grades = data;
      this.cdr.detectChanges();
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  addTeacher() {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '400px',
      data: { role: 'Teacher' }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.dataService.addTeacher(result).subscribe(() => this.loadData());
      }
    });
  }

  deleteTeacher(id: string) {
    if (confirm('Are you sure you want to delete this teacher?')) {
      this.dataService.deleteTeacher(id).subscribe(() => this.loadData());
    }
  }

  editTeacher(teacher: any) {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '400px',
      data: { role: 'Teacher', user: teacher }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.dataService.updateTeacher(teacher._id, result).subscribe(() => this.loadData());
      }
    });
  }

  addStudent() {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '400px',
      data: { role: 'Student' }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.dataService.addStudent(result).subscribe(() => this.loadData());
      }
    });
  }

  editStudent(student: any) {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '400px',
      data: { role: 'Student', user: student }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.dataService.updateStudent(student._id, result).subscribe(() => this.loadData());
      }
    });
  }

  deleteStudent(id: string) {
    if (confirm('Are you sure you want to delete this student?')) {
      this.dataService.deleteStudent(id).subscribe(() => this.loadData());
    }
  }

  addSubject() {
    const dialogRef = this.dialog.open(AddSubjectDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.dataService.addSubject(result).subscribe(() => this.loadData());
      }
    });
  }

  editSubject(subject: any) {
    const dialogRef = this.dialog.open(AddSubjectDialogComponent, {
      width: '400px',
      data: { subject }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.dataService.updateSubject(subject._id, result).subscribe(() => this.loadData());
      }
    });
  }

  deleteSubject(id: string) {
    if (confirm('Are you sure you want to delete this subject?')) {
      this.dataService.deleteSubject(id).subscribe(() => this.loadData());
    }
  }

  addGrade() {
    const dialogRef = this.dialog.open(AddGradeDialogComponent, {
      width: '600px',
      data: { teachers: this.teachers, students: this.students, subjects: this.subjects }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.dataService.addGrade(result).subscribe(() => this.loadData());
      }
    });
  }

  editGrade(grade: any) {
    const dialogRef = this.dialog.open(AddGradeDialogComponent, {
      width: '600px',
      data: { 
        grade,
        teachers: this.teachers, 
        students: this.students, 
        subjects: this.subjects 
      }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.dataService.updateGrade(grade._id, result).subscribe(() => this.loadData());
      }
    });
  }

  deleteGrade(id: string) {
    if (confirm('Are you sure you want to delete this class?')) {
      this.dataService.deleteGrade(id).subscribe(() => this.loadData());
    }
  }
}
