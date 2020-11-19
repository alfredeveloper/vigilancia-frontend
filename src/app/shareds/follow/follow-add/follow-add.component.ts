import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Follow } from 'src/app/models/follow';
import { FollowService } from 'src/app/services/follow.service';

@Component({
  selector: 'app-follow-add',
  templateUrl: './follow-add.component.html',
  styleUrls: ['./follow-add.component.css']
})
export class FollowAddComponent implements OnInit {

  follow: Follow;

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<FollowAddComponent>,
    private _followService: FollowService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
  ) { 
    this.follow = new Follow(0,false,false,false,false,false,false,false,false,false,false,false,false,false,false,'','',false,false,false,null);
  }

  ngOnInit(): void {
  }

  registrarSeguimiento(f:NgForm) {
    this.follow.patient = this.data.patient_id;
    console.log('SEGUIMIENTO', this.follow);

    this._followService.registerFollow(this.follow).subscribe(
      response => {
        console.log('RESPONSE', response)
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
