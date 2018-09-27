import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mentors-list',
  templateUrl: './mentors-list.component.html',
  styleUrls: ['./mentors-list.component.css']
})
export class MentorsListComponent {

  mentors = [
    {
      name: 'Yoda',
      occupation: 'Jedi Master'
    },
    {
      name: 'Splinter',
      occupation: 'Highly skilled master of ninjutsu'
    },
    {
      name: 'Professor X',
      occupation: 'Master of mental-manipulation'
    }
  ];

}
