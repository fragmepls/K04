import { ThemeFormComponent } from './../theme-form/theme-form.component';
import { Component, OnInit } from '@angular/core';
import { Theme } from '../shared/theme';
import { MatDialog } from '@angular/material/dialog';
import { DbService } from '../shared/db.service';

@Component({
  selector: 'no-themes-list',
  templateUrl: './themes-list.component.html',
  styleUrls: ['./themes-list.component.scss'],
})
export class ThemesListComponent implements OnInit {
  themes: Array<Theme> = [];
  dialogRef: any;

  constructor(public dialog: MatDialog, private db: DbService) {}

  ngOnInit(): void {
    this.db.getThemes().then((response) => (this.themes = response));
  }

  openDialog(): void {
    this.dialogRef = this.dialog.open(ThemeFormComponent, {
      width: '240px',
      data: { new: true },
    });

    this.dialogRef.afterClosed().subscribe(() => {
      this.db.getThemes().then((response) => (this.themes = response));
    });
  }

  changeTheme(theme: Theme) {
    this.dialogRef = this.dialog.open(ThemeFormComponent, {
      width: '285px',
      data: { new: false, theme: theme },
    });

    this.dialogRef.afterClosed().subscribe(() => {
      this.db.getThemes().then((response) => (this.themes = response));
    });
  }
}
