import { Component, OnInit } from '@angular/core';
import { ManageTopicService } from './manage-topic.service';

@Component({
  selector: 'app-manage-topic',
  templateUrl: './manage-topic.page.html',
  styleUrls: ['./manage-topic.page.scss'],
})
export class ManageTopicPage implements OnInit {
  lectID;

  constructor( private manageTopicService: ManageTopicService) { }

  ngOnInit() {
    this.lectID = localStorage.getItem('accountID');
    console.log(this.lectID);
    // const formData =new FormData();
    // formData.append('lectID', this.lectID);

    this.manageTopicService.lectTopicData('https://fypmanagementbackend.in/TopicAPI/readOnlyLecturer.php', this.lectID)
    .subscribe((res: any) => {
      console.log(res);
    });
  }

}
