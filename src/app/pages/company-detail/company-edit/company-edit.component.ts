import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CompanyService } from 'src/app/_services/company.service';
import { Company } from 'src/app/_models/company';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent implements OnInit {

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    toolbarPosition: 'top',
    defaultFontName: 'Times New Roman',
  };

  description: string;
  company: Company;
  editForm: FormGroup;
  pending: boolean;
  currentPhoto: string;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private companyService: CompanyService) { }

  ngOnInit() {
    this.editForm = this.fb.group({
      logo: '',
      firm: '',
      street: '',
      branch: '',
      facebook_url: '',
      instagram_url: '',
      twitter_url: '',
      website: '',
    });

    this.companyService.getCompanyById(this.route.snapshot.params['id']).subscribe(data => {
      this.company = data;
      this.currentPhoto = this.company.logo;
      this.fillForm(this.company);
    });
  }

  fillForm(company: Company) {
    this.editForm.patchValue({
        firm: company.firm,
        street: company.street,
        branch: company.branch,
        facebook_url: company.facebook_url,
        instagram_url: company.instagram_url,
        twitter_url: company.twitter_url,
        website: company.website,
    });
    this.description = company.description;
}

  saveCompanyEdit() {
    if (this.editForm.valid) {
      this.pending = true;
      const model = {
        ...this.editForm.value,
        description: this.description,
        logo: this.currentPhoto
      };
      this.companyService.editCompany(model, this.company.id).subscribe(response => {
        this.pending = false;
      }, () => {
        this.pending = false;
      });
    }
  }

  setImageSrc(img: string) {
    this.currentPhoto = img;
  }

}
