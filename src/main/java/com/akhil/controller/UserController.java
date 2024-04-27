package com.akhil.controller;

import com.akhil.model.User;
import com.akhil.service.UserService;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

  @Autowired
  private UserService userService;

 
  @GetMapping("/api/user/profile")
  public User findUserByJwt(@RequestHeader("Authorization") String jwt) throws Exception{

    User user = userService.findUserByJwt(jwt);
    return user;
  } 

  
  
 
}
