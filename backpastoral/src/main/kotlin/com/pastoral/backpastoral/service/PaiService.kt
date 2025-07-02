package com.pastoral.backpastoral.service

import com.pastoral.backpastoral.dto.PaiRequest
import com.pastoral.backpastoral.dto.PaiResponse
import com.pastoral.backpastoral.model.Pai
import com.pastoral.backpastoral.repository.PaiRepository
import org.springframework.stereotype.Service

@Service
class PaiService(
    private val paiRepository: PaiRepository
) {

    fun listarTodos(): List<PaiResponse> {
        return paiRepository.findAll().map { pai ->
            PaiResponse(
                id = pai.id,
                nome = pai.nome,
                telefone = pai.telefone,
                endereco = pai.endereco,
                email = pai.email
            )
        }
    }

    fun buscarPorId(id: Long): PaiResponse? {
        val pai = paiRepository.findById(id).orElse(null) ?: return null
        return PaiResponse(
            id = pai.id,
            nome = pai.nome,
            telefone = pai.telefone,
            endereco = pai.endereco,
            email = pai.email
        )
    }

    fun salvar(paiRequest: PaiRequest): PaiResponse {
        val pai = Pai(
            nome = paiRequest.nome,
            telefone = paiRequest.telefone,
            endereco = paiRequest.endereco,
            email = paiRequest.email
        )

        val paiSalvo = paiRepository.save(pai)
        
        return PaiResponse(
            id = paiSalvo.id,
            nome = paiSalvo.nome,
            telefone = paiSalvo.telefone,
            endereco = paiSalvo.endereco,
            email = paiSalvo.email
        )
    }

    fun atualizar(id: Long, paiRequest: PaiRequest): PaiResponse? {
        if (!paiRepository.existsById(id)) return null
        
        val pai = Pai(
            id = id,
            nome = paiRequest.nome,
            telefone = paiRequest.telefone,
            endereco = paiRequest.endereco,
            email = paiRequest.email
        )

        val paiAtualizado = paiRepository.save(pai)
        
        return PaiResponse(
            id = paiAtualizado.id,
            nome = paiAtualizado.nome,
            telefone = paiAtualizado.telefone,
            endereco = paiAtualizado.endereco,
            email = paiAtualizado.email
        )
    }

    fun excluir(id: Long): Boolean {
        return if (paiRepository.existsById(id)) {
            paiRepository.deleteById(id)
            true
        } else {
            false
        }
    }
} 