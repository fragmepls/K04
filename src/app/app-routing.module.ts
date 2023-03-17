import { ThemesListComponent } from './themes-list/themes-list.component';
import { NotesListComponent } from './notes-list/notes-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: NotesListComponent, pathMatch: 'full' },
  { path: 'notesList/:sortorder', component: NotesListComponent },
  { path: 'themesList', component: ThemesListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
