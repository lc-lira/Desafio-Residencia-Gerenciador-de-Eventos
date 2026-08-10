package com.neki.gerenciador_eventos.dtos;

public record AdminRequestDTO(
    String nome,
    String email,
    String senha,
    String confirmarSenha
) {

}
