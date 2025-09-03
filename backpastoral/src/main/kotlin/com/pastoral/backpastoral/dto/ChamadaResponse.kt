package com.pastoral.backpastoral.dto

import java.time.LocalDate
import java.time.LocalDateTime

data class ChamadaResponse(
    val id: Long?,
    val data: LocalDate,
    val descricao: String?,
    val dataCriacao: LocalDateTime,
    val presencas: List<PresencaResponse>,
    val totalAlunos: Int,
    val totalPresentes: Int,
    val totalAusentes: Int,
    val percentualPresenca: Double
)

data class PresencaResponse(
    val id: Long?,
    val alunoId: Long,
    val alunoNome: String,
    val presente: Boolean,
    val horaRegistro: LocalDateTime
)
