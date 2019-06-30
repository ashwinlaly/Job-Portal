import { NgModule } from '@angular/core';
import { 
        MatButtonModule,
        MatToolbarModule,
        MatExpansionModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatMenuModule,
        MatRadioModule,
        MatTableModule,
        MatSnackBarModule,
        MatPaginatorModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatDividerModule
       } from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatIconModule,
    MatMenuModule,
    MatRadioModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule ,
    MatDividerModule
  ],
  exports : [
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatIconModule,
    MatMenuModule,
    MatRadioModule, 
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule ,
    MatDividerModule
  ],
  providers : [
    MatDatepickerModule
  ]
})
export class AngularMaterialModule { }
