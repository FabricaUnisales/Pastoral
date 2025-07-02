package com.pastoral.backpastoral.dto

import java.time.LocalDate
import java.math.BigDecimal

data class DoacaoResponse(
    val id: Long?,
    val doador: String,
    val tipo: String,
    val descricao: String,
    val valor: BigDecimal?,
    val dataDoacao: LocalDate
) 