import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pagina1',
  templateUrl: './pagina1.page.html',
  styleUrls: ['./pagina1.page.scss'],
})
export class Pagina1Page implements OnInit {

  nombre: string = "";
  edadR: number = 0;

  constructor(private router: Router, private activedRouter: ActivatedRoute) { 
      this.activedRouter.queryParams.subscribe(param => {
        if(this.router.getCurrentNavigation()?.extras.state){
          this.nombre = this.router.getCurrentNavigation()?.extras?.state?.["nombreEnviado"]
          this.edadR = this.router.getCurrentNavigation()?.extras?.state?.["edadEnviada"]
        }
      })
  }

  ngOnInit() {
  }

}
