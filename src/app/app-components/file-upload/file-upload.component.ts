import { Component, Input, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { catchError, concatMap, last, Observable, throwError } from 'rxjs';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  @Input() docOwner: string | undefined;
  @Input() clientId: string | undefined;
  percentageChanges$?: Observable<number | undefined>;

  constructor(private storage: AngularFireStorage) { }

  ngOnInit(): void {

  }

  uploadFile(event:any){
    const file:File = event.target.files[0];
    const filePath = `affiliate/${this.docOwner}/clients/${this.clientId}/${file.name}`;
    const task = this.storage.upload(filePath, file, {
      cacheControl: "max-age=2592000,public"
    })
    this.percentageChanges$ = task.percentageChanges();
    task.snapshotChanges()
    .pipe(
      last(),
      concatMap(()=> this.storage.ref(filePath).getDownloadURL()),
      catchError(err => {
        console.log(err);
        alert('Could not upload file.')
        return throwError(() => new Error(err))
      })
    )
    .subscribe();
  }

}
