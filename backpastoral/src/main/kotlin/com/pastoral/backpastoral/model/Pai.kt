package com.pastoral.backpastoral.model

import jakarta.persistence.*
import jakarta.validation.constraints.*

@Entity
@Table(name = "pais")
data class Pai(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    @Column(nullable = false)
    @NotBlank(message = "Nome é obrigatório")
    val nome: String,

    @Column(nullable = false)
    @NotBlank(message = "Endereço é obrigatório")
    val endereco: String,

    @Column(nullable = false)
    @NotBlank(message = "Telefone é obrigatório")
    val telefone: String,

    @Column
    @Email(message = "Email deve ser válido")
    val email: String? = null,

    @OneToMany(mappedBy = "pai", cascade = [CascadeType.ALL], fetch = FetchType.LAZY)
    val alunos: List<Aluno> = emptyList()
) 