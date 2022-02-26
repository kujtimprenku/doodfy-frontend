import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';


class ImageSnippet {
    constructor(public src: string, public file: File) {
    }
}

@Component({
    selector: 'app-image-upload',
    templateUrl: './image-upload.component.html',
    styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {
    selectedFiles: ImageSnippet;
    uploadEnable = false;

    @Input()
    currentPhoto: String;

    @Input()
    selected: String;

    @Output()
    fileSrc: EventEmitter<string> = new EventEmitter<string>();

    constructor() {
    }

    ngOnInit() {
    }

    processFile(imageInput: any) {
        const file = imageInput.files[0];
        const reader = new FileReader();

        reader.addEventListener('load', (event: any) => {
            this.selectedFiles = new ImageSnippet(event.target.result, file);
            this.fileSrc.emit(this.selectedFiles.src);
            this.uploadEnable = true;
        });
        reader.readAsDataURL(file);
    }

}
