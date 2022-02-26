import {Component, OnInit} from '@angular/core';
import {MessagesService} from '../../../_services/messages.service';
import {ActivatedRoute} from '@angular/router';
import {Message} from '../../../_models/message';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

    friendMessage: Message[] = [];
    message = '';

    constructor(private messageService: MessagesService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.data.subscribe(data => {
            this.friendMessage = data['messages'];
        });
    }

    onSendMessage() {
        if (this.message.trim() !== '') {
            const model: Message = {
                my_comment: true,
                content: this.message,
            };

            this.messageService.sendMessage({receiver_id: +this.route.snapshot.paramMap.get('id'), content: this.message}).subscribe();
            this.friendMessage.push(model);
            this.message = null;
        }
    }

}
