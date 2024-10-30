import { Component, Inject, Input, output, Output, ViewChild } from '@angular/core';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { DOCUMENT } from '@angular/common';
import { PhotoSize } from '../../models/photo';
import { VIEWPORT_RENDER_COEFFICIENT } from '../../constants';

@Component({
  selector: 'app-photo-frame',
  standalone: true,
  imports: [CdkDrag, MatMenuModule, MatMenuTrigger],
  templateUrl: './photo-frame.component.html',
  styleUrl: './photo-frame.component.scss',
})
export class PhotoFrameComponent {
  coefficient = VIEWPORT_RENDER_COEFFICIENT;
  @ViewChild(MatMenuTrigger, { static: true }) matMenuTrigger?: MatMenuTrigger =
    undefined;

  @Input() id: string = '';

  @Input() size: PhotoSize = {width: 10, height: 15};
  
  menuTopLeftPosition = { x: '0', y: '0' };
  backgroundImgUrl: string = '';

  delete = output<string>();

  constructor(@Inject(DOCUMENT) private document: Document) {}

  openContextMenu(event: any) {
    event.preventDefault();

    this.menuTopLeftPosition.x = event.clientX + 'px';
    this.menuTopLeftPosition.y = event.clientY + 'px';
    this.matMenuTrigger?.openMenu();
  }

  deleteSelf() {
    this.delete.emit(this.id);
  }

  uploadImage() {
    console.log('upload');
    console.log(this.document?.querySelector('file-selector') as HTMLElement);
    (this.document?.querySelector('#file-selector') as HTMLElement)?.click();
  }

  handleFileLoad(event: any) {
    const files = event.target.files as FileList;

    if (files.length > 0) {
      const _file = URL.createObjectURL(files[0]);
      this.backgroundImgUrl = _file;
      // this.resetInput();
    }
  }
}
