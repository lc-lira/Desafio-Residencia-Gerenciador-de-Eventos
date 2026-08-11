package com.neki.gerenciador_eventos.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.neki.gerenciador_eventos.dtos.LoginRequestDTO;
import com.neki.gerenciador_eventos.dtos.LoginResponseDTO;
import com.neki.gerenciador_eventos.exceptions.BadRequestException;
import com.neki.gerenciador_eventos.models.Admin;
import com.neki.gerenciador_eventos.security.TokenService;


import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AutenticationController {

    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody @Valid LoginRequestDTO request){
        try {
            var usernamePassword = new UsernamePasswordAuthenticationToken(request.email(), request.senha());
            var auth = this.authenticationManager.authenticate(usernamePassword);
            
            var admin = (Admin) auth.getPrincipal();

            var token = tokenService.generateToken(admin);
            
            return ResponseEntity.ok(new LoginResponseDTO(token, admin.getNome(), admin.getEmail()));
        } catch (BadCredentialsException ex) {
            throw new BadRequestException("Email ou senha inválidos.");
        }
    }
}
