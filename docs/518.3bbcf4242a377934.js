"use strict";(self.webpackChunkapp_recomendador=self.webpackChunkapp_recomendador||[]).push([[518],{7518:(Nt,Z,d)=>{d.r(Z),d.d(Z,{RecomendadorModule:()=>Dt});var T=d(1659),u=d(1341),s=d(2262),c=d(960),_=d(8173),t=d(3668);let S=(()=>{class e{constructor(o){this.data=o,this.player=o.player}ngOnInit(){console.log(this.data.player["Plus/Minus C Cluster 0"]/(this.data.player["Shared Time C Cluster 0"]/60)*36),console.log(this.data.player["Plus/Minus C Cluster 1"]/(this.data.player["Shared Time C Cluster 1"]/60)*36),console.log(this.data.player["Plus/Minus C Cluster 2"]/(this.data.player["Shared Time C Cluster 2"]/60)*36),console.log(this.data.player["Plus/Minus C Cluster 3"]/(this.data.player["Shared Time C Cluster 3"]/60)*36)}}return e.\u0275fac=function(o){return new(o||e)(t.Y36(_.OG))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-player-detail-bottom-sheet"]],decls:2,vars:0,template:function(o,a){1&o&&(t.TgZ(0,"p"),t._uU(1,"player-detail-bottom-sheet works!"),t.qZA())},styles:[""]}),e})();var f=d(5304),b=d(4377),g=d(6019);function D(e,n){1&e&&(t.TgZ(0,"th",13),t._uU(1," \xcdndice de recomendaci\xf3n "),t.qZA())}function M(e,n){if(1&e&&(t.TgZ(0,"td",14),t._uU(1),t._UZ(2,"span",15),t.ALo(3,"number"),t.qZA()),2&e){const o=n.$implicit,a=t.oxw();t.xp6(1),t.hij("",o.Name," "),t.xp6(1),t.Udp("color",a.getColor(o)),t.s9C("matBadge",t.xi3(3,4,o.Score*o.Overall/10,"1.1-1"))}}function N(e,n){1&e&&(t.TgZ(0,"th",16),t._uU(1," Recomendado "),t.qZA())}function P(e,n){if(1&e&&(t.TgZ(0,"td",14),t._uU(1),t.ALo(2,"number"),t.qZA()),2&e){const o=n.$implicit,a=t.oxw();t.Udp("color",a.getColor(o)),t.xp6(1),t.hij(" ",t.xi3(2,3,o.Score*o.Overall,"1.2-2")," ")}}function U(e,n){1&e&&(t.TgZ(0,"th",16),t._uU(1," Compatibilidad en juego "),t.qZA())}function w(e,n){if(1&e&&(t.TgZ(0,"td",14),t._uU(1),t.ALo(2,"number"),t.qZA()),2&e){const o=n.$implicit;t.xp6(1),t.hij(" ",t.xi3(2,1,o.Score,"1.2-2")," ")}}function O(e,n){1&e&&(t.TgZ(0,"th",16),t._uU(1," Valoraci\xf3n "),t.qZA())}function F(e,n){if(1&e&&(t.TgZ(0,"td",14),t._uU(1),t.qZA()),2&e){const o=n.$implicit;t.xp6(1),t.hij(" ",o.Overall," ")}}function Y(e,n){1&e&&t._UZ(0,"tr",17)}function q(e,n){1&e&&t._UZ(0,"tr",18)}const k=function(){return[5,10,15,20]};let B=(()=>{class e{constructor(o,a){this.data=o,this._bottomSheet=a,this.displayedColumns=["Name","Compatibilidad","Valoracion"],this.positions={PG:"Base",SG:"Escolta",SF:"Alero",PF:"Ala-p\xedvot",C:"P\xedvot"},this.colors=["FF0000","FF3300","FF6600","FF9900","FFCC00","FFFF00","CCFF00","99FF00","66FF00","33FF00","00FF00"],this.dataSource=new c.by(o.players),this.positionName=this.positions[o.position]}ngOnInit(){}ngAfterViewInit(){setTimeout(()=>{this.dataSource.paginator=this.paginator,this.dataSource.sortingDataAccessor=(o,a)=>{switch(a){case"Name":return o.Score*o.Overall;case"Compatibilidad":return o.Score;case"Valoracion":return o.Overall;default:return o[a]}},this.dataSource.sort=this.sort})}getColor(o){return`#${this.colors[Math.ceil(o.Score*o.Overall/10)]}`}}return e.\u0275fac=function(o){return new(o||e)(t.Y36(f.WI),t.Y36(_.ch))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-recomendados-dialog"]],viewQuery:function(o,a){if(1&o&&(t.Gf(u.NW,5),t.Gf(s.YE,5)),2&o){let i;t.iGM(i=t.CRH())&&(a.paginator=i.first),t.iGM(i=t.CRH())&&(a.sort=i.first)}},decls:21,vars:10,consts:[["mat-dialog-title",""],["mat-table","","matSort","","matSortActive","Name","matSortDirection","desc","matSortStart","desc",3,"dataSource"],["matColumnDef","Name"],["mat-header-cell","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","Recomendacion"],["mat-header-cell","","mat-sort-header","",4,"matHeaderCellDef"],["mat-cell","",3,"color",4,"matCellDef"],["matColumnDef","Compatibilidad"],["matColumnDef","Valoracion"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],["showFirstLastButtons","","aria-label","Select page of players",3,"pageSizeOptions","pageSize"],["mat-header-cell",""],["mat-cell",""],[3,"matBadge"],["mat-header-cell","","mat-sort-header",""],["mat-header-row",""],["mat-row",""]],template:function(o,a){1&o&&(t.TgZ(0,"div",0),t.TgZ(1,"h2"),t._uU(2),t.qZA(),t.TgZ(3,"h3"),t._uU(4),t.qZA(),t.qZA(),t.TgZ(5,"table",1),t.ynx(6,2),t.YNc(7,D,2,0,"th",3),t.YNc(8,M,4,7,"td",4),t.BQk(),t.ynx(9,5),t.YNc(10,N,2,0,"th",6),t.YNc(11,P,3,6,"td",7),t.BQk(),t.ynx(12,8),t.YNc(13,U,2,0,"th",6),t.YNc(14,w,3,4,"td",4),t.BQk(),t.ynx(15,9),t.YNc(16,O,2,0,"th",6),t.YNc(17,F,2,1,"td",4),t.BQk(),t.YNc(18,Y,1,0,"tr",10),t.YNc(19,q,1,0,"tr",11),t.qZA(),t._UZ(20,"mat-paginator",12)),2&o&&(t.xp6(2),t.AsE("",a.data.player.Name," (",a.data.player.Position,")"),t.xp6(2),t.AsE("Compatibilidad con jugadores con posici\xf3n ",a.data.position," (",a.positionName,")"),t.xp6(1),t.Q6J("dataSource",a.dataSource),t.xp6(13),t.Q6J("matHeaderRowDef",a.displayedColumns),t.xp6(1),t.Q6J("matRowDefColumns",a.displayedColumns),t.xp6(1),t.Q6J("pageSizeOptions",t.DdM(9,k))("pageSize",10))},directives:[f.uh,c.BZ,s.YE,c.w1,c.fO,c.Dz,c.as,c.nj,u.NW,c.ge,c.ev,b.k,s.nU,c.XQ,c.Gk],pipes:[g.JJ],styles:[".mat-dialog-title[_ngcontent-%COMP%]{margin:16px 0 0 16px}.mat-dialog-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], .mat-dialog-title[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{margin:0}table[_ngcontent-%COMP%]   th.mat-header-cell[_ngcontent-%COMP%]{padding:0 8px;text-align:center}table[_ngcontent-%COMP%]   th.mat-header-cell[_ngcontent-%COMP%]     .mat-sort-header-container{justify-content:center}table[_ngcontent-%COMP%]   td.mat-cell[_ngcontent-%COMP%]{text-align:center}table[_ngcontent-%COMP%]   td.mat-cell[_ngcontent-%COMP%]   .mat-badge[_ngcontent-%COMP%]{left:16px;top:8px}table[_ngcontent-%COMP%]   td.mat-cell[_ngcontent-%COMP%]   .mat-badge[_ngcontent-%COMP%]   .mat-badge-content[_ngcontent-%COMP%]{color:inherit}"]}),e})();var v=d(4522),h=d(4753),Q=d(3067),R=d(8260);let E=(()=>{class e{constructor(o){this.http=o,this.usesMock=!1,R.N.apiRootUrl?this.serviceUrl=R.N.apiRootUrl+"/players":this.usesMock=!0}getEndpoint(o){return o?this.serviceUrl+o:this.serviceUrl}findAllPlayers(){return this.http.get(this.usesMock?"assets/data/players.json":this.getEndpoint())}getById(o){return this.usesMock?this.findAllPlayers().pipe((0,h.U)(a=>{console.log(o);const i=a.find(r=>r._id.$oid===o.$oid);if(!i)throw new Error("Player not found");return i})):this.http.get(this.getEndpoint()+"/"+o)}findByPosition(o){return this.findAllPlayers().pipe((0,h.U)(a=>a.filter(i=>i.Position===o.toUpperCase())))}findCompatibles(o,a){if(this.usesMock){if(["PG","SG","SF","PF","C"].includes(a.toUpperCase()))return this.getById(o).pipe((0,Q.w)(i=>{const r=[i[`Compatibilidad ${a} Cluster 0`],i[`Compatibilidad ${a} Cluster 1`],i[`Compatibilidad ${a} Cluster 2`],i[`Compatibilidad ${a} Cluster 3`]];return this.findByPosition(a).pipe((0,h.U)(m=>{const p=m;p.forEach(l=>l.Score=this.calcularScore(l,r));const Mt=Math.max(...p.map(l=>l.Score)),A=Math.min(...p.map(l=>l.Score));return p.forEach(l=>l.Score=(l.Score-A)/(Mt-A)),p.sort((l,y)=>l.Score<y.Score?1:y.Score<l.Score?-1:0)}))}));throw new Error("La posici\xf3n no existe.")}return this.http.get(this.getEndpoint()+"/"+o+"/recomendaciones",{params:(new v.LE).set("position",a)})}calcularScore(o,a){let i=0;return a.filter(r=>r>2/3).forEach(r=>{const m=o[`Pertenencia Cluster ${a.indexOf(r)}`]*r;m>i&&(i=m)}),i}}return e.\u0275fac=function(o){return new(o||e)(t.LFG(v.eN))},e.\u0275prov=t.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),e})();var $=d(7964),C=d(8167),J=d(138),j=d(86),H=d(3660),x=d(5125);function I(e,n){1&e&&(t.TgZ(0,"div",2),t._UZ(1,"mat-progress-spinner",3),t.TgZ(2,"p"),t._uU(3,"Cargando informaci\xf3n de jugadores..."),t.qZA(),t.qZA()),2&e&&(t.xp6(1),t.Q6J("color","primary")("mode","indeterminate")("value","50"))}function G(e,n){if(1&e){const o=t.EpF();t.TgZ(0,"button",32),t.NdJ("click",function(){t.CHM(o),t.oxw();const i=t.MAs(5),r=t.oxw();return i.value="",r.filterData("")}),t.TgZ(1,"mat-icon"),t._uU(2,"close"),t.qZA(),t.qZA()}}function L(e,n){1&e&&t._UZ(0,"th",33)}function z(e,n){1&e&&(t.TgZ(0,"td",34),t.TgZ(1,"mat-icon"),t._uU(2,"person"),t.qZA(),t.qZA())}function V(e,n){1&e&&(t.TgZ(0,"th",35),t._uU(1," Nombre "),t.qZA())}function W(e,n){if(1&e&&(t.TgZ(0,"td",34),t._uU(1),t.qZA()),2&e){const o=n.$implicit;t.xp6(1),t.hij(" ",o.Name," ")}}function X(e,n){1&e&&(t.TgZ(0,"th",35),t._uU(1," Equipo "),t.qZA())}function K(e,n){if(1&e&&(t.TgZ(0,"td",34),t._uU(1),t.qZA()),2&e){const o=n.$implicit;t.xp6(1),t.hij(" ",o.Team," ")}}function tt(e,n){1&e&&(t.TgZ(0,"th",33),t._uU(1," Posici\xf3n "),t.qZA())}function et(e,n){if(1&e&&(t.TgZ(0,"td",34),t._uU(1),t.qZA()),2&e){const o=n.$implicit;t.xp6(1),t.hij(" ",o.Position," ")}}function ot(e,n){1&e&&(t.TgZ(0,"th",36),t._uU(1," Valoraci\xf3n "),t.qZA())}function nt(e,n){if(1&e&&(t.TgZ(0,"td",34),t._uU(1),t.qZA()),2&e){const o=n.$implicit;t.xp6(1),t.hij(" ",o.Overall," ")}}function at(e,n){1&e&&(t.TgZ(0,"th",36),t._uU(1," Anotaci\xf3n Exterior "),t.qZA())}function it(e,n){if(1&e&&(t.TgZ(0,"td",34),t._uU(1),t.ALo(2,"number"),t.qZA()),2&e){const o=n.$implicit;t.xp6(1),t.hij(" ",t.xi3(2,1,o["Outside Scoring"],"1.0-0")," ")}}function rt(e,n){1&e&&(t.TgZ(0,"th",36),t._uU(1," Anotaci\xf3n Interior "),t.qZA())}function ct(e,n){if(1&e&&(t.TgZ(0,"td",34),t._uU(1),t.ALo(2,"number"),t.qZA()),2&e){const o=n.$implicit;t.xp6(1),t.hij(" ",t.xi3(2,1,o["Inside Scoring"],"1.0-0")," ")}}function dt(e,n){1&e&&(t.TgZ(0,"th",36),t._uU(1," Defensa "),t.qZA())}function lt(e,n){if(1&e&&(t.TgZ(0,"td",34),t._uU(1),t.ALo(2,"number"),t.qZA()),2&e){const o=n.$implicit;t.xp6(1),t.hij(" ",t.xi3(2,1,o.Defending,"1.0-0")," ")}}function mt(e,n){1&e&&(t.TgZ(0,"th",36),t._uU(1," Capacidad atl\xe9tica "),t.qZA())}function st(e,n){if(1&e&&(t.TgZ(0,"td",34),t._uU(1),t.ALo(2,"number"),t.qZA()),2&e){const o=n.$implicit;t.xp6(1),t.hij(" ",t.xi3(2,1,o.Athleticism,"1.0-0")," ")}}function pt(e,n){1&e&&(t.TgZ(0,"th",36),t._uU(1," Playmaking "),t.qZA())}function ut(e,n){if(1&e&&(t.TgZ(0,"td",34),t._uU(1),t.ALo(2,"number"),t.qZA()),2&e){const o=n.$implicit;t.xp6(1),t.hij(" ",t.xi3(2,1,o.Playmaking,"1.0-0")," ")}}function _t(e,n){1&e&&(t.TgZ(0,"th",36),t._uU(1," Rebote "),t.qZA())}function ft(e,n){if(1&e&&(t.TgZ(0,"td",34),t._uU(1),t.ALo(2,"number"),t.qZA()),2&e){const o=n.$implicit;t.xp6(1),t.hij(" ",t.xi3(2,1,o.Rebounding,"1.0-0")," ")}}function gt(e,n){1&e&&(t.TgZ(0,"th",33),t._uU(1," Detalle "),t.qZA())}function ht(e,n){if(1&e){const o=t.EpF();t.TgZ(0,"td",34),t.TgZ(1,"button",37),t.NdJ("click",function(){const r=t.CHM(o).$implicit;return t.oxw(2).verDetalle(r)}),t.TgZ(2,"mat-icon",38),t._uU(3,"loupe"),t.qZA(),t.qZA(),t.qZA()}}function Ct(e,n){1&e&&(t.TgZ(0,"th",33),t._uU(1," Buscar compatibles "),t.qZA())}function xt(e,n){if(1&e){const o=t.EpF();t.TgZ(0,"td",34),t.TgZ(1,"button",39),t.TgZ(2,"mat-icon",38),t._uU(3,"groups"),t.qZA(),t.qZA(),t.TgZ(4,"mat-menu",null,40),t.TgZ(6,"button",41),t.NdJ("click",function(){const r=t.CHM(o).$implicit;return t.oxw(2).buscarCompatibles(r,"PG")}),t._uU(7,"PG (bases)"),t.qZA(),t.TgZ(8,"button",41),t.NdJ("click",function(){const r=t.CHM(o).$implicit;return t.oxw(2).buscarCompatibles(r,"SG")}),t._uU(9,"SG (escoltas)"),t.qZA(),t.TgZ(10,"button",41),t.NdJ("click",function(){const r=t.CHM(o).$implicit;return t.oxw(2).buscarCompatibles(r,"SF")}),t._uU(11,"SF (aleros)"),t.qZA(),t.TgZ(12,"button",41),t.NdJ("click",function(){const r=t.CHM(o).$implicit;return t.oxw(2).buscarCompatibles(r,"PF")}),t._uU(13,"PF (ala-p\xedvots)"),t.qZA(),t.TgZ(14,"button",41),t.NdJ("click",function(){const r=t.CHM(o).$implicit;return t.oxw(2).buscarCompatibles(r,"C")}),t._uU(15,"C (p\xedvots)"),t.qZA(),t.qZA(),t.qZA()}if(2&e){const o=t.MAs(5);t.xp6(1),t.Q6J("matMenuTriggerFor",o)}}function Zt(e,n){1&e&&t._UZ(0,"tr",42)}function Tt(e,n){1&e&&t._UZ(0,"tr",43)}function vt(e,n){if(1&e&&(t.TgZ(0,"tr",44),t.TgZ(1,"td",45),t._uU(2),t.qZA(),t.qZA()),2&e){t.oxw();const o=t.MAs(6);t.xp6(2),t.hij('No data matching the filter "',o.value,'"')}}const Rt=function(){return[5,10,25,100]};function At(e,n){if(1&e){const o=t.EpF();t.TgZ(0,"div",4),t.TgZ(1,"mat-form-field",5),t.TgZ(2,"mat-label"),t._uU(3,"Buscar por nombre, equipo..."),t.qZA(),t.TgZ(4,"input",6,7),t.NdJ("keyup",function(i){return t.CHM(o),t.oxw().applyFilter(i)}),t.qZA(),t.YNc(7,G,3,0,"button",8),t.qZA(),t.TgZ(8,"div",9),t.TgZ(9,"table",10),t.ynx(10,11),t.YNc(11,L,1,0,"th",12),t.YNc(12,z,3,0,"td",13),t.BQk(),t.ynx(13,14),t.YNc(14,V,2,0,"th",15),t.YNc(15,W,2,1,"td",13),t.BQk(),t.ynx(16,16),t.YNc(17,X,2,0,"th",15),t.YNc(18,K,2,1,"td",13),t.BQk(),t.ynx(19,17),t.YNc(20,tt,2,0,"th",12),t.YNc(21,et,2,1,"td",13),t.BQk(),t.ynx(22,18),t.YNc(23,ot,2,0,"th",19),t.YNc(24,nt,2,1,"td",13),t.BQk(),t.ynx(25,20),t.YNc(26,at,2,0,"th",19),t.YNc(27,it,3,4,"td",13),t.BQk(),t.ynx(28,21),t.YNc(29,rt,2,0,"th",19),t.YNc(30,ct,3,4,"td",13),t.BQk(),t.ynx(31,22),t.YNc(32,dt,2,0,"th",19),t.YNc(33,lt,3,4,"td",13),t.BQk(),t.ynx(34,23),t.YNc(35,mt,2,0,"th",19),t.YNc(36,st,3,4,"td",13),t.BQk(),t.ynx(37,24),t.YNc(38,pt,2,0,"th",19),t.YNc(39,ut,3,4,"td",13),t.BQk(),t.ynx(40,25),t.YNc(41,_t,2,0,"th",19),t.YNc(42,ft,3,4,"td",13),t.BQk(),t.ynx(43,26),t.YNc(44,gt,2,0,"th",12),t.YNc(45,ht,4,0,"td",13),t.BQk(),t.ynx(46,27),t.YNc(47,Ct,2,0,"th",12),t.YNc(48,xt,16,1,"td",13),t.BQk(),t.YNc(49,Zt,1,0,"tr",28),t.YNc(50,Tt,1,0,"tr",29),t.YNc(51,vt,3,1,"tr",30),t.qZA(),t._UZ(52,"mat-paginator",31),t.qZA(),t.qZA()}if(2&e){const o=t.MAs(5),a=t.oxw();t.xp6(7),t.Q6J("ngIf",o.value),t.xp6(2),t.Q6J("dataSource",a.dataSource),t.xp6(40),t.Q6J("matHeaderRowDef",a.displayedColumns),t.xp6(1),t.Q6J("matRowDefColumns",a.displayedColumns),t.xp6(2),t.Q6J("pageSizeOptions",t.DdM(6,Rt))("pageSize",10)}}const yt=[{path:"",component:(()=>{class e{constructor(o,a,i){this.recomendadorService=o,this.dialog=a,this._bottomSheet=i,this.displayedColumns=["Imagen","Name","Team","Position","Overall","Outside Scoring","Inside Scoring","Defending","Athleticism","Playmaking","Rebounding","Compatibles"],this.dataSource=new c.by([])}ngAfterViewInit(){this.dataSource.paginator=this.paginator,this.dataSource.sort=this.sort,this.recomendadorService.findAllPlayers().subscribe({next:o=>this.setDatasource(o)})}setDatasource(o){o.forEach(a=>{let i=o.find(r=>r.Name===a.Name&&o.indexOf(r)!==o.indexOf(a));i&&(a.Position+=` / ${i.Position}`,o.splice(o.indexOf(i),1))}),this.dataSource=new c.by(o),setTimeout(()=>{this.dataSource.paginator=this.paginator,this.dataSource.sort=this.sort})}applyFilter(o){this.filterData(o.target.value)}filterData(o){this.dataSource.filter=o.trim().toLowerCase(),this.dataSource.paginator&&this.dataSource.paginator.firstPage()}buscarCompatibles(o,a){this.recomendadorService.findCompatibles(o._id,a).subscribe({next:i=>this.dialog.open(B,{data:{player:o,position:a,players:i},panelClass:"no-padding",autoFocus:!1})})}verDetalle(o){this._bottomSheet.open(S,{data:{player:o}})}}return e.\u0275fac=function(o){return new(o||e)(t.Y36(E),t.Y36(f.uw),t.Y36(_.ch))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-recomendador"]],viewQuery:function(o,a){if(1&o&&(t.Gf(u.NW,5),t.Gf(s.YE,5)),2&o){let i;t.iGM(i=t.CRH())&&(a.paginator=i.first),t.iGM(i=t.CRH())&&(a.sort=i.first)}},decls:2,vars:2,consts:[["id","loading",4,"ngIf"],["id","recomendador-container",4,"ngIf"],["id","loading"],["id","spinner",3,"color","mode","value"],["id","recomendador-container"],["appearance","standard"],["matInput","","placeholder","Ej. Lakers",3,"keyup"],["filter","","input",""],["matSuffix","","mat-icon-button","","aria-label","Clear",3,"click",4,"ngIf"],[1,"mat-elevation-z8"],["mat-table","","matSort","","matSortActive","Team",3,"dataSource"],["matColumnDef","Imagen","sticky",""],["mat-header-cell","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","Name","sticky",""],["mat-header-cell","","mat-sort-header","",4,"matHeaderCellDef"],["matColumnDef","Team"],["matColumnDef","Position"],["matColumnDef","Overall"],["mat-header-cell","","mat-sort-header","","start","desc",4,"matHeaderCellDef"],["matColumnDef","Outside Scoring"],["matColumnDef","Inside Scoring"],["matColumnDef","Defending"],["matColumnDef","Athleticism"],["matColumnDef","Playmaking"],["matColumnDef","Rebounding"],["matColumnDef","Detalle"],["matColumnDef","Compatibles","stickyEnd",""],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],["class","mat-row",4,"matNoDataRow"],["showFirstLastButtons","","aria-label","Select page of players",3,"pageSizeOptions","pageSize"],["matSuffix","","mat-icon-button","","aria-label","Clear",3,"click"],["mat-header-cell",""],["mat-cell",""],["mat-header-cell","","mat-sort-header",""],["mat-header-cell","","mat-sort-header","","start","desc"],["mat-icon-button","",3,"click"],["color","primary"],["mat-icon-button","",3,"matMenuTriggerFor"],["menu","matMenu"],["mat-menu-item","",3,"click"],["mat-header-row",""],["mat-row",""],[1,"mat-row"],["colspan","4",1,"mat-cell"]],template:function(o,a){1&o&&(t.YNc(0,I,4,3,"div",0),t.YNc(1,At,53,7,"div",1)),2&o&&(t.Q6J("ngIf",!a.dataSource.data.length),t.xp6(1),t.Q6J("ngIf",a.dataSource.data.length))},directives:[g.O5,$.Ou,C.KE,C.hX,J.Nt,c.BZ,s.YE,c.w1,c.fO,c.Dz,c.as,c.nj,c.Ee,u.NW,j.lW,C.R9,H.Hw,c.ge,c.ev,s.nU,x.p6,x.VK,x.OP,c.XQ,c.Gk],pipes:[g.JJ],styles:["#loading[_ngcontent-%COMP%]{text-align:-webkit-center}#loading[_ngcontent-%COMP%]   #spinner[_ngcontent-%COMP%]{margin:16px}#recomendador-container[_ngcontent-%COMP%]{padding:16px}#recomendador-container[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{overflow:auto}table[_ngcontent-%COMP%]{width:100%}table[_ngcontent-%COMP%]   th.mat-header-cell[_ngcontent-%COMP%]{padding:0 8px;text-align:center}table[_ngcontent-%COMP%]   th.mat-header-cell[_ngcontent-%COMP%]     .mat-sort-header-container{justify-content:center}table[_ngcontent-%COMP%]   td.mat-cell[_ngcontent-%COMP%]{text-align:center}.mat-form-field[_ngcontent-%COMP%]{font-size:14px;width:100%}"]}),e})()}];let St=(()=>{class e{}return e.\u0275fac=function(o){return new(o||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[[T.Bz.forChild(yt)],T.Bz]}),e})();var bt=d(5698);let Dt=(()=>{class e{}return e.\u0275fac=function(o){return new(o||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[[St,bt.m]]}),e})()}}]);