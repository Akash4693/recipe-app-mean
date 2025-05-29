import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeServiceService {
  private baseUrl = 'http://localhost:5000/api/v1';

  constructor(private http: HttpClient) {}

  recipeSubject = new BehaviorSubject<any>({
    recipes: [],
    loading: false,
    newRecipe: null,
  });

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwt');
    return new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    });
  }

  getRecipes(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.baseUrl}/recipe`, { headers }).pipe(
      tap((recipes) => {
        const currentState = this.recipeSubject.value;
        this.recipeSubject.next({ ...currentState, recipes });
      })
    );
  }

  createRecipe(recipe: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(`${this.baseUrl}/recipe`, recipe, { headers }).pipe(
      tap((newRecipe) => {
        const currentState = this.recipeSubject.value;
        this.recipeSubject.next({
          ...currentState,
          recipes: [newRecipe, ...currentState.recipes],
        });
      })
    );
  }

  updateRecipes(recipe: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http
      .put(`${this.baseUrl}/recipe/${recipe._id}`, recipe, { headers })
      .pipe(
        tap((updatedRecipe: any) => {
          const currentState = this.recipeSubject.value;
          const updatedRecipes = currentState.recipes.map((item: any) => {
            console.log('item._id', item, 'updatedRecipe._id', updatedRecipe);
            return item._id === updatedRecipe._id ? updatedRecipe : item;
          });
          this.recipeSubject.next({ ...currentState, recipes: updatedRecipes });
        })
      );
  }

  likeRecipes(id: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http
      .put(`${this.baseUrl}/recipe/${id}/like`, {}, { headers })
      .pipe(
        tap((updatedRecipe: any) => {
          const currentState = this.recipeSubject.value;
          const updatedRecipes = currentState.recipes.map((item: any) => {
            item._id === updatedRecipe._id ? updatedRecipe : item;
          });
          this.recipeSubject.next({ ...currentState, recipes: updatedRecipes });
        })
      );
  }

  deleteRecipes(id: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(`${this.baseUrl}/recipe/${id}`, { headers }).pipe(
      tap((deletedRecipe: any) => {
        const currentState = this.recipeSubject.value;
        const updatedRecipes = currentState.recipes.filter(
          (item: any) => item._id !== id
        );
        this.recipeSubject.next({ ...currentState, recipes: updatedRecipes });
      })
    );
  }
}
