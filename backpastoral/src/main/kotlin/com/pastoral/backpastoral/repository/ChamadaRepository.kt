package com.pastoral.backpastoral.repository

import com.pastoral.backpastoral.model.Chamada
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import java.time.LocalDate

@Repository
interface ChamadaRepository : JpaRepository<Chamada, Long> {
    fun findByData(data: LocalDate): Chamada?
    
    @Query("SELECT c FROM Chamada c ORDER BY c.data DESC")
    fun findAllOrderByDataDesc(): List<Chamada>
    
    @Query("SELECT c FROM Chamada c WHERE c.data BETWEEN :dataInicio AND :dataFim ORDER BY c.data DESC")
    fun findByDataBetweenOrderByDataDesc(dataInicio: LocalDate, dataFim: LocalDate): List<Chamada>
}
