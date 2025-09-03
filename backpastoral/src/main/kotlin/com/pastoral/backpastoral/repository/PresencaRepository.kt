package com.pastoral.backpastoral.repository

import com.pastoral.backpastoral.model.Presenca
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository

@Repository
interface PresencaRepository : JpaRepository<Presenca, Long> {
    @Query("SELECT p FROM Presenca p WHERE p.chamada.id = :chamadaId")
    fun findByChamadaId(chamadaId: Long): List<Presenca>
    
    @Query("SELECT p FROM Presenca p WHERE p.aluno.id = :alunoId")
    fun findByAlunoId(alunoId: Long): List<Presenca>
}
