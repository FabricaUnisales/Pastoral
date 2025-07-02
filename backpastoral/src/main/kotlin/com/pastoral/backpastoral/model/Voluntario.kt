package com.pastoral.backpastoral.model

import jakarta.persistence.*
import jakarta.validation.constraints.*

@Entity
@Table(name = "voluntarios")
data class Voluntario(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    @Column(nullable = false)
    @NotBlank(message = "Nome é obrigatório")
    val nome: String,

    @Column(nullable = false)
    @NotBlank(message = "Telefone é obrigatório")
    val telefone: String,

    @Column(nullable = false)
    @Email(message = "Email deve ser válido")
    @NotBlank(message = "Email é obrigatório")
    val email: String,

    @Column(nullable = false)
    @NotBlank(message = "Área de atuação é obrigatória")
    val areaAtuacao: String
) 