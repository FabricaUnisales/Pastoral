package com.pastoral.backpastoral.model

import jakarta.persistence.*
import jakarta.validation.constraints.*
import java.time.LocalDateTime
import com.fasterxml.jackson.annotation.JsonIgnore

@Entity
@Table(
    name = "presencas",
    uniqueConstraints = [UniqueConstraint(columnNames = ["chamada_id", "aluno_id"])]
)
data class Presenca(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chamada_id", nullable = false)
    @JsonIgnore
    val chamada: Chamada,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "aluno_id", nullable = false)
    @JsonIgnore
    val aluno: Aluno,

    @Column(nullable = false)
    val presente: Boolean = true,

    @Column(name = "hora_registro", nullable = false)
    val horaRegistro: LocalDateTime = LocalDateTime.now()
)
