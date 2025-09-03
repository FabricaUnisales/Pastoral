package com.pastoral.backpastoral.dto

import jakarta.validation.constraints.*
import java.time.LocalDate

data class AlunoRequest(
    @NotBlank(message = "Nome é obrigatório")
    val nome: String,

    @NotBlank(message = "Gênero é obrigatório")
    val genero: String,

    @NotNull(message = "Data de nascimento é obrigatória")
    val nascimento: LocalDate,

    @NotBlank(message = "Escola é obrigatória")
    val escola: String,

    @NotBlank(message = "Série é obrigatória")
    val serie: String,

    // Campos opcionais para os nomes dos pais
    val nomeMae: String? = null,
    
    val nomePai: String? = null
) 