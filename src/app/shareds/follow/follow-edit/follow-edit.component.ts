import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { FollowService } from 'src/app/services/follow.service';

@Component({
  selector: 'app-follow-edit',
  templateUrl: './follow-edit.component.html',
  styleUrls: ['./follow-edit.component.css']
})
export class FollowEditComponent implements OnInit {

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<FollowEditComponent>,
    private _followService: FollowService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
  ) { }

  ngOnInit(): void {
    console.log('data', this.data)
  }

  actualizarSeguimiento(f: NgForm) {

    console.log('DATA TO UPDATE', this.data);

    this._followService.updateFollow(this.data.follow._id, this.data.follow).subscribe(
      response => {
        console.log('RESPONSE', response);
        this._bottomSheetRef.dismiss();
      },
      error => {
        console.log('ERROR', error)
      }
    )
  }

  cancelar() {
    this._bottomSheetRef.dismiss();
  }

}
