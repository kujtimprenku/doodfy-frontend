import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import {Category} from '../_models/category';
import {Activity} from '../_models/activity';
import {Observable, BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    baseUrl = environment.apiUrl;

    userInterests = new BehaviorSubject<Category[]>([] as Category[]);
    currentUSerInterests = this.userInterests.asObservable();

    constructor(private http: HttpClient) {
    }

    changeUserInterests(intrests: Category[]) {
        this.userInterests.next(intrests);
    }

    getCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(this.baseUrl + 'categories');
    }

    getInterests(): Observable<Category[]> {
        return this.http.get<Category[]>(this.baseUrl + 'userInterests');
    }

    getAvailableCategory(): Observable<Category[]> {
        return this.http.get<Category[]>(this.baseUrl + 'availableCategory');
    }

    getCategoryById(id: number): Observable<Category> {
        return this.http.get<Category>(this.baseUrl + 'category/' + id);
    }

    addCategoryToInterests(id: number) {
        return this.http.get(this.baseUrl + 'addCategoryToInterests/' + id);
    }

    removeCategoryFromInterests(id: number) {
        return this.http.delete(this.baseUrl + 'removeCategoryFromInterests/' + id);
    }

    getSubcategories(): Observable<Category[]> {
        return this.http.get<Category[]>(this.baseUrl + 'subcategories');
    }

    addNewSubcategory(model: any) {
        return this.http.post(this.baseUrl + 'subcategory ', model);
    }

    getCategoriesAndSubcategories(): Observable<Category[]> {
        return this.http.get<Category[]>(this.baseUrl + 'categoriesAndSubcategories');
    }

    getCategoryImageFromSubcategory(id: number) {
        return this.http.get(this.baseUrl + 'categoryImageFromSubcategory/' + id);
    }
}
