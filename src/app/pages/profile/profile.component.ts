import { Component, OnInit } from '@angular/core';
import { ImageServiseService } from 'src/app/services/image-servise.service';
import { ProfileService } from 'src/app/services/profile.service';

class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';

  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(
    public profileService: ProfileService,
    private imageService: ImageServiseService
  ) {}

  selectedFile!: ImageSnippet;

  ngOnInit(): void {
    this.profileService.getProfileInfo().subscribe((res) => {
      console.log(res);
    });
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);

      this.selectedFile.pending = true;

      this.imageService.uploadImage(this.selectedFile.file).subscribe(
        (res) => {
          this.selectedFile.pending = false;
        },
        (err) => {
          console.log(err);
        }
      );
    });

    reader.readAsDataURL(file);
  }
}
