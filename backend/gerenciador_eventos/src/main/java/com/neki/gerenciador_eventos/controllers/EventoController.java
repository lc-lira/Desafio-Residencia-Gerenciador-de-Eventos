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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.neki.gerenciador_eventos.dtos.EventoRequestDTO;
import com.neki.gerenciador_eventos.dtos.EventoResponseDTO;
import com.neki.gerenciador_eventos.services.EventoService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/eventos")
@RequiredArgsConstructor
public class EventoController {

    private final EventoService service;

    @GetMapping
    public ResponseEntity<Page<EventoResponseDTO>> listarEventosAdmin(
            @RequestParam(required = false) String nome,
            @PageableDefault(page = 0, size = 10, sort = { "dataInicio" }) Pageable pageable) {

        Page<EventoResponseDTO> eventos = service.listarEventosAdmin(nome, pageable);
        return ResponseEntity.ok(eventos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EventoResponseDTO> buscarEventoPorId(@PathVariable Long id) {
        EventoResponseDTO evento = service.buscarEventoPorID(id);
        return ResponseEntity.ok(evento);
    }

    @PostMapping
    public ResponseEntity<EventoResponseDTO> cadastrarEvento(@RequestBody @Valid EventoRequestDTO request) {
        EventoResponseDTO evento = service.cadastrarEvento(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(evento);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EventoResponseDTO> alterarEvento(@PathVariable Long id,
            @RequestBody @Valid EventoRequestDTO request) {
        EventoResponseDTO evento = service.alterarEvento(id, request);
        return ResponseEntity.ok(evento);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirEvento(@PathVariable Long id) {
        service.excluirEvento(id);
        return ResponseEntity.noContent().build();
    }

}
