package com.neki.gerenciador_eventos.controllers;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
    public ResponseEntity<AdminResponseDTO> registrarAdmin(@RequestBody @Valid AdminRequestDTO request) {
        AdminResponseDTO admin = adminService.registrarAdmin(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(admin);
    }

    @GetMapping
    public ResponseEntity<Page<AdminResponseDTO>> listarAdmins(
            @PageableDefault(page = 0, size = 10, sort = "nome") Pageable pageable) {

        Page<AdminResponseDTO> admins = adminService.listarAdmins(pageable);
        return ResponseEntity.ok(admins);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AdminResponseDTO> buscarAdminPorId(@PathVariable Long id) {
        AdminResponseDTO admin = adminService.buscarAdminPorId(id);
        return ResponseEntity.ok(admin);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AdminResponseDTO> alterarNomeAdmin(@PathVariable Long id,
            @RequestBody @Valid AdminRequestDTO request) {
        AdminResponseDTO admin = adminService.alterarNomeAdmin(id, request);
        return ResponseEntity.ok(admin);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> exluirAdmin(@PathVariable Long id) {
        adminService.excluirAdmin(id);
        return ResponseEntity.noContent().build();
    }
}
