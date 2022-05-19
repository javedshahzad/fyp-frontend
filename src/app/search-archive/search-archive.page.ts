import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-search-archive',
  templateUrl: './search-archive.page.html',
  styleUrls: ['./search-archive.page.scss'],
})

export class SearchArchivePage implements OnInit {
  archiveData;
  filterTerm: string;
  constructor(
    private apiService: ApiService,
  ) { }

  ngOnInit() {
    this.getArchiveData();
  }

  download(){

  }

  getArchiveData(){
    this.apiService.getData('https://fypmanagementbackend.in/ArchiveAPI/read.php').subscribe((res: any)=>{
      if(res.err === false){
        this.archiveData=res.data;
        console.log(this.archiveData);
      }
    });
  }


}
