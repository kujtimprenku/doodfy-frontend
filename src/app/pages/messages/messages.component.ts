import {Component, OnInit} from '@angular/core';
import {MessagesService} from '../../_services/messages.service';
import { Title } from '@angular/platform-browser';

// declare const Pusher: any;

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

    // pusher = new Pusher('d2d1198b3b73bcc1343e', {
    //     cluster: 'eu'
    // });
    //
    // messagesChannel: any;


    chattingWith;
    lastChatUsers;


    constructor(private messageService: MessagesService, private titleService: Title) {
    }

    ngOnInit() {
        this.messageService.getLastChatWith().subscribe(data => {
            this.lastChatUsers = data;
        });

        // this.messagesChannel = this.pusher.subscribe('my-channel');
        // this.messagesChannel.bind('my-event', (messages) => {
        //     console.log(messages);
        // });
        this.titleService.setTitle('Messenger - Doodfy');
    }



    chatWith(model: any) {
        this.chattingWith = model;
    }

}
