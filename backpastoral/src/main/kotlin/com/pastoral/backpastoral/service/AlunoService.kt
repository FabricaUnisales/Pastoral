package com.pastoral.backpastoral.service

import com.pastoral.backpastoral.dto.AlunoRequest
import com.pastoral.backpastoral.dto.AlunoResponse
import com.pastoral.backpastoral.model.Aluno
import com.pastoral.backpastoral.repository.AlunoRepository
import com.pastoral.backpastoral.repository.PaiRepository
import org.springframework.stereotype.Service

@Service
class AlunoService(
    private val alunoRepository: AlunoRepository,
    private val paiRepository: PaiRepository
) {

    fun listarTodos(): List<AlunoResponse> {
        return alunoRepository.findAll().map { aluno ->
            AlunoResponse(
                id = aluno.id,
                nome = aluno.nome,
                genero = aluno.genero,
                nascimento = aluno.nascimento,
                escola = aluno.escola,
                serie = aluno.serie,
                paiNome = aluno.pai?.nome,
                paiId = aluno.pai?.id
            )
        }
    }

    fun buscarPorId(id: Long): AlunoResponse? {
        val aluno = alunoRepository.findById(id).orElse(null) ?: return null
        return AlunoResponse(
            id = aluno.id,
            nome = aluno.nome,
            genero = aluno.genero,
            nascimento = aluno.nascimento,
            escola = aluno.escola,
            serie = aluno.serie,
            paiNome = aluno.pai?.nome,
            paiId = aluno.pai?.id
        )
    }

    fun salvar(alunoRequest: AlunoRequest): AlunoResponse? {
        val pai = if (alunoRequest.paiId != null && alunoRequest.paiId > 0) {
            paiRepository.findById(alunoRequest.paiId).orElse(null) ?: return null
        } else {
            null
        }
        
        val aluno = Aluno(
            nome = alunoRequest.nome,
            genero = alunoRequest.genero,
            nascimento = alunoRequest.nascimento,
            escola = alunoRequest.escola,
            serie = alunoRequest.serie,
            pai = pai
        )

        val alunoSalvo = alunoRepository.save(aluno)
        
        return AlunoResponse(
            id = alunoSalvo.id,
            nome = alunoSalvo.nome,
            genero = alunoSalvo.genero,
            nascimento = alunoSalvo.nascimento,
            escola = alunoSalvo.escola,
            serie = alunoSalvo.serie,
            paiNome = alunoSalvo.pai?.nome,
            paiId = alunoSalvo.pai?.id
        )
    }

    fun atualizar(id: Long, alunoRequest: AlunoRequest): AlunoResponse? {
        if (!alunoRepository.existsById(id)) return null
        
        val pai = if (alunoRequest.paiId != null && alunoRequest.paiId > 0) {
            paiRepository.findById(alunoRequest.paiId).orElse(null) ?: return null
        } else {
            null
        }
        
        val aluno = Aluno(
            id = id,
            nome = alunoRequest.nome,
            genero = alunoRequest.genero,
            nascimento = alunoRequest.nascimento,
            escola = alunoRequest.escola,
            serie = alunoRequest.serie,
            pai = pai
        )

        val alunoAtualizado = alunoRepository.save(aluno)
        
        return AlunoResponse(
            id = alunoAtualizado.id,
            nome = alunoAtualizado.nome,
            genero = alunoAtualizado.genero,
            nascimento = alunoAtualizado.nascimento,
            escola = alunoAtualizado.escola,
            serie = alunoAtualizado.serie,
            paiNome = alunoAtualizado.pai?.nome,
            paiId = alunoAtualizado.pai?.id
        )
    }

    fun excluir(id: Long): Boolean {
        return if (alunoRepository.existsById(id)) {
            alunoRepository.deleteById(id)
            true
        } else {
            false
        }
    }

    fun listarPorPai(paiId: Long): List<AlunoResponse> {
        return alunoRepository.findByPaiId(paiId).map { aluno ->
            AlunoResponse(
                id = aluno.id,
                nome = aluno.nome,
                genero = aluno.genero,
                nascimento = aluno.nascimento,
                escola = aluno.escola,
                serie = aluno.serie,
                paiNome = aluno.pai?.nome,
                paiId = aluno.pai?.id
            )
        }
    }
} 