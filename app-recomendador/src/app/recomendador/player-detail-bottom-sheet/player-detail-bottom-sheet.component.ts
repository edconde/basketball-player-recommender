import { Component, Inject, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { IPlayer } from 'src/app/models/player.model';

@Component({
  selector: 'app-player-detail-bottom-sheet',
  templateUrl: './player-detail-bottom-sheet.component.html',
  styleUrls: ['./player-detail-bottom-sheet.component.scss']
})
export class PlayerDetailBottomSheetComponent implements OnInit {

  public player: IPlayer | undefined;

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: { player: IPlayer }) {
    this.player = data.player;
  }

  ngOnInit(): void {
    console.log(this.data.player['Plus/Minus C Cluster 0'] / (this.data.player['Shared Time C Cluster 0'] / 60) * 36);
    console.log(this.data.player['Plus/Minus C Cluster 1'] / (this.data.player['Shared Time C Cluster 1'] / 60) * 36);
    console.log(this.data.player['Plus/Minus C Cluster 2'] / (this.data.player['Shared Time C Cluster 2'] / 60) * 36);
    console.log(this.data.player['Plus/Minus C Cluster 3'] / (this.data.player['Shared Time C Cluster 3'] / 60) * 36);
  }

}
