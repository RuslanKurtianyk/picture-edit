import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, DOCUMENT } from '@angular/common';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { CENTIMETERS_COEFFICIENT, VIEWPORT_RENDER_COEFFICIENT } from './constants';
import { PhotoFrameComponent } from './components/photo-frame/photo-frame.component';
import { randomString } from './utilities/random';
import { PhotoSize, photoSizes } from './models/photo';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatIconModule,
    MatSelectModule,
    MatExpansionModule,
    CdkDrag,
    PhotoFrameComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [],
})
export class AppComponent {
  title = 'picture-edit';
  viewportCoefficient = VIEWPORT_RENDER_COEFFICIENT;
  centimeterCoefficient = CENTIMETERS_COEFFICIENT;

  backgroundHeight = 176;
  backgroundWidth = 220;
  backgroundImgUrl: string = '';
  backgroundImageSize = 100;
  backgroundImagePositionX = 0;
  backgroundImagePositionY = 0;

  pictureComponents: Map<string, PhotoSize> = new Map();

  photoSizeValues: Array<{ value: PhotoSize; viewValue: string }> = [];
  currentFrameSize = { width: 9, height: 13 };

  constructor(@Inject(DOCUMENT) private document: Document) {
    photoSizes.forEach((value, key) => {
      this.photoSizeValues.push({ value: value, viewValue: key });
    });
  }

  openBackgroundFileDialog() {
    (
      this.document?.querySelector('#background-image-selector') as HTMLElement
    )?.click();
  }

  uploadBackground(event: Event) {
    const input = event.target as HTMLInputElement;
    const files = input.files as FileList;

    if (files.length > 0) {
      const _file = URL.createObjectURL(files[0]);
      this.backgroundImgUrl = _file;
    }
  }

  zoomBackgroundIn() {
    this.backgroundImageSize = this.backgroundImageSize + 1;
  }

  zoomBackgroundOut() {
    this.backgroundImageSize = this.backgroundImageSize - 1;
  }

  moveBackgroundLeft() {
    this.backgroundImagePositionX = this.backgroundImagePositionX - 1;
  }

  moveBackgroundRight() {
    this.backgroundImagePositionX = this.backgroundImagePositionX + 1;
  }

  moveBackgroundTop() {
    this.backgroundImagePositionY = this.backgroundImagePositionY - 1;
  }

  moveBackgroundBottom() {
    this.backgroundImagePositionY = this.backgroundImagePositionY + 1;
  }

  onCurrentPhotoFrameSizeChange(event: MatSelectChange) {
    this.currentFrameSize = event.value;
  }

  addComponent() {
    this.pictureComponents.set(randomString(20),this.currentFrameSize);
  }

  onPhotoFrameDelete(id: string) {
    this.pictureComponents.delete(id);
  }

  trackPhotoFrameById(index: number, item: { key: string; value: PhotoSize }): string {
    return item.key;
  }
}
