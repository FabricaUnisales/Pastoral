package com.pastoral.backpastoral.dto

data class PaiResponse(
    val id: Long?,
    val nome: String,
    val telefone: String,
    val endereco: String,
    val email: String?
) 