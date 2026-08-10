package com.neki.gerenciador_eventos.dtos;

public record LoginResponseDTO(
    String token,
    String nome,
    String email
) {

}
