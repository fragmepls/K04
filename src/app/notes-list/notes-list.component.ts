import { DbService } from './../shared/db.service';
import { NoteFormComponent } from './../note-form/note-form.component';
import { Note } from './../shared/note';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Theme } from '../shared/theme';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'no-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss'],
})
export class NotesListComponent implements OnInit {
  notes: Array<Note> = [];
  sortOrder!: string;

  constructor(
    public dialog: MatDialog,
    public route: ActivatedRoute,
    public db: DbService
  ) {
    this.route.params.subscribe((params) => {
      this.sortOrder = params.sortorder;
      this.db
        .getNotesByTheme(this.sortOrder)
        .then((response) => (this.notes = response));
    });
  }

  ngOnInit(): void {}

  openDialog(): void {
    const dialogRef = this.dialog.open(NoteFormComponent, {
      width: '1000px',
      data: { new: true },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.db
        .getNotesByTheme(this.sortOrder)
        .then((response) => (this.notes = response));
    });
  }

  changeNote(note: Note) {
    const dialogRef = this.dialog.open(NoteFormComponent, {
      width: '1000px',
      data: { new: false, note: note },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.db
        .getNotesByTheme(this.sortOrder)
        .then((response) => (this.notes = response));
    });
  }
}
