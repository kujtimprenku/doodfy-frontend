import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';
import {NgxMaterialTimepickerTheme} from 'ngx-material-timepicker';
import {Category} from '../../_models/category';
import {ActivityService} from '../../_services/activity.service';
import {MatAutocompleteSelectedEvent, MatCheckboxChange, MatSelectChange} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {Activity} from '../../_models/activity';
import {ToastMessageService} from '../../_services/toast-message.service';
import {CategoryService} from '../../_services/category.service';
import {Observable} from 'rxjs';
import {startWith, map} from 'rxjs/operators';
import {UserService} from 'src/app/_services/user.service';
import {Title} from '@angular/platform-browser';
import {Group} from '../../_models/group';
import {Place} from '../../_models/place';
import {getRandomImage} from '../../mocks/random-images';


function validateDate(c: AbstractControl): { [key: string]: boolean } | null {
    const startDate = c.get('startDate');
    const endDate = c.get('endDate');

    const startTime = c.get('startTime');
    const endTime = c.get('endTime');

    const startTimeArray = startTime.value.split(':');
    const endTimeArray = endTime.value.split(':');

    const startHour = +startTimeArray[0];
    const endHour = +endTimeArray[0];

    const today = new Date();

    if (startDate.value > endDate.value) {
        if ('' + c.get('end_type').value === '2') {
            return null;
        }
        return {'equal': true};
    }

    if (('' + startDate.value === '' + endDate.value) && (startHour > endHour)) {

        return {'hourError': true};
    }

    if ((startHour < today.getHours()) && (startDate.value.toLocaleDateString() === today.toLocaleDateString())) {

        return {'timeError': true};
    }

    return null;
}

function maxParticipants(c: AbstractControl): { [key: string]: boolean } | null {
    const nr_participants = c.value;

    if (c.pristine) {
        return null;
    }

    if (nr_participants < 1 && nr_participants != null) {
        return {'participantRange': true};
    }

    return null;
}


@Component({
    templateUrl: './create-activity.component.html',
    styleUrls: ['./create-activity.component.css']
})
export class CreateActivityComponent implements OnInit, OnDestroy {

    pending = false;
    saveEnable = true;

    categories: Category[];
    subCategories = [];
    numberOfXp;
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;
    thirdFormGroup: FormGroup;

    currentImage: String;

    returnStartDate: Date;
    returnEndDate: Date;
    minDate = new Date();
    maxDate = new Date(this.minDate.getFullYear() + 3, this.minDate.getMonth());

    filteredSubcategories: Observable<Category[]>;
    subcategory_id: number;

    newSubcategory: string;
    categoryImages: any = [];

    selectedImage: boolean;
    selectedDays: any = [];
    selectedDay = 0;
    days: any = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    editFormValue;
    isButtonClicked: Boolean;
    groupActivity: Group;
    disableStartDateOnEdit: boolean;
    placeActivity: Place;

    editMode: boolean;
    is_occurrence: boolean;

    darkTheme: NgxMaterialTimepickerTheme = {
        container: {
            bodyBackgroundColor: '#fff',
            buttonColor: '#15131b'
        },
        dial: {
            dialBackgroundColor: '#15131b',
        },
        clockFace: {
            clockFaceBackgroundColor: '#ebebeb',
            clockHandColor: '#e5125e',
            clockFaceTimeInactiveColor: '#15131b'
        }
    };

    constructor(private fb: FormBuilder,
                private route: ActivatedRoute,
                private router: Router,
                private categoryService: CategoryService,
                private activityService: ActivityService,
                private toastMessageService: ToastMessageService,
                private userService: UserService,
                private titleService: Title, ) {

        this.categoryService.getSubcategories().subscribe(data => {
            this.subCategories = data;
        });
    }

    ngOnInit() {
        this.activityService.currentTypeOfActivity.subscribe(groupActivity => {
            this.groupActivity = groupActivity;
        });
        this.activityService.currentTypeOfPlaceActivity.subscribe(placeActivity => {
            this.placeActivity = placeActivity;
        });

        this.firstFormGroup = this.fb.group({
            title: ['', [Validators.required]],
            subcategory_id: ['', [Validators.required]],
            other: [''],
            location: ['', [Validators.required]],
            max_persons: ['', [maxParticipants]],
            dateAndTime: this.fb.group({
                startDate: [new Date(), [Validators.required]],
                startTime: ['15:30', [Validators.required]],
                endDate: [new Date(), [Validators.required]],
                endTime: ['16:30', [Validators.required]],
                count: [0],
                end_type: ['1']
            }, {validator: validateDate}),
            description: [[''], [Validators.required]],
            occurrences: this.fb.group({
                is_repeat: false,
                interval: 1,
                frequency: ['daily'],
                byday: [this.selectedDays],
                count: [0]
            })

        });
        if (this.placeActivity) {
            this.firstFormGroup.get('location').patchValue(this.placeActivity.location);
            this.firstFormGroup.get('location').disable();
        }
        this.secondFormGroup = this.fb.group({});
        this.thirdFormGroup = this.fb.group({
            has_xp: false
        });

        this.filteredSubcategories = this.firstFormGroup.get('subcategory_id').valueChanges
            .pipe(
                startWith(''),
                map(value => this._filterBySubcategory(value))
            );

        if (this.router.url !== '/create-activity') {

            this.activityService.activityEditInfo(this.route.snapshot.params['id']).subscribe((data: Activity) => {
                this.editMode = true;
                this.is_occurrence = data['is_occurrence'];
                this.firstFormGroup.get('occurrences').disable();
                this.fillForm(data);
                this.currentImage = data.image;
                this.titleService.setTitle(data.title);
                this.minDate = new Date(data.start_date) > new Date() ? new Date() : new Date(data.start_date);
                this.disableStartDateOnEdit = new Date(data.start_date) < new Date();

                if (this.disableStartDateOnEdit) {
                    this.firstFormGroup.get('dateAndTime').get('startDate').disable();
                    this.firstFormGroup.get('dateAndTime').get('startTime').disable();
                }
            });

            this.saveEnable = false;
        }

        this.userService.getNumberOfXp().subscribe(data => {
            this.numberOfXp = data;
        });

        this.titleService.setTitle('Create Activity - Doodfy');
    }

    private _filterBySubcategory(value: string): Category[] {

        const filterValue = value.toLowerCase();

        if (!this.subCategories.find(category => category.name.toLowerCase() === value.toLowerCase())) {
            this.newSubcategory = value;
        } else {
            this.subcategory_id = this.subCategories.find(category => category.name.toLowerCase() === value.toLowerCase()).id;
            this.newSubcategory = '';
        }

        return this.subCategories.filter(subcategory => subcategory.name.toLowerCase().includes(filterValue));

    }

    onSelectionChanged(event: MatAutocompleteSelectedEvent) {
        this.newSubcategory = '';

        if (event.option.value.length === 0) {
            return;
        }
        this.subcategory_id = this.subCategories.find(x => x.name.trim() === this.firstFormGroup.get('subcategory_id').value).id;
    }

    createNewSubcategory() {
        if (this.newSubcategory !== '') {
            const model = {
                name: this.newSubcategory,
            };
            this.categoryService.addNewSubcategory(model).subscribe(
                response => {
                    this.subcategory_id = response['id'];
                },
                error => console.log(error)
            );
        }
        this.categoryService.getCategoryImageFromSubcategory(this.subcategory_id).subscribe(data => {
            this.categoryImages = data;
        });
    }

    fillForm(activity: Activity) {
        this.categoryService.getSubcategories().subscribe(data => {
            this.subCategories = data;
            const subcategory = this.subCategories.find(x => x.id === activity.subcategory_id).name;
            this.subcategory_id = activity.category_id;
            this.firstFormGroup.patchValue({
                title: activity.title,
                subcategory_id: subcategory,
                location: activity.location,
                max_persons: activity.max_persons,
                description: activity.description,
                dateAndTime: {
                    startDate: new Date(activity.start_date),
                    startTime: activity.start_time,
                    endDate: new Date(activity.end_date),
                    endTime: activity.end_time,
                }
            });

            this.editFormValue = {
                ...this.firstFormGroup.value,
                ...this.thirdFormGroup.value,
            };
        });


        this.thirdFormGroup.patchValue({
            has_xp: activity.has_xp
        });

    }

    get isDirty(): boolean {
        return (!(this.isButtonClicked === true || JSON.stringify(this.editFormValue) ===
            JSON.stringify({...this.firstFormGroup.value, ...this.thirdFormGroup.value})));
    }

    setImageSrc(img: string) {
        this.currentImage = img;
        this.saveEnable = false;
        this.selectedImage = true;
    }

    onCreateActivity(edit_all: boolean) {
        this.isButtonClicked = true;
        this.returnStartDate = this.firstFormGroup.get('dateAndTime.startDate').value;
        this.returnEndDate = this.firstFormGroup.get('dateAndTime.endDate').value;
        if (this.firstFormGroup.get('dateAndTime.end_type').value === '2') {
            this.firstFormGroup.get('occurrences.count').patchValue(this.firstFormGroup.get('dateAndTime.count').value);
        }
        this.selectedDay = new Date(this.returnStartDate).getDay();
        this.selectedDays.push(this.days[this.selectedDay]);

        const model = {
            ...this.firstFormGroup.getRawValue(),
            ...this.thirdFormGroup.value,
            subcategory_id: this.subcategory_id,
            image: getRandomImage(),
            group_id: this.groupActivity ? this.groupActivity.id : null,
            place_id: this.placeActivity ? this.placeActivity.id : 1,
            start_date: this.returnStartDate.toLocaleDateString() + ' ' + this.firstFormGroup.get('dateAndTime.startTime').value + ':00',
            end_date: this.returnEndDate.toLocaleDateString() + ' ' + this.firstFormGroup.get('dateAndTime.endTime').value + ':00',
            edit_all: edit_all,
        };

        if (this.router.url !== '/create-activity') {
            if (this.firstFormGroup.valid) {
                this.pending = true;
                this.activityService.onUpdateActivity(model, +this.route.snapshot.params['id']).subscribe(response => {
                    this.toastMessageService.openSnackBar(response['message'], 'Undo');
                    this.pending = false;
                }, error => {
                    this.toastMessageService.openSnackBar('Error occurred!', '');
                    this.pending = false;
                }, () => {
                    this.router.navigate(['/activity/', this.route.snapshot.params['id']]);
                });
            }
        } else {
            if (this.firstFormGroup.valid) {
                let id;
                this.pending = true;
                this.activityService.createActivity(model).subscribe(response => {
                    this.toastMessageService.openSnackBar(response['message'], 'Undo');
                    this.pending = false;
                    id = response['id'];
                }, error => {
                    this.toastMessageService.openSnackBar('Error occurred!', '');
                    this.pending = false;
                }, () => {
                    this.router.navigate(['/activity/', id]);
                });
            }
        }
    }

    chooseCategoryImage(image: string) {
        this.currentImage = image;
        this.selectedImage = false;
    }


    ngOnDestroy(): void {
        this.activityService.typeOfActivity.next(null);
    }

    optionSelectionChanges(option: MatSelectChange) {
        if (this.firstFormGroup.get('occurrences').get('is_repeat').value && option.value === 'weekly') {

            const start_date = new Date(this.firstFormGroup.get('dateAndTime').get('startDate').value).getDay();
            this.selectedDay = start_date;
            this.selectedDays.push(this.days[this.selectedDay]);
            this.firstFormGroup.get('occurrences').get('byday').setValidators(Validators.required);
            this.firstFormGroup.get('occurrences').get('byday').updateValueAndValidity();
        } else if (option.value !== 'weeks') {
            this.selectedDays = [this.days[this.selectedDay]];
            this.firstFormGroup.get('occurrences').get('byday').patchValue(this.selectedDays);
            this.firstFormGroup.get('occurrences').get('byday').clearValidators();
            this.firstFormGroup.get('occurrences').get('byday').updateValueAndValidity();
        }
    }

    onDayChanged(day: string, checkbox: MatCheckboxChange) {
        if (checkbox.checked) {
            this.selectedDays.push(day);
        } else {
            const index = this.selectedDays.indexOf(day);
            this.selectedDays.splice(index, 1);
        }
        this.firstFormGroup.get('occurrences').get('byday').patchValue(this.selectedDays);
    }

    onStartDateChange() {
        this.selectedDay = new Date(this.firstFormGroup.get('dateAndTime').get('startDate').value).getDay();
        if (this.firstFormGroup.get('occurrences').get('frequency').value !== 'weekly') {
            this.selectedDays = [this.days[this.selectedDay]];
            this.firstFormGroup.get('occurrences').get('byday').patchValue(this.selectedDays);
        } else {
            this.selectedDays.push(this.days[this.selectedDay]);
        }
    }
}
