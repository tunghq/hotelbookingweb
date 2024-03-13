package com.hqt.testing.repository;

import com.hqt.testing.modal.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IRoleRepository extends JpaRepository<Role, Integer> {
    Optional<Role> findByName(String role);

    boolean existsByName(String role);
}
