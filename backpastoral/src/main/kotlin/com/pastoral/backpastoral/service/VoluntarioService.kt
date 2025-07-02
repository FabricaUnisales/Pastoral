package com.pastoral.backpastoral.service

import com.pastoral.backpastoral.dto.VoluntarioRequest
import com.pastoral.backpastoral.dto.VoluntarioResponse
import com.pastoral.backpastoral.model.Voluntario
import com.pastoral.backpastoral.repository.VoluntarioRepository
import org.springframework.stereotype.Service

@Service
class VoluntarioService(
    private val voluntarioRepository: VoluntarioRepository
) {

    fun listarTodos(): List<VoluntarioResponse> {
        return voluntarioRepository.findAll().map { voluntario ->
            VoluntarioResponse(
                id = voluntario.id,
                nome = voluntario.nome,
                telefone = voluntario.telefone,
                email = voluntario.email,
                areaAtuacao = voluntario.areaAtuacao
            )
        }
    }

    fun buscarPorId(id: Long): VoluntarioResponse? {
        val voluntario = voluntarioRepository.findById(id).orElse(null) ?: return null
        return VoluntarioResponse(
            id = voluntario.id,
            nome = voluntario.nome,
            telefone = voluntario.telefone,
            email = voluntario.email,
            areaAtuacao = voluntario.areaAtuacao
        )
    }

    fun salvar(voluntarioRequest: VoluntarioRequest): VoluntarioResponse {
        val voluntario = Voluntario(
            nome = voluntarioRequest.nome,
            telefone = voluntarioRequest.telefone,
            email = voluntarioRequest.email,
            areaAtuacao = voluntarioRequest.areaAtuacao
        )

        val voluntarioSalvo = voluntarioRepository.save(voluntario)
        
        return VoluntarioResponse(
            id = voluntarioSalvo.id,
            nome = voluntarioSalvo.nome,
            telefone = voluntarioSalvo.telefone,
            email = voluntarioSalvo.email,
            areaAtuacao = voluntarioSalvo.areaAtuacao
        )
    }

    fun atualizar(id: Long, voluntarioRequest: VoluntarioRequest): VoluntarioResponse? {
        if (!voluntarioRepository.existsById(id)) return null
        
        val voluntario = Voluntario(
            id = id,
            nome = voluntarioRequest.nome,
            telefone = voluntarioRequest.telefone,
            email = voluntarioRequest.email,
            areaAtuacao = voluntarioRequest.areaAtuacao
        )

        val voluntarioAtualizado = voluntarioRepository.save(voluntario)
        
        return VoluntarioResponse(
            id = voluntarioAtualizado.id,
            nome = voluntarioAtualizado.nome,
            telefone = voluntarioAtualizado.telefone,
            email = voluntarioAtualizado.email,
            areaAtuacao = voluntarioAtualizado.areaAtuacao
        )
    }

    fun excluir(id: Long): Boolean {
        return if (voluntarioRepository.existsById(id)) {
            voluntarioRepository.deleteById(id)
            true
        } else {
            false
        }
    }
} 