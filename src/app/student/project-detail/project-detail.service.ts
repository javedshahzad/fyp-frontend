import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{ Topic } from '../../model/topic.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProjectDetailService {

  constructor(private http: HttpClient) { }

  getTopic(): Observable<Topic[]> {
    return this.http.get<Topic[]>('https://fypmanagementbackend.in/topicAPI/read.php');
  }

}
