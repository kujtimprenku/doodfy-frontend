import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompanyService } from 'src/app/_services/company.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-company-subscribers',
  templateUrl: './company-subscribers.component.html',
  styleUrls: ['./company-subscribers.component.css']
})
export class CompanySubscribersComponent implements OnInit {

  subscribers;

  constructor(private route: ActivatedRoute,private companyService: CompanyService,
              private titleService: Title) { }

  ngOnInit() {
    this.companyService.getCompanySubscribers(this.route.snapshot.params['id']).subscribe((data) => {
      this.subscribers = data;
    });
    
    this.titleService.setTitle('Subscribers');
  }

}
