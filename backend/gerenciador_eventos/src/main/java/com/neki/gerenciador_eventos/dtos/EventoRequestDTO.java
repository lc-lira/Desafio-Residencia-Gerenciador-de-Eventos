package com.neki.gerenciador_eventos.dtos;

import java.time.LocalDateTime;

import jakarta.validation.Valid;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record EventoRequestDTO(
    @NotBlank(message = "Nome do evento é obrigatório")
    @Size(max = 100, message = "Nome do evento deve ter no máximo 100 caracteres")
    String nome,

    @NotNull(message = "Data de início é obrigatória")
    @FutureOrPresent(message = "Data de início deve ser hoje ou no futuro")
    LocalDateTime dataInicio,

    @NotNull(message = "Data de fim é obrigatória")
    LocalDateTime dataFim,

    @NotNull(message = "Localização é obrigatória")
    @Valid
    LocalizacaoDTO localizacao,

    @NotBlank(message = "URL da imagem é obrigatória")
    @Size(max = 500, message = "URL da imagem deve ter no máximo 500 caracteres")
    String imagem
) {
}
