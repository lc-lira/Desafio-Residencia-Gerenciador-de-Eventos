package com.neki.gerenciador_eventos.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

import com.neki.gerenciador_eventos.models.Admin;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    UserDetails findByEmail(String email);
}
