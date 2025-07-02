package com.pastoral.backpastoral.dto

import java.time.LocalDate

data class AlunoResponse(
    val id: Long?,
    val nome: String,
    val genero: String,
    val nascimento: LocalDate,
    val escola: String,
    val serie: String,
    val paiNome: String?,
    val paiId: Long?
) 