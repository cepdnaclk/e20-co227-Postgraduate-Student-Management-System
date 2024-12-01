// src/app/afterlog/afterlog-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { StudentDashboardComponent } from './student/student-dashboard/student-dashboard.component';
import { SupervisorDashboardComponent } from './supervisor/supervisor-dashboard/supervisor-dashboard.component';
import { EnrolledStudentsComponent } from './admin/enrolled-students/enrolled-students.component';
import { RolesMainComponent } from './roles-main/roles-main.component';
import { StudentsToAdminComponent } from './admin/students-to-admin/students-to-admin.component';
import { SupervisorsToAdminComponent } from './admin/supervisors-to-admin/supervisors-to-admin.component';
import { ExaminersToAdminComponent } from './admin/examiners-to-admin/examiners-to-admin.component';
import { StudentProfileToAdminComponent } from './admin/student-profile-to-admin/student-profile-to-admin.component';
import { StudentResearchComponent } from './student/student-research/student-research.component';
import { StudentCoursesComponent } from './student/student-courses/student-courses.component';
import { ExaminerDashboardComponent } from './examiner/examiner-dashboard/examiner-dashboard.component';
import { SuperviseesComponent } from './supervisor/supervisees/supervisees.component';
import { StudentProfileToSupervisorComponent } from './supervisor/student-profile-to-supervisor/student-profile-to-supervisor.component';
import { StudentsToExaminerComponent } from './examiner/students-to-examiner/students-to-examiner.component';
import { StudentProfileToExaminerComponent } from './examiner/student-profile-to-examiner/student-profile-to-examiner.component';
import { EditProfileComponent } from './shared/edit-profile/edit-profile.component';
import { FeedbackPageComponent } from './shared/tiles-and-inside/feedback-page/feedback-page.component';
import { AssignmentSubmissionComponent } from './shared/tiles-and-inside/assignment-submission/assignment-submission.component';
import { EditProfileForStaffComponent } from './shared/edit-profile-for-staff/edit-profile-for-staff.component';
import { HomeForRolesComponent } from './shared/home-for-roles/home-for-roles.component';
import { AssignedSupervisorsToAdminComponent } from './admin/assigned-supervisors-to-admin/assigned-supervisors-to-admin.component';
import { AssignedExaminersToAdminComponent } from './admin/assigned-examiners-to-admin/assigned-examiners-to-admin.component';
import { ReportSubmissionsToAdminComponent } from './admin/report-submissions-to-admin/report-submissions-to-admin.component';
import { VivasToAdminComponent } from './admin/vivas-to-admin/vivas-to-admin.component';
import { FinalAssignmentSubmissionComponent } from './shared/tiles-and-inside/final-assignment-submission/final-assignment-submission.component';
import { VivaPageComponent } from './shared/tiles-and-inside/viva-page/viva-page.component';
import { SupervisorExaminerDashboardComponent } from './supervisor-examiner/supervisor-examiner-dashboard/supervisor-examiner-dashboard.component';
import { PasswordChangeComponent } from '../shared/password-change/password-change.component';
import { EnrolledStudentsDetailsPopupComponent } from './admin/enrolled-students-details-popup/enrolled-students-details-popup.component';
import { AllNotificationsComponent } from './shared/all-notifications/all-notifications.component';
import { MphilPhdResearchComponent } from '../shared/details/mphil-phd-research/mphil-phd-research.component';
import { EmailsPageComponent } from './admin/emails-page/emails-page.component';
// import { RoleGuardService as RoleGuard } from '../shared/services/role-guard.service';

const routes: Routes = [
  {
    path: '',
    component: RolesMainComponent,
    children: [
      // Admin
      { path: 'admin-dashboard', component: AdminDashboardComponent },
      { path: 'students-to-admin', component: StudentsToAdminComponent },
      { path: 'enrolled-students', component: EnrolledStudentsComponent },
      { path: 'supervisors-to-admin', component: SupervisorsToAdminComponent },
      { path: 'examiners-to-admin', component: ExaminersToAdminComponent },
      { path: 'student-profile-to-admin', component: StudentProfileToAdminComponent },
      { path: 'student-profile-to-admin/:regNumber', component: StudentProfileToAdminComponent },
      { path: 'assigned-supervisors-to-admin', component: AssignedSupervisorsToAdminComponent },
      { path: 'assigned-examiners-to-admin', component: AssignedExaminersToAdminComponent },
      { path: 'report-submissions-to-admin', component: ReportSubmissionsToAdminComponent },
      { path: 'vivas-to-admin', component: VivasToAdminComponent },
      { path: 'emails-page', component: EmailsPageComponent },

      // Student
      { path: 'student-dashboard', component: StudentDashboardComponent },
      { path: 'student-research', component: StudentResearchComponent },
      { path: 'student-courses', component: StudentCoursesComponent },
      { path: 'edit-profile', component: EditProfileComponent },

      // Supervisor
      { path: 'supervisor-dashboard', component: SupervisorDashboardComponent },
      { path: 'supervisees', component: SuperviseesComponent },
      { path: 'student-profile-to-supervisor', component: StudentProfileToSupervisorComponent },

      // Examiner
      { path: 'examiner-dashboard', component: ExaminerDashboardComponent },
      { path: 'students-to-examiner', component: StudentsToExaminerComponent },
      { path: 'student-profile-to-examiner', component: StudentProfileToExaminerComponent },
      { path: 'student-profile-to-examiner/:regNumber', component: StudentProfileToExaminerComponent },
      { path: 'enrolled-students-details-popup', component: EnrolledStudentsDetailsPopupComponent },
      { path: 'enrolled-students-details-popup/:id', component: EnrolledStudentsDetailsPopupComponent },

      // Supervisor-Examiner
      { path: 'supervisor-examiner-dashboard', component: SupervisorExaminerDashboardComponent},


      { path: 'home-for-roles', component: HomeForRolesComponent },
      { path: 'edit-profile-for-staff', component: EditProfileForStaffComponent },
      { path: 'feedback-page', component: FeedbackPageComponent },
      { path: 'feedback-page/:id', component: FeedbackPageComponent },
      { path: 'assignment-submission', component: AssignmentSubmissionComponent },
      { path: 'assignment-submission/:id', component: AssignmentSubmissionComponent },
      { path: 'final-assignment-submission', component: FinalAssignmentSubmissionComponent },
      { path: 'final-assignment-submission/:id', component: FinalAssignmentSubmissionComponent },
      { path: 'viva-page', component: VivaPageComponent },
      { path: 'viva-page/:id', component: VivaPageComponent },
      { path: 'all-notifications', component: AllNotificationsComponent },

      { path: 'password-change', component: PasswordChangeComponent },
      { path: 'mphil-phd-research', component: MphilPhdResearchComponent }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AfterlogRoutingModule { }
