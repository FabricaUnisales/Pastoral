package com.pastoral.backpastoral.dto

import jakarta.validation.constraints.*
import java.time.LocalDate
import java.math.BigDecimal
import org.springframework.web.multipart.MultipartFile

data class DoacaoComArquivoRequest(
    @NotBlank(message = "Doador é obrigatório")
    val doador: String,

    @NotBlank(message = "Tipo é obrigatório")
    val tipo: String,

    @NotBlank(message = "Descrição é obrigatória")
    val descricao: String,

    val valor: BigDecimal? = null,

    @NotNull(message = "Data da doação é obrigatória")
    val dataDoacao: LocalDate,

    val arquivo: MultipartFile? = null
) {
    fun converterParaDoacaoRequest(): DoacaoRequest {
        return DoacaoRequest(
            doador = doador,
            tipo = tipo,
            descricao = descricao,
            valor = valor,
            dataDoacao = dataDoacao,
            arquivo = arquivo?.bytes,
            nomeArquivo = arquivo?.originalFilename,
            tipoArquivo = arquivo?.contentType
        )
    }
}
