package com.neki.gerenciador_eventos.dtos;

import com.neki.gerenciador_eventos.models.Admin;

public record AdminResponseDTO(
    Long id,
    String nome,
    String email
) {
    public AdminResponseDTO(Admin admin) {
        this(admin.getId(), admin.getNome(), admin.getEmail());
    }
}
