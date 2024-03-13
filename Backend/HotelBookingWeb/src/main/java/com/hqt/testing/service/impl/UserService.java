package com.hqt.testing.service.impl;

import com.hqt.testing.exception.UserAlreadyExistException;
import com.hqt.testing.modal.Role;
import com.hqt.testing.modal.User;
import com.hqt.testing.repository.IRoleRepository;
import com.hqt.testing.repository.IUserRepository;
import com.hqt.testing.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class UserService implements IUserService {
    @Autowired
    private IUserRepository userRepository;
    @Autowired
    private IRoleRepository roleRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public User registerUser(User user) {
        if (userRepository.existsByEmail(user.getEmail())){
            throw new UserAlreadyExistException(user.getEmail() + " already exists");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        System.out.println(user.getPassword());
        // Kiểm tra xem ROLE_USER có tồn tại không
        Optional<Role> optionalUserRole = roleRepository.findByName("ROLE_USER");
        Role userRole;
        if (optionalUserRole.isPresent()) {
            userRole = optionalUserRole.get();
        } else {
            // Nếu không tồn tại, tạo mới ROLE_USER
            userRole = new Role("ROLE_USER");
            roleRepository.save(userRole);
        }
        user.setRoles(Collections.singletonList(userRole));
        return userRepository.save(user);
    }

    @Override
    public List<User> getListUsers() {
        return userRepository.findAll();
    }

    @Transactional
    @Override
    public void deleteUser(String email ) {
        User theUser = getUser(email);
        if(theUser != null){
            userRepository.deleteByEmail(email);
        }
    }

    @Override
    public User getUser(String email) {
        return userRepository.findByEmail(email).orElseThrow(()->new UsernameNotFoundException("User not found"));
    }

    @Override
    public User getUserById(int userId) {
        return userRepository.findById(userId).orElseThrow(()->new UsernameNotFoundException("User not found"));
    }
}
