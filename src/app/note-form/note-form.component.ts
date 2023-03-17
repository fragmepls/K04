import { Note } from './../shared/note';
import { DbService } from './../shared/db.service';
import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Theme } from '../shared/theme';
import { ThemeFormComponent } from '../theme-form/theme-form.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'no-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.scss'],
})
export class NoteFormComponent implements OnInit {
  themes: Array<Theme> = [];

  note!: Note;

  noteForm!: FormGroup;

  currentDate = new Date();

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private db: DbService,
    public dialogRef: MatDialogRef<ThemeFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.db.getThemes().then((response) => (this.themes = response));

    if (!this.data.new) {
      this.note = this.data.note;
    } else {
      this.note = Note.empty();
    }

    this.noteForm = this.fb.group({
      title: [this.note.title, Validators.required],
      theme: [this.note.theme?.description, Validators.required],
      text: [this.note.text],
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ThemeFormComponent, {
      width: '240px',
      data: { new: true },
    });

    dialogRef.afterClosed().subscribe((data) => {
      this.db.getThemes().then((response) => (this.themes = response));
      if (data  ) this.noteForm.controls.theme.setValue(data.description);
    });
  }

  register() {
    if (!this.data.new) {
      this.data.note.title = this.noteForm.value.title;
      this.data.note.text = this.noteForm.value.text;
      this.db
        .getThemeByDescription(this.noteForm.value.theme)
        .then((theme) => {
          this.data.note.theme = theme;
          this.db.updateNote(this.data.note).then(() => {
            console.log('123');
            this.dialogRef.close();
          });
        })
        .catch(() => console.log('error'));
    } else {
      var note: Note = Note.empty();
      note.title = this.noteForm.value.title;
      note.text = this.noteForm.value.text;

      this.db.getThemeByDescription(this.noteForm.value.theme).then((theme) => {
        note.theme = theme;
        this.db.addNote(note).then(() => {
          this.dialogRef.close(note);
        });
      });
    }
  }

  remove() {
    this.db.deleteNote(this.note).then(() => {
      this.dialogRef.close();
    }).catch(() => alert("Note cant be deleted"));
  }
}
