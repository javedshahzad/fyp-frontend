import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{ Topic } from '../../model/topic.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ManageTopicService {
  lectID;

  constructor(private http: HttpClient) {
    this.lectID =localStorage.getItem('accountID');
  }

  lectTopicData(url, data) {
    return this.http.post(url, data);
  }

  dropTopic(url, data) {
    return this.http.post(url, data);
  }
}
