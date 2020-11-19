import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<FileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) { }

  ngOnInit() {
  }

}
