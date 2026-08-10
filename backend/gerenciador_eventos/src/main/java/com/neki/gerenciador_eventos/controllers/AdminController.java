package com.neki.gerenciador_eventos.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.neki.gerenciador_eventos.dtos.AdminRequestDTO;
import com.neki.gerenciador_eventos.dtos.AdminResponseDTO;
import com.neki.gerenciador_eventos.services.AdminService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/admins")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @PostMapping
    public ResponseEntity<AdminResponseDTO> registrar(@RequestBody @Valid AdminRequestDTO request) {
        AdminResponseDTO response = adminService.registrar(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
