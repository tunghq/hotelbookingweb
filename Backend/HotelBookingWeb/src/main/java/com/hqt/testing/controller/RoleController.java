package com.hqt.testing.controller;

import com.hqt.testing.exception.RoleAlreadyExistException;
import com.hqt.testing.modal.Role;
import com.hqt.testing.modal.User;
import com.hqt.testing.service.IRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;



@RestController
@RequestMapping("api/v1/roles")
public class RoleController {
    @Autowired
    private IRoleService roleService;


    @GetMapping("/all")
    public ResponseEntity<List<Role>> getAllRoles(){
        return new ResponseEntity<>(roleService.getRoles(),HttpStatus.FOUND);
    }
    @PostMapping("/create")
    public ResponseEntity<String> createRole(@RequestBody Role theRole){
        try {
            roleService.createRole(theRole);
            return ResponseEntity.ok("New ROLE created successfully!");
        }catch (RoleAlreadyExistException e){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());

        }
    }
    @DeleteMapping("/delete/{roleId}")
    public void deleteRole(@PathVariable("roleId") int roleId){
        roleService.deleteRole(roleId);

    }
    @DeleteMapping("/remove-all-users-from-role/{roleId}")
    public Role removeAllUserFromRole(@PathVariable("roleId") int roleId){
        return roleService.removeAllUsersFromRole(roleId);
    }
    @DeleteMapping("/remove-user-from-role")
    public User removeUserFromRole(
           @RequestParam int userId,
           @RequestParam int roleId){
        return roleService.removeUserFromRole(userId,roleId);
    }

    @PostMapping("/assign-user-to-role")
    public User assignRoleToUser(
            @RequestParam int userId,
            @RequestParam int roleId){
        return roleService.assignRoleToUser(userId,roleId);

    }

}
