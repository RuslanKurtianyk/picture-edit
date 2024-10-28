import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { VIEWPORT_RENDER_COEFFICIENT } from './constants';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [],
})
export class AppComponent {
  title = 'picture-edit';

  showWorkArea = false;
  backgroundHeight = 1760 / VIEWPORT_RENDER_COEFFICIENT;
  backgroundWidth = 2200 / VIEWPORT_RENDER_COEFFICIENT;
  backgroundImgUrl: string = '';
  backgroundImageSize = 100;
  backgroundImagePositionX = 0;
  backgroundImagePositionY = 0;

  onAddBackground() {
    this.showWorkArea = true;
  }

  uploadBackground(event: any) {
    const files = event.target.files as FileList;

    if (files.length > 0) {
      const _file = URL.createObjectURL(files[0]);
      this.backgroundImgUrl = _file;
      // this.resetInput();
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
}
