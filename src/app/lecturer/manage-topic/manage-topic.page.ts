import { Component, OnInit } from '@angular/core';
import { ManageTopicService } from './manage-topic.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-manage-topic',
  templateUrl: './manage-topic.page.html',
  styleUrls: ['./manage-topic.page.scss'],
})
export class ManageTopicPage implements OnInit {
  lectID;
  lectTopicData;

  constructor( private manageTopicService: ManageTopicService,
    public alertController: AlertController
    ) { }

  ngOnInit() {
    this.lectID = localStorage.getItem('accountID');
    console.log(this.lectID);
    const formData =new FormData();
    formData.append('lectID', this.lectID);
    const button = document.querySelector('ion-fab-button');
    button.addEventListener('click', this.addTopic);

    this.manageTopicService.lectTopicData('https://fypmanagementbackend.in/TopicAPI/readOnlyLecturer.php', formData)
    .subscribe((res: any) => {
      console.log(res);
      this.lectTopicData=res.data;
      console.log(this.lectTopicData);
    });
  }

  deleteTopic(topicID){
    console.log(topicID);
  }

    async addTopic() {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Prompt!',
        inputs: [
          {
            name: 'Title',
            type: 'text',
            id: 'title',
            placeholder: 'Topic Title'
          },
          {
            name: 'Topic Type',
            type: 'text',
            id: 'topicType',
            value: 'hello',
            placeholder: 'Placeholder 2'
          },
          // multiline input.
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Confirm Cancel');
            }
          }, {
            text: 'Ok',
            handler: () => {
              console.log('Confirm Ok');
            }
          }
        ]
      });
  }
}
