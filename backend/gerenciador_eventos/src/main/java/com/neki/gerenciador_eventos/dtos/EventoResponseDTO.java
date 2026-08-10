package com.neki.gerenciador_eventos.dtos;

import java.time.LocalDateTime;
import com.neki.gerenciador_eventos.models.Evento;
import com.neki.gerenciador_eventos.models.Localizacao;

public record EventoResponseDTO(
    Long id,
    String nome, 
    LocalDateTime dataInicio,
    LocalDateTime dataFim,
    Localizacao localizacao,
    String imagem,
    Long adminId
) {
    public EventoResponseDTO(Evento evento) {
        this(
            evento.getId(),
            evento.getNome(),
            evento.getDataInicio(),
            evento.getDataFim(),
            evento.getLocalizacao(),
            evento.getImagem(),
            evento.getAdminId() != null ? evento.getAdminId().getId() : null
        );
    }
}
