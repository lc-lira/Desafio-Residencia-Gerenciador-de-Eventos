package com.neki.gerenciador_eventos.dtos;

import java.time.LocalDateTime;
import com.neki.gerenciador_eventos.models.Localizacao;

public record EventoRequestDTO(
    String nome, 
    LocalDateTime dataInicio,
    LocalDateTime dataFim,
    Localizacao localizacao,
    String imagem
) {

}
