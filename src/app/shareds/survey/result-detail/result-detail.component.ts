import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-result-detail',
  templateUrl: './result-detail.component.html',
  styleUrls: ['./result-detail.component.css']
})
export class ResultDetailComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ResultDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
