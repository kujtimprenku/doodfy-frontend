import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatAutocompleteModule, MatNativeDateModule, MatDialogModule} from '@angular/material';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatBadgeModule} from '@angular/material/badge';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatChipsModule} from '@angular/material/chips';
import {MatTabsModule} from '@angular/material/tabs';
import { RepeatActivityModalComponent } from './repeat-activity-modal/repeat-activity-modal.component';
import {NgxSmartModalModule} from 'ngx-smart-modal';
import {RouterModule} from '@angular/router';



@NgModule({
    imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatRadioModule,
        MatSelectModule,
        MatToolbarModule,
        MatSidenavModule,
        MatMenuModule,
        MatStepperModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSlideToggleModule,
        MatCardModule,
        MatProgressBarModule,
        MatBadgeModule,
        NgxMaterialTimepickerModule,
        MatSnackBarModule,
        MatProgressSpinnerModule,
        BrowserAnimationsModule,
        MatAutocompleteModule,
        MatTooltipModule,
        MatBottomSheetModule,
        MatChipsModule,
        MatDialogModule,
        MatTabsModule,
        NgxSmartModalModule,
        RouterModule,
    ],
    exports: [
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatRadioModule,
        MatSelectModule,
        MatToolbarModule,
        MatSidenavModule,
        MatMenuModule,
        MatStepperModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSlideToggleModule,
        MatCardModule,
        MatProgressBarModule,
        MatBadgeModule,
        NgxMaterialTimepickerModule,
        MatSnackBarModule,
        MatProgressSpinnerModule,
        BrowserAnimationsModule,
        MatAutocompleteModule,
        MatTooltipModule,
        MatBottomSheetModule,
        MatChipsModule,
        MatDialogModule,
        MatTabsModule,
        RepeatActivityModalComponent,
    ],
    declarations: [RepeatActivityModalComponent],

})
export class AngularMaterialModule {
}
