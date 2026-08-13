package com.neki.gerenciador_eventos.services;

import java.time.LocalDateTime;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.neki.gerenciador_eventos.dtos.EventoRequestDTO;
import com.neki.gerenciador_eventos.dtos.EventoResponseDTO;
import com.neki.gerenciador_eventos.dtos.LocalizacaoDTO;
import com.neki.gerenciador_eventos.exceptions.BadRequestException;
import com.neki.gerenciador_eventos.exceptions.ForbiddenException;
import com.neki.gerenciador_eventos.exceptions.ResourceNotFoundException;
import com.neki.gerenciador_eventos.models.Admin;
import com.neki.gerenciador_eventos.models.Evento;
import com.neki.gerenciador_eventos.models.Localizacao;
import com.neki.gerenciador_eventos.repositories.EventoRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EventoService {

    private final EventoRepository eventoRepository;

    public Page<EventoResponseDTO> listarEventosAdmin(String nome, Pageable pageable) {
        Admin adminLogado = (Admin) SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal();

        Page<Evento> eventos;
        if (nome == null || nome.isBlank()) {
            eventos = eventoRepository.findByAdminId_Id(adminLogado.getId(), pageable);
        } else {
            eventos = eventoRepository.findByAdminId_IdAndNomeContainingIgnoreCase(
                    adminLogado.getId(), nome.trim(), pageable);
        }

        return eventos.map(EventoResponseDTO::new);
    }

    public EventoResponseDTO buscarEventoPorID(Long id){
        Evento evento = eventoRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Evento não encontrado com o ID: " + id));
        return new EventoResponseDTO(evento);
    }

    public EventoResponseDTO cadastrarEvento(EventoRequestDTO request) {
        validarPeriodoEvento(request.dataInicio(), request.dataFim());
        Admin adminLogado = (Admin) SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal();

        Evento evento = new Evento();
        evento.setNome(request.nome());
        evento.setDataInicio(request.dataInicio());
        evento.setDataFim(request.dataFim());
        evento.setLocalizacao(converterLocalizacao(request.localizacao()));
        evento.setImagem(request.imagem());
        evento.setAdminId(adminLogado);

        return new EventoResponseDTO(eventoRepository.save(evento));
    }

    public EventoResponseDTO alterarEvento(Long id, EventoRequestDTO request){
        validarPeriodoEvento(request.dataInicio(), request.dataFim());
        Evento evento = eventoRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Evento não encontrado com o ID: " + id));
        
        Admin adminLogado = (Admin) SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal();

        if (!evento.getAdminId().getId().equals(adminLogado.getId())) {
            throw new ForbiddenException("Você não tem permissão para alterar este evento.");
        }
        evento.setDataInicio(request.dataInicio());
        evento.setDataFim(request.dataFim());
        evento.setLocalizacao(converterLocalizacao(request.localizacao()));

        return new EventoResponseDTO(eventoRepository.save(evento));
    }

    public void excluirEvento(Long id){
        Evento evento = eventoRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Evento não encontrado com o ID: " + id));
        
        Admin adminLogado = (Admin) SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal();

        if (!evento.getAdminId().getId().equals(adminLogado.getId())) {
            throw new ForbiddenException("Você não tem permissão para excluir este evento.");
        }

        eventoRepository.delete(evento);
    }

    private void validarPeriodoEvento(LocalDateTime dataInicio, LocalDateTime dataFim) {
        if (dataFim.isBefore(dataInicio) || dataFim.isEqual(dataInicio)) {
            throw new BadRequestException("Data de fim deve ser posterior à data de início.");
        }
    }

    private Localizacao converterLocalizacao(LocalizacaoDTO dto) {
        return new Localizacao(
                dto.cep(),
                dto.logradouro(),
                dto.numero(),
                dto.complemento(),
                dto.bairro(),
                dto.cidade(),
                dto.uf());
    }
}
