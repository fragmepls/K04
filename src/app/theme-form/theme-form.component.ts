import { MyValidators } from './../shared/my-validators';
import { Theme } from './../shared/theme';
import { DbService } from './../shared/db.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'no-theme-form',
  templateUrl: './theme-form.component.html',
  styleUrls: ['./theme-form.component.scss'],
})
export class ThemeFormComponent implements OnInit {
  themeForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ThemeFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private db: DbService
  ) {}

  ngOnInit(): void {
    const theme: Theme = Theme.empty();

    this.themeForm = this.fb.group({
      description: [theme.description, Validators.required, MyValidators.themeExists(this.db)],
    });
  }

  register() {
    if (!this.data.new) {
      this.data.theme.description = this.themeForm.value.description;
      this.db
        .updateTheme(this.data.theme)
        .then(() => {
          this.dialogRef.close();
        })
    } else {
      var theme: Theme = Theme.empty();
      theme.description = this.themeForm.value.description;
      this.db.addTheme(theme).then(() => {
        this.dialogRef.close(theme);
      });
    }
  }

  remove() {
    this.data.theme.description = this.themeForm.value.description;
    this.db.deleteTheme(this.data.theme).then(() => {
      this.dialogRef.close();
    }).catch(() => alert("Theme cant be deleted because it is used in some Notes"));
  }
}
