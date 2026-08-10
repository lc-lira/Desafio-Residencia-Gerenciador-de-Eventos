package com.neki.gerenciador_eventos.repositories;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import com.neki.gerenciador_eventos.models.Evento;


public interface EventoRepository extends JpaRepository<Evento, Long>{
    Page<Evento> findByAdminId_Id(Long adminId, Pageable pageable);
}
