package com.hqt.testing.service;

import com.hqt.testing.exception.UserAlreadyExistException;
import com.hqt.testing.modal.User;

import java.util.List;

public interface IUserService {
    User registerUser(User user) ;
    List<User> getListUsers();
    void deleteUser(String email);
    User getUser(String email);

    User getUserById(int userId);
}
