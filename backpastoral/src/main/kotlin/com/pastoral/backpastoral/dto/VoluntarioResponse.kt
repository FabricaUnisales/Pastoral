package com.pastoral.backpastoral.dto

data class VoluntarioResponse(
    val id: Long?,
    val nome: String,
    val telefone: String,
    val email: String,
    val areaAtuacao: String
) 