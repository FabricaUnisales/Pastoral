package com.pastoral.backpastoral.dto

import jakarta.validation.constraints.*

data class PaiRequest(
    @NotBlank(message = "Nome é obrigatório")
    val nome: String,

    @NotBlank(message = "Telefone é obrigatório")
    val telefone: String,

    @NotBlank(message = "Endereço é obrigatório")
    val endereco: String,

    val email: String? = null
) 