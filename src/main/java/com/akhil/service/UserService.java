package com.akhil.service;

import com.akhil.model.User;

public interface UserService {
    
    public User findUserById(Long userId) throws Exception;
}
