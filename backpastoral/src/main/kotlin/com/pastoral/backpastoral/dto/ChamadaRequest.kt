package com.pastoral.backpastoral.dto

import jakarta.validation.constraints.*
import java.time.LocalDate

data class ChamadaRequest(
    @NotNull(message = "Data é obrigatória")
    val data: LocalDate,

    val descricao: String? = null,

    @NotEmpty(message = "Presenças são obrigatórias")
    val presencas: List<PresencaRequest>
)

data class PresencaRequest(
    @NotNull(message = "ID do aluno é obrigatório")
    val alunoId: Long,

    val presente: Boolean = true
)
