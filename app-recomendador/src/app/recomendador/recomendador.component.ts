import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IPlayer } from '../models/player.model';
import { PlayerDetailBottomSheetComponent } from './player-detail-bottom-sheet/player-detail-bottom-sheet.component';
import { RecomendadosDialogComponent } from './recomendados-dialog/recomendados-dialog.component';
import { RecomendadorService } from './services/recomendador.service';

@Component({
  selector: 'app-recomendador',
  templateUrl: './recomendador.component.html',
  styleUrls: ['./recomendador.component.scss']
})
export class RecomendadorComponent implements AfterViewInit {

  displayedColumns: string[] = ['Imagen', 'Name', 'Team', 'Position', 'Overall', 'Outside Scoring', 'Inside Scoring', 'Defending', 'Athleticism', 'Playmaking', 'Rebounding'/*, 'Detalle'*/, 'Compatibles'];
  dataSource: MatTableDataSource<IPlayer>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private recomendadorService: RecomendadorService, private dialog: MatDialog, private _bottomSheet: MatBottomSheet) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource<IPlayer>([]);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.recomendadorService.findAllPlayers().subscribe({ next: (v) => this.setDatasource(v) } );
  }

  setDatasource(data: Array<IPlayer>) {
    data.forEach(player => {
      let duplicate = data.find(p => p.Name === player.Name && data.indexOf(p) !== data.indexOf(player));
      if(duplicate) {
        player.Position += ` / ${duplicate.Position}`;
        data.splice(data.indexOf(duplicate), 1);
      }
    });
    this.dataSource = new MatTableDataSource(data);
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    this.filterData((event.target as HTMLInputElement).value);
  }

  filterData(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  buscarCompatibles(row: IPlayer, position: string): void {
    this.recomendadorService.findCompatibles(row._id, position).subscribe({
      next: (v) => this.dialog.open(RecomendadosDialogComponent, { data: { player: row, position: position, players: v }, panelClass: 'no-padding', autoFocus: false })
    });
  }

  verDetalle(row: IPlayer): void {
    this._bottomSheet.open(PlayerDetailBottomSheetComponent, { data: { player: row } });
  }

}
