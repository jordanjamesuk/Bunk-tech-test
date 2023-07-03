import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { TravellerTableComponent } from './traveller-table/traveller-table.component';
import { TravellerFormComponent } from './traveller-form/traveller-form.component';
import { SettleUpService } from './services/settle-up.service';
import { HttpClientModule } from '@angular/common/http';
import { PayoutTableComponent } from './payout-table/payout-table.component';

@NgModule({
  declarations: [
    AppComponent,
    TravellerTableComponent,
    TravellerFormComponent,
    PayoutTableComponent,
  ],
  imports: [
    BrowserModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [SettleUpService],
  bootstrap: [AppComponent],
})
export class AppModule { }
