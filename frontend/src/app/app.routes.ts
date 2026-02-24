import { Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/login/login';
import { DashboardComponent as AdminDashboard } from './modules/admin/dashboard/dashboard';
import { DashboardComponent as TeacherDashboard } from './modules/teacher/dashboard/dashboard';
import { DashboardComponent as StudentDashboard } from './modules/student/dashboard/dashboard';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { 
    path: 'admin', 
    component: AdminDashboard,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['Admin'] }
  },
  { 
    path: 'teacher', 
    component: TeacherDashboard,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['Teacher'] }
  },
  { 
    path: 'student', 
    component: StudentDashboard,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['Student'] }
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];
