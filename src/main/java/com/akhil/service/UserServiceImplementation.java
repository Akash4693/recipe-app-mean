package com.akhil.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.akhil.config.JwtProvider;
import com.akhil.model.User;
import com.akhil.repository.UserRepository;

@Service
public class UserServiceImplementation implements UserService{
  
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtProvider jwtProvider;

    @Override
    public User findUserById(Long userId) throws Exception {
         Optional<User> opt = userRepository.findById(userId);
         if(opt.isPresent()){
            return opt.get();  
          }
          throw new Exception("user doesnot exists");
    }

    @Override
    public User findUserByJwt(String jwt) throws Exception {
      
      String email = jwtProvider.getEmailFromJwtToken(jwt);
      
      if(email==null){
        throw new Exception("Provide valid JWT token");
      }

      User user = userRepository.findByEmail(email);
      
      if(user==null){
        throw new Exception("User doesnot exists");
      }
      return user;
    }
    
} 
