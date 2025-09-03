package com.pastoral.backpastoral.repository

import com.pastoral.backpastoral.model.Aluno
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface AlunoRepository : JpaRepository<Aluno, Long> {
    fun existsByCodigoCarteirinha(codigoCarteirinha: String): Boolean
} 