import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-case',
  templateUrl: './confirmation-case.component.html',
  styleUrls: ['./confirmation-case.component.css']
})
export class ConfirmationCaseComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmationCaseComponent>,
    @Inject(MAT_DIALOG_DATA) public result: string
  ) { }

  ngOnInit(): void {
  }

  registrarConfirmacion() {
    this.dialogRef.close(this.result)
    
  }
}
