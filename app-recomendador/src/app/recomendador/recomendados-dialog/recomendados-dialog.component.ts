import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IPlayer, IPlayerRecomendado } from 'src/app/models/player.model';

@Component({
  selector: 'app-recomendados-dialog',
  templateUrl: './recomendados-dialog.component.html',
  styleUrls: ['./recomendados-dialog.component.scss']
})
export class RecomendadosDialogComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns = ['Name', 'Compatibilidad', 'Valoracion'];
  dataSource: MatTableDataSource<IPlayerRecomendado>;
  positions = {
    'PG': 'Base',
    'SG': 'Escolta',
    'SF': 'Alero',
    'PF': 'Ala-pívot',
    'C': 'Pívot'
  };
  positionName: string;
  colors = ['FF0000','FF3300','FF6600','FF9900','FFCC00','FFFF00','CCFF00','99FF00','66FF00','33FF00','00FF00'];

  constructor(@Inject(MAT_DIALOG_DATA) public data: { player: IPlayer, position: string, players: Array<IPlayerRecomendado> }, private _bottomSheet: MatBottomSheet) {
    this.dataSource = new MatTableDataSource(data.players);
    this.positionName = (this.positions as any)[data.position];
  }

  ngOnInit(): void {
  }
  
  ngAfterViewInit() {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sortingDataAccessor = (item, property) => {
        switch(property) {
          case 'Name':
            return item['Score'] * item['Overall'];
          case 'Compatibilidad':
            return item['Score'];
          case 'Valoracion':
            return item['Overall'];
          default:
            return (item as any)[property];
        }
      };
      this.dataSource.sort = this.sort;
    });
  }

  getColor(row: IPlayerRecomendado): string {
    const value = row.Score * row.Overall;
    return `#${this.colors[Math.ceil(value/10)]}`;
  }

}
