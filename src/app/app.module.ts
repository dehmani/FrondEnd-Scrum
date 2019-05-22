import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ReactiveFormsModule} from '@angular/forms';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {TreeDiagram} from './tree';

import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonToggleModule,
  MatCardModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import { ProjetsComponent, DialogAddProjet ,DialogEditProject } from './projets/projets.component';
import { LoginComponent } from './login/login.component';
import { DetailleProjetComponent, DialogAddEpic, DialogEditEpic } from './detaille-projet/detaille-projet.component';
import {routing } from './app-routing.module';
import { NotfoundComponent } from './notfound/notfound.component';
import { FormsModule } from '@angular/forms';
import { AuthuserService } from './authuser.service';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './profile/profile.component';
import { DetailleEpicComponent } from './detaille-epic/detaille-epic.component';
import { DetailleUserStoryComponent,DialogAddUserStory, DialogEditUserStory } from './detaille-user-story/detaille-user-story.component'; 
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { RequestsService } from './requests.service';


@NgModule({
  declarations: [
    DialogEditUserStory,
    DialogAddUserStory,
    DialogEditEpic,
    DialogAddEpic,
    DialogEditProject,
    DialogAddProjet,
    HomepageComponent,
    AppComponent,
    ProjetsComponent,
    LoginComponent,
    DetailleProjetComponent,
    NotfoundComponent,
    ProfileComponent,
    DetailleEpicComponent,
    DetailleUserStoryComponent,
  ],
  imports: [
    Ng2SearchPipeModule,
    DragDropModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatTooltipModule,
    MatInputModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonToggleModule,
    MatCardModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    FlexLayoutModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    routing,
    TreeDiagram
  ],
  entryComponents: 
  [DialogEditUserStory,
    DialogEditEpic,
    DialogAddProjet,
    DialogEditProject,
    DialogAddEpic,
    DialogAddUserStory,
  ],
  exports: [
    MatAutocompleteModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    RouterModule,
  ],
  providers: [AuthuserService , RequestsService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
