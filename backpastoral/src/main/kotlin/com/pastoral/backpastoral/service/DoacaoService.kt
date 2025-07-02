package com.pastoral.backpastoral.service

import com.pastoral.backpastoral.dto.DoacaoRequest
import com.pastoral.backpastoral.dto.DoacaoResponse
import com.pastoral.backpastoral.model.Doacao
import com.pastoral.backpastoral.repository.DoacaoRepository
import org.springframework.stereotype.Service
import java.time.LocalDate
import java.math.BigDecimal

@Service
class DoacaoService(
    private val doacaoRepository: DoacaoRepository
) {

    fun listarTodas(): List<DoacaoResponse> {
        return doacaoRepository.findAll().map { doacao ->
            DoacaoResponse(
                id = doacao.id,
                doador = doacao.doador,
                tipo = doacao.tipo,
                descricao = doacao.descricao,
                valor = doacao.valor,
                dataDoacao = doacao.dataDoacao
            )
        }
    }

    fun buscarPorId(id: Long): DoacaoResponse? {
        val doacao = doacaoRepository.findById(id).orElse(null) ?: return null
        return DoacaoResponse(
            id = doacao.id,
            doador = doacao.doador,
            tipo = doacao.tipo,
            descricao = doacao.descricao,
            valor = doacao.valor,
            dataDoacao = doacao.dataDoacao
        )
    }

    fun salvar(doacaoRequest: DoacaoRequest): DoacaoResponse {
        val doacao = Doacao(
            doador = doacaoRequest.doador,
            tipo = doacaoRequest.tipo,
            descricao = doacaoRequest.descricao,
            valor = doacaoRequest.valor,
            dataDoacao = doacaoRequest.dataDoacao
        )

        val doacaoSalva = doacaoRepository.save(doacao)
        
        return DoacaoResponse(
            id = doacaoSalva.id,
            doador = doacaoSalva.doador,
            tipo = doacaoSalva.tipo,
            descricao = doacaoSalva.descricao,
            valor = doacaoSalva.valor,
            dataDoacao = doacaoSalva.dataDoacao
        )
    }

    fun atualizar(id: Long, doacaoRequest: DoacaoRequest): DoacaoResponse? {
        if (!doacaoRepository.existsById(id)) return null
        
        val doacao = Doacao(
            id = id,
            doador = doacaoRequest.doador,
            tipo = doacaoRequest.tipo,
            descricao = doacaoRequest.descricao,
            valor = doacaoRequest.valor,
            dataDoacao = doacaoRequest.dataDoacao
        )

        val doacaoAtualizada = doacaoRepository.save(doacao)
        
        return DoacaoResponse(
            id = doacaoAtualizada.id,
            doador = doacaoAtualizada.doador,
            tipo = doacaoAtualizada.tipo,
            descricao = doacaoAtualizada.descricao,
            valor = doacaoAtualizada.valor,
            dataDoacao = doacaoAtualizada.dataDoacao
        )
    }

    fun listarPorTipo(tipo: String): List<DoacaoResponse> {
        return doacaoRepository.findByTipo(tipo).map { doacao ->
            DoacaoResponse(
                id = doacao.id,
                doador = doacao.doador,
                tipo = doacao.tipo,
                descricao = doacao.descricao,
                valor = doacao.valor,
                dataDoacao = doacao.dataDoacao
            )
        }
    }

    fun listarPorPeriodo(dataInicio: LocalDate, dataFim: LocalDate): List<DoacaoResponse> {
        return doacaoRepository.findByDataDoacaoBetween(dataInicio, dataFim).map { doacao ->
            DoacaoResponse(
                id = doacao.id,
                doador = doacao.doador,
                tipo = doacao.tipo,
                descricao = doacao.descricao,
                valor = doacao.valor,
                dataDoacao = doacao.dataDoacao
            )
        }
    }

    fun excluir(id: Long): Boolean {
        return if (doacaoRepository.existsById(id)) {
            doacaoRepository.deleteById(id)
            true
        } else {
            false
        }
    }
} 