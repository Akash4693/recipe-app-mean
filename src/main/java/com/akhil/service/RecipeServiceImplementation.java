package com.akhil.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.akhil.model.Recipe;
import com.akhil.model.User;
import com.akhil.repository.RecipeRepository;

@Service
public class RecipeServiceImplementation implements RecipeService {
    
    @Autowired
    private RecipeRepository recipeRepository;

    @Override
    public Recipe createRecipe(Recipe recipe, User user){
        
        Recipe createdRecipe = new Recipe();
        createdRecipe.setTitle(recipe.getTitle());
        createdRecipe.setDescription(recipe.getDescription());
        createdRecipe.setImage(recipe.getImage());
        createdRecipe.setUser(user);
        createdRecipe.setCreatedAt(LocalDateTime.now());
        
        return recipeRepository.save(createdRecipe);
    }

    @Override
    public Recipe findRecipeById(Long id) throws Exception{
        Optional<Recipe> opt = recipeRepository.findById(id);
        if(opt.isPresent()){
          return opt.get();  
        }
        throw new Exception("recipe doesnot exists");
    }

    @Override
    public void deleteRecipe(Long id) throws Exception{
        findRecipeById(id);

        recipeRepository.deleteById(id);
        
    }

    @Override
    public Recipe updateRecipe(Recipe recipe,Long id) throws Exception{
        Recipe oldRecipe = findRecipeById(id);

        if(recipe.getTitle() != null){
            oldRecipe.setTitle(recipe.getTitle());
        }
        if(recipe.getImage() != null){
            oldRecipe.setImage(recipe.getImage());
        }
        if(recipe.getDescription() != null){
            oldRecipe.setDescription(recipe.getDescription());
        }

        return recipeRepository.save(oldRecipe);
    }
    @Override
    public List<Recipe>findAllRecipe(){
        return recipeRepository.findAll();
    }

    @Override
    public Recipe likeRecipe(Long recipeId, User user) throws Exception{
        Recipe recipe = findRecipeById(recipeId);

        if(recipe.getLikes().contains(user.getId())){
           recipe.getLikes().remove(user.getId()); 
        }else{
            recipe.getLikes().add(user.getId());
        }
        return recipeRepository.save(recipe);
    }

}
