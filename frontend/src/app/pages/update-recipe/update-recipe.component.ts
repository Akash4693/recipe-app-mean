import { Component, Inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { RecipeServiceService } from '../../services/Recipe/recipe-service.service';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-update-recipe',
  standalone: true,
  imports: [
    FormsModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './update-recipe.component.html',
  styleUrls: ['./update-recipe.component.scss'],
})
export class UpdateRecipeComponent {
  recipeItem: any = {
    title: '',
    description: '',
    foodType: '',
    image: '',
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public recipe: any,
    private recipeService: RecipeServiceService
  ) {}

  onSubmit = () => {
    this.recipeService.updateRecipes(this.recipeItem).subscribe();
    console.log('values', this.recipeItem);
  };

  ngOnInit() {
    console.log('data', this.recipe);
    this.recipeItem = this.recipe;
  }
}
