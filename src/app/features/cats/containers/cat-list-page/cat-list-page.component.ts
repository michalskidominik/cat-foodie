import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-cat-list-page',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './cat-list-page.component.html',
  styleUrl: './cat-list-page.component.scss'
})
export class CatListPageComponent {

}
