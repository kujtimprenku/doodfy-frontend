import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {User} from '../../_models/user';
import {Activity} from '../../_models/activity';
import {Company} from '../../_models/company';
import {ExploreService} from '../../_services/explore.service';
import {City} from '../../_models/city';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {Category} from '../../_models/category';
import {CategoryService} from '../../_services/category.service';
import {Title} from '@angular/platform-browser';

@Component({
    templateUrl: './explore.component.html',
    styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {
    responseKeys = [];
    exploreData = {};

    exploreUsers: User[] = [];
    exploreActivities: Activity[] = [];
    exploreCompanies: Company[] = [];

    exploreActivitiesOnScroll: Activity[] = [];

    switzerlandCities: City[] = [];
    categories: Category[] = [];

    cityControl = new FormControl();
    categoryControl = new FormControl();
    startDateControl = new FormControl();
    endDateControl = new FormControl();

    filteredCities: Observable<City[]>;
    filteredCategories: Observable<Category[]>;
    cat: boolean;

    hasQueryParams: boolean;
    page;
    finished = false;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private categoryService: CategoryService,
                private exploreService: ExploreService,
                private titleService: Title) {
    }

    ngOnInit() {
        this.route.data.subscribe(data => {
            this.exploreData = data['explore'];
            this.responseKeys = Object.keys(this.exploreData);
            this.exploreUsers = this.exploreData['users'];
            this.exploreActivities = this.exploreData['activities']['data'];
            this.exploreActivitiesOnScroll = this.exploreActivities;
            this.exploreCompanies = this.exploreData['companies'];
            this.page = 1;

        });


        this.route.queryParams.subscribe((params) => {
            this.page = 1;
            this.finished = false;

            if (params['city'] || params['category']) {
                this.hasQueryParams = true;
            } else {
                this.hasQueryParams = false;
            }
            this.cityControl.patchValue('');
            this.categoryControl.patchValue('');
            if (this.switzerlandCities.length !== 0) {
                this.fillCityControl();
            } else {
                this.exploreService.getCities().subscribe((cities: City[]) => {
                    this.switzerlandCities = cities;
                    this.fillCityControl();
                });
            }
            if (this.categories.length !== 0) {
                this.fillCategoryControl();
            } else {
                this.categoryService.getCategoriesAndSubcategories().subscribe((data: Category[]) => {
                    this.categories = data;
                    this.fillCategoryControl();
                });
            }

            this.titleService.setTitle('Explore - Doodfy');
        });

        this.filteredCities = this.cityControl.valueChanges
            .pipe(
                startWith(''),
                map(value => this._filterByCity(value))
            );

        this.filteredCategories = this.categoryControl.valueChanges
            .pipe(
                startWith(''),
                map(value => this._filterByCategory(value))
            );
    }

    private _filterByCity(value: string): City[] {
        const filterValue = value.toLowerCase();
        return this.switzerlandCities.filter(city => city.name.toLowerCase().includes(filterValue));
    }

    private _filterByCategory(value: string): Category[] {
        const filterValue = value.toLowerCase();
        return this.categories.filter(category => category.name.toLowerCase().includes(filterValue));
    }

    fillCityControl() {
        if (this.route.snapshot.queryParamMap.get('city')) {
            this.cityControl.patchValue(
                this.switzerlandCities.find(x => x.name === this.route.snapshot.queryParamMap.get('city')).name.trim()
            );
        }
    }

    fillCategoryControl() {
        if (this.route.snapshot.queryParamMap.get('category')) {
            this.categoryControl.patchValue(
                this.categories.find(x => x.name === this.route.snapshot.queryParamMap.get('category')).name.trim()
            );
        }
    }

    categoryOrSubcategory(category) {
        if (Object.keys(category).length === 2) {
            this.cat = true;
        }
        if (Object.keys(category).length === 3) {
            this.cat = false;
        }
    }

    onExploreFilter() {
        let city = null;
        let category = null;
        let categoryName = '';
        let from = null;
        let to = null;

        if (this.cityControl.value) {
            const filteredCity = this.switzerlandCities.find(x => x.name.trim() === this.cityControl.value);
            if (filteredCity) {
                city = filteredCity.name;
            }
        }

        if (this.categoryControl.value) {
            category = this.categories.find(x => x.name.trim() === this.categoryControl.value);
            if (category) {
                categoryName = category.name;
            }
        }

        if (category) {
            this.categoryOrSubcategory(category);
        } else {
            categoryName = null;
            this.cat = null;
        }

        if(this.hasQueryParams) {
            from = this.startDateControl.value ? this.startDateControl.value.toLocaleDateString() : null;
            to = this.endDateControl.value ? this.endDateControl.value.toLocaleDateString() : null;
            console.table(from);
            console.table(to);
        }

        this.router.navigate([],
            {
                relativeTo: this.route,
                queryParams: {search: null, city: city, category: categoryName, cat: this.cat, from: from, to: to},
                queryParamsHandling: 'merge'
            });
    }

    onScroll() {

        if (!this.finished) {

            let onScrollActivities = [];
            this.page++;
            this.route.queryParams.subscribe((params) => {

                const model = {
                    city: params['city'],
                    category: params['category'],
                    cat: params['cat'],
                    page: this.page,
                };

                this.exploreService.searchFilters(model).subscribe(data => {

                    onScrollActivities = data['activities']['data'];

                }, error => {
                    console.log(error);
                }, () => {
                    if (onScrollActivities.length === 0) {
                        this.finished = true;
                    } else if (this.page === 1) {
                        this.finished = false;
                        this.exploreActivitiesOnScroll = this.exploreActivitiesOnScroll.slice(0, 10);
                    } else {
                        this.exploreActivitiesOnScroll = this.exploreActivitiesOnScroll.concat(onScrollActivities);
                    }
                });

            });
        }
    }
}
