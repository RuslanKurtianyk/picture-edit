import { Component, Inject, Input, output, ViewChild } from '@angular/core';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { DOCUMENT } from '@angular/common';
import { PhotoSize } from '../../models/photo';
import { CENTIMETERS_COEFFICIENT, VIEWPORT_RENDER_COEFFICIENT } from '../../constants';

@Component({
  selector: 'app-photo-frame',
  standalone: true,
  imports: [CdkDrag, MatMenuModule, MatMenuTrigger],
  templateUrl: './photo-frame.component.html',
  styleUrl: './photo-frame.component.scss',
})
export class PhotoFrameComponent {
  viewportCoefficient = VIEWPORT_RENDER_COEFFICIENT;
  centimeterCoefficient = CENTIMETERS_COEFFICIENT;
  @ViewChild(MatMenuTrigger, { static: true }) matMenuTrigger?: MatMenuTrigger =
    undefined;

  @Input() id: string = '';

  @Input() size: PhotoSize = {width: 10, height: 15};
  
  menuTopLeftPosition = { x: '0', y: '0' };
  backgroundImgUrl: string = '';
  fileSelectorId = 'file-selector';

  delete = output<string>();

  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngOnChanges() {
    if (this.id != '') {
      this.fileSelectorId = `${this.fileSelectorId}-${this.id}`
    }
  }

  openContextMenu(event: MouseEvent) {
    event.preventDefault();
    console.log(this.id);
    console.log(event);

    this.menuTopLeftPosition.x = event.clientX + 'px';
    this.menuTopLeftPosition.y = event.clientY + 'px';
    this.matMenuTrigger?.openMenu();
  }

  deleteSelf() {
    this.delete.emit(this.id);
  }

  uploadImage() {
    (this.document?.querySelector(`#${this.fileSelectorId}`) as HTMLElement)?.click();
  }

  handleFileLoad(event: any) {
    const files = event.target.files as FileList;

    if (files.length > 0) {
      const _file = URL.createObjectURL(files[0]);
      this.backgroundImgUrl = _file;
    }
  }
}
