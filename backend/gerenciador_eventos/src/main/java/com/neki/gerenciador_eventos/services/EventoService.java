package com.neki.gerenciador_eventos.services;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.neki.gerenciador_eventos.dtos.EventoRequestDTO;
import com.neki.gerenciador_eventos.dtos.EventoResponseDTO;
import com.neki.gerenciador_eventos.models.Admin;
import com.neki.gerenciador_eventos.models.Evento;
import com.neki.gerenciador_eventos.repositories.EventoRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EventoService {

    private final EventoRepository eventoRepository;

    public Page<EventoResponseDTO> listarEventosAdmin(Pageable pageable) {
        Admin adminLogado = (Admin) SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal();
        return eventoRepository.findByAdminId_Id(adminLogado.getId(), pageable)
                .map(EventoResponseDTO::new);
    }

    public EventoResponseDTO buscarEventoPorID(Long id){
        Evento evento = eventoRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Evento não encontrado com o ID: " + id));
        return new EventoResponseDTO(evento);
    }

    public EventoResponseDTO cadastrarEvento(EventoRequestDTO request) {
        Admin adminLogado = (Admin) SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal();

        Evento evento = new Evento();
        evento.setNome(request.nome());
        evento.setDataInicio(request.dataInicio());
        evento.setDataFim(request.dataFim());
        evento.setLocalizacao(request.localizacao());
        evento.setImagem(request.imagem());
        evento.setAdminId(adminLogado);

        return new EventoResponseDTO(eventoRepository.save(evento));
    }

    public EventoResponseDTO alterarEvento(Long id, EventoRequestDTO request){
        Evento evento = eventoRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Evento não encontrado com o ID: " + id));
        
        Admin adminLogado = (Admin) SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal();

        evento.setNome(request.nome());
        evento.setDataInicio(request.dataInicio());
        evento.setDataFim(request.dataFim());
        evento.setLocalizacao(request.localizacao());
        evento.setImagem(request.imagem());
        evento.setAdminId(adminLogado);

        return new EventoResponseDTO(eventoRepository.save(evento));
    }

    public void excluirEvento(Long id){
        Evento evento = eventoRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Evento não encontrado com o ID: " + id));
        
        eventoRepository.delete(evento);
    }
}
