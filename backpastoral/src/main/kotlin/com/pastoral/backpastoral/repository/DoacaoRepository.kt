package com.pastoral.backpastoral.repository

import com.pastoral.backpastoral.model.Doacao
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import java.time.LocalDate

@Repository
interface DoacaoRepository : JpaRepository<Doacao, Long> {
    fun findByTipo(tipo: String): List<Doacao>
    
    @Query("SELECT d FROM Doacao d WHERE d.dataDoacao BETWEEN :dataInicio AND :dataFim")
    fun findByDataDoacaoBetween(dataInicio: LocalDate, dataFim: LocalDate): List<Doacao>
} 