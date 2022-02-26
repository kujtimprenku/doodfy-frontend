import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-receipts',
  templateUrl: './receipts.component.html',
  styleUrls: ['./receipts.component.css']
})
export class ReceiptsComponent implements OnInit {

  receipts;

  constructor(private userService: UserService, private titleService: Title) { }

  ngOnInit() {
    this.userService.getReceipts().subscribe(data => {
      this.receipts = data;
    })

    this.titleService.setTitle('Receipts');
  }

}
