package com.pastoral.backpastoral.dto

import jakarta.validation.constraints.*
import java.time.LocalDate
import java.math.BigDecimal

data class DoacaoRequest(
    @NotBlank(message = "Doador é obrigatório")
    val doador: String,

    @NotBlank(message = "Tipo é obrigatório")
    val tipo: String,

    @NotBlank(message = "Descrição é obrigatória")
    val descricao: String,

    val valor: BigDecimal? = null,

    @NotNull(message = "Data da doação é obrigatória")
    val dataDoacao: LocalDate
) 