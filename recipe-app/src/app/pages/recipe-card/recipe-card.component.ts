import { Component, Input } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';

import {MatIconModule} from '@angular/material/icon';
import { UpdateRecipeComponent } from '../update-recipe/update-recipe.component';
import { RecipeServiceService } from '../../services/Recipe/recipe-service.service';
import { AuthServiceService } from '../../services/Auth/auth-service.service';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.scss'
})
export class RecipeCardComponent {

     user:any=null;

     @Input() recipe:any

     constructor(public dialog:MatDialog, private recipeService: RecipeServiceService, public authService: AuthServiceService) { }

     handleOpenEditRecipeForm(){
      this.dialog.open(UpdateRecipeComponent, {
      data: this.recipe
      })
     }

     handleDeleteRecipe(){
      this.recipeService.deleteRecipes(this.recipe.id).subscribe(()=>{

      })

    }
    handleLikeRecipe(){
      this.recipeService.likeRecipes(this.recipe.id).subscribe()
    }



  ngOnInit(){
    this.authService.authSubject.subscribe(
      (auth)=>{
        this.user=auth.user
      }
    )
  }

}
