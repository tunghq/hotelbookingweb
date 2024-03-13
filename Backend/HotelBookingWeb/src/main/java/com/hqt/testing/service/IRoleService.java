package com.hqt.testing.service;

import com.hqt.testing.modal.Role;
import com.hqt.testing.modal.User;

import java.util.List;

public interface IRoleService {
    List<Role> getRoles();
    Role createRole(Role theRole);
    void deleteRole(int roleId);
    Role findRoleByName(String name);
    User removeUserFromRole(int userId, int roleId);
    User assignRoleToUser(int userId, int roleId);
    Role removeAllUsersFromRole(int roleId);
}
