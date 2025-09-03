package com.pastoral.backpastoral.model

import jakarta.persistence.*
import jakarta.validation.constraints.*
import java.time.LocalDate
import java.math.BigDecimal

@Entity
@Table(name = "doacoes")
data class Doacao(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    @Column(nullable = false)
    @NotBlank(message = "Doador é obrigatório")
    val doador: String,

    @Column(nullable = false)
    @NotBlank(message = "Tipo é obrigatório")
    val tipo: String,

    @Column(nullable = false)
    @NotBlank(message = "Descrição é obrigatória")
    val descricao: String,

    @Column(precision = 10, scale = 2)
    val valor: BigDecimal? = null,

    @Column(nullable = false)
    @NotNull(message = "Data da doação é obrigatória")
    val dataDoacao: LocalDate,

    @Column(columnDefinition = "LONGBLOB")
    val arquivo: ByteArray? = null,

    @Column
    val nomeArquivo: String? = null,

    @Column
    val tipoArquivo: String? = null
) 