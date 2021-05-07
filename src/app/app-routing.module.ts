import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { UserListComponent } from './user-list/user-list.component';
import { TaskListComponent } from './task-list/task-list.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { CreateTaskComponent } from './create-task/create-task.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},  
  { path: 'login', component: LoginComponent },
  {path: 'projects',component: ProjectListComponent},
  {path: 'users',component: UserListComponent},
  {path: 'tasks',component:  TaskListComponent},
  {path: 'createUser', component: CreateUserComponent},
  {path: 'createTask', component: CreateTaskComponent},
  {path: 'createProject', component: CreateProjectComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
