import {Component, OnInit} from '@angular/core';
import {User} from '../../../_models/user';
import {UserService} from '../../../_services/user.service';
import {CategoryService} from '../../../_services/category.service';
import {Category} from '../../../_models/category';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-general',
    templateUrl: './general.component.html',
    styleUrls: ['./general.component.css']
})
export class GeneralComponent implements OnInit {

    public currentUser: User;
    private userInterests: Category[];
    private availableInterests: Category[];
    private birth_date: Date;


    constructor(private userService: UserService,
                private categoryService: CategoryService,
                private titleService: Title) {
    }

    ngOnInit() {
        this.userService.getEditUserInfo().subscribe((data: User) => {
            this.currentUser = data;
            this.currentUser.birth_date = new Date(this.currentUser.birth_date).toLocaleDateString();
    });

        this.categoryService.getInterests().subscribe((data: Category[]) => {
            this.userInterests = data;
        });

        this.categoryService.getAvailableCategory().subscribe((data: Category[]) => {
            this.availableInterests = data;
        });
        
        this.titleService.setTitle('General Account Settings');
    }


    addInterest(id: number) {
        this.categoryService.addCategoryToInterests(id).subscribe();

        this.userInterests.push(this.availableInterests.find(x => x.id === id));
        this.categoryService.changeUserInterests(this.userInterests);
        this.availableInterests = this.availableInterests.filter(interest => interest.id !== id);
    }

    removeInterest(id: number) {
        this.categoryService.removeCategoryFromInterests(id).subscribe();
        this.availableInterests.push(this.userInterests.find(x => x.id === id));
        this.userInterests = this.userInterests.filter(interest => interest.id !== id);
        this.categoryService.changeUserInterests(this.userInterests);
    }

}
