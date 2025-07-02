package com.pastoral.backpastoral.model

import jakarta.persistence.*
import jakarta.validation.constraints.*
import java.time.LocalDate
import com.fasterxml.jackson.annotation.JsonIgnore

@Entity
@Table(name = "alunos")
data class Aluno(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    @Column(nullable = false)
    @NotBlank(message = "Nome é obrigatório")
    val nome: String,

    @Column(nullable = false)
    @NotBlank(message = "Gênero é obrigatório")
    val genero: String,

    @Column(nullable = false)
    @NotNull(message = "Data de nascimento é obrigatória")
    val nascimento: LocalDate,

    @Column(nullable = false)
    @NotBlank(message = "Escola é obrigatória")
    val escola: String,

    @Column(nullable = false)
    @NotBlank(message = "Série é obrigatória")
    val serie: String,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pai_id", nullable = true)
    @JsonIgnore
    val pai: Pai? = null
) 