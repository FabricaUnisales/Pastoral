package com.pastoral.backpastoral.model

import jakarta.persistence.*
import jakarta.validation.constraints.*
import java.time.LocalDate
import java.time.LocalDateTime

@Entity
@Table(name = "chamadas")
data class Chamada(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    @Column(nullable = false)
    @NotNull(message = "Data é obrigatória")
    val data: LocalDate,

    @Column
    val descricao: String? = null,

    @Column(name = "data_criacao", nullable = false)
    val dataCriacao: LocalDateTime = LocalDateTime.now(),

    @OneToMany(mappedBy = "chamada", cascade = [CascadeType.ALL], fetch = FetchType.LAZY)
    val presencas: List<Presenca> = emptyList()
)
