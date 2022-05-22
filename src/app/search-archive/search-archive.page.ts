import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-search-archive',
  templateUrl: './search-archive.page.html',
  styleUrls: ['./search-archive.page.scss'],
})

export class SearchArchivePage implements OnInit {
  archiveData=[];
  filterTerm: any='';
  searchArchive: any=[];
  constructor(
    private apiService: ApiService,
  ) { }

  ngOnInit() {
    this.getArchiveData();
  }

  download(path){
    window.open(path,'_blank');
  }

  getArchiveData(){
    this.apiService.getData('https://fypmanagementbackend.in/ArchiveAPI/read.php').subscribe((res: any)=>{
      if(res.err === false){
        this.archiveData=res.data;
        this.searchArchive=res.data;
        console.log(this.archiveData);
      }
    });
  }
  searchData(){
    if(this.filterTerm){
      if(this.archiveData.length ===0){
        this.getArchiveData();
      }
      const str=this.filterTerm;
    const arr = str.split(" ");
    //loop through each element of the array and capitalize the first letter.
    for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);

    }
    //Join all the elements of the array back into a string 
    //using a blankspace as a separator 
    const str2 = arr.join(" ");
    console.log(str2);
    let arrdata=this.archiveData;
    //let x = arrdata.filter((a)=>{if(a.title==str2){return a}});
    let x =arrdata.filter((a)=>a.yearFYP.toUpperCase().includes(str.toUpperCase()) || a.topicTypeName.toUpperCase().includes(str.toUpperCase()) || a.title.toUpperCase().includes(str.toUpperCase()));
    console.log(x);
    this.searchArchive=x;
    if(this.searchArchive.length != 0){
      this.archiveData=this.searchArchive;
    }else{
      this.archiveData=x;
      this.apiService.showtoast("Data not Found!");   
    }
    console.log(this.archiveData);
    }else{
      this.apiService.showtoast("Type to search");   
    }

  }
}
