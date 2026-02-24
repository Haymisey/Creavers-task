import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../../services/data.service';
import { AuthService } from '../../../services/auth.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { AssignMarksDialogComponent } from '../assign-marks-dialog/assign-marks-dialog.component';

import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-teacher-dashboard',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatTableModule, MatDialogModule, MatIconModule, MatCardModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  assignedGrades: any[] = [];
  subjects: any[] = [];

  constructor(
    private dataService: DataService,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.dataService.getAssignedStudents().subscribe((data: any[]) => {
      this.assignedGrades = data;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  getTeacherSubjectsForGrade(grade: any) {
    const userId = this.authService.currentUserValue?._id;
    return grade.subjectTeachers
      .filter((st: any) => (st.teacher?._id || st.teacher) === userId)
      .map((st: any) => st.subject);
  }

  assignMarks(student: any, grade: any) {
    const teacherSubjects = this.getTeacherSubjectsForGrade(grade);
    
    const dialogRef = this.dialog.open(AssignMarksDialogComponent, {
      width: '400px',
      data: { student, subjects: teacherSubjects }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.dataService.assignMarks({
          studentId: student._id,
          gradeId: grade._id,
          subjectId: result.subjectId,
          marks: result.marks
        }).subscribe(() => {
          // Success
        });
      }
    });
  }
}
