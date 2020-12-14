import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-collaborator-result',
  templateUrl: './collaborator-result.component.html',
  styleUrls: ['./collaborator-result.component.css']
})
export class CollaboratorResultComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CollaboratorResultComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    console.log('RESULTADO', this.data)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}