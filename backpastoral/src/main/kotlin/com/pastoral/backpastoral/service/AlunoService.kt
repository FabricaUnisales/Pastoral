package com.pastoral.backpastoral.service

import com.pastoral.backpastoral.dto.AlunoRequest
import com.pastoral.backpastoral.dto.AlunoResponse
import com.pastoral.backpastoral.model.Aluno
import com.pastoral.backpastoral.repository.AlunoRepository
import org.springframework.stereotype.Service
import kotlin.random.Random

@Service
class AlunoService(
    private val alunoRepository: AlunoRepository
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
                nomeMae = aluno.nomeMae,
                nomePai = aluno.nomePai,
                codigoCarteirinha = aluno.codigoCarteirinha
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
            nomeMae = aluno.nomeMae,
            nomePai = aluno.nomePai,
            codigoCarteirinha = aluno.codigoCarteirinha
        )
    }

    fun salvar(alunoRequest: AlunoRequest): AlunoResponse {
        val codigoCarteirinha = gerarCodigoUnico()
        
        val aluno = Aluno(
            nome = alunoRequest.nome,
            genero = alunoRequest.genero,
            nascimento = alunoRequest.nascimento,
            escola = alunoRequest.escola,
            serie = alunoRequest.serie,
            nomeMae = alunoRequest.nomeMae,
            nomePai = alunoRequest.nomePai,
            codigoCarteirinha = codigoCarteirinha
        )

        val alunoSalvo = alunoRepository.save(aluno)
        
        return AlunoResponse(
            id = alunoSalvo.id,
            nome = alunoSalvo.nome,
            genero = alunoSalvo.genero,
            nascimento = alunoSalvo.nascimento,
            escola = alunoSalvo.escola,
            serie = alunoSalvo.serie,
            nomeMae = alunoSalvo.nomeMae,
            nomePai = alunoSalvo.nomePai,
            codigoCarteirinha = alunoSalvo.codigoCarteirinha
        )
    }

    fun atualizar(id: Long, alunoRequest: AlunoRequest): AlunoResponse? {
        val alunoExistente = alunoRepository.findById(id).orElse(null) ?: return null
        
        val aluno = Aluno(
            id = id,
            nome = alunoRequest.nome,
            genero = alunoRequest.genero,
            nascimento = alunoRequest.nascimento,
            escola = alunoRequest.escola,
            serie = alunoRequest.serie,
            nomeMae = alunoRequest.nomeMae,
            nomePai = alunoRequest.nomePai,
            codigoCarteirinha = alunoExistente.codigoCarteirinha // Mantém o código existente
        )

        val alunoAtualizado = alunoRepository.save(aluno)
        
        return AlunoResponse(
            id = alunoAtualizado.id,
            nome = alunoAtualizado.nome,
            genero = alunoAtualizado.genero,
            nascimento = alunoAtualizado.nascimento,
            escola = alunoAtualizado.escola,
            serie = alunoAtualizado.serie,
            nomeMae = alunoAtualizado.nomeMae,
            nomePai = alunoAtualizado.nomePai,
            codigoCarteirinha = alunoAtualizado.codigoCarteirinha
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

    private fun gerarCodigoUnico(): String {
        var codigo: String
        do {
            codigo = gerarCodigoAleatorio()
        } while (alunoRepository.existsByCodigoCarteirinha(codigo))
        return codigo
    }

    private fun gerarCodigoAleatorio(): String {
        return (1..10).map { Random.nextInt(0, 10) }.joinToString("")
    }
}