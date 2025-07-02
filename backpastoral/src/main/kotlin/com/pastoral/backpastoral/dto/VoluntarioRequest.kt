package com.pastoral.backpastoral.dto

import jakarta.validation.constraints.*

data class VoluntarioRequest(
    @NotBlank(message = "Nome é obrigatório")
    val nome: String,

    @NotBlank(message = "Telefone é obrigatório")
    val telefone: String,

    @NotBlank(message = "Email é obrigatório")
    @Email(message = "Email deve ser válido")
    val email: String,

    @NotBlank(message = "Área de atuação é obrigatória")
    val areaAtuacao: String
) 