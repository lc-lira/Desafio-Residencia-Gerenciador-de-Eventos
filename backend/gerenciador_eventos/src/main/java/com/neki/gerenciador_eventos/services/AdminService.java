package com.neki.gerenciador_eventos.services;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.neki.gerenciador_eventos.dtos.AdminRequestDTO;
import com.neki.gerenciador_eventos.dtos.AdminResponseDTO;
import com.neki.gerenciador_eventos.models.Admin;
import com.neki.gerenciador_eventos.repositories.AdminRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final AdminRepository repository;
    private final PasswordEncoder passwordEncoder;

    public AdminResponseDTO registrar(AdminRequestDTO request){
        if(this.repository.findByEmail(request.email()) != null) throw new RuntimeException("Email já cadastrado!");
    
        if (!request.senha().equals(request.confirmarSenha())) {
            throw new IllegalArgumentException("As senhas não coincidem.");
        }

        String senhaCriptografada = passwordEncoder.encode(request.senha());

        Admin novoAdmin = new Admin(request.nome(), request.email(), senhaCriptografada);

        this.repository.save(novoAdmin);

        return new AdminResponseDTO(novoAdmin.getId(), novoAdmin.getNome(), novoAdmin.getEmail());
    }
}
