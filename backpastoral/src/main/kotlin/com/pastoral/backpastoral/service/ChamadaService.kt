package com.pastoral.backpastoral.service

import com.pastoral.backpastoral.dto.ChamadaRequest
import com.pastoral.backpastoral.dto.ChamadaResponse
import com.pastoral.backpastoral.dto.PresencaResponse
import com.pastoral.backpastoral.model.Chamada
import com.pastoral.backpastoral.model.Presenca
import com.pastoral.backpastoral.repository.ChamadaRepository
import com.pastoral.backpastoral.repository.PresencaRepository
import com.pastoral.backpastoral.repository.AlunoRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.time.LocalDate

@Service
class ChamadaService(
    private val chamadaRepository: ChamadaRepository,
    private val presencaRepository: PresencaRepository,
    private val alunoRepository: AlunoRepository
) {

    fun listarTodas(): List<ChamadaResponse> {
        return chamadaRepository.findAllOrderByDataDesc().map { chamada ->
            converterParaResponse(chamada)
        }
    }

    fun buscarPorId(id: Long): ChamadaResponse? {
        val chamada = chamadaRepository.findById(id).orElse(null) ?: return null
        return converterParaResponse(chamada)
    }

    fun buscarPorData(data: LocalDate): ChamadaResponse? {
        val chamada = chamadaRepository.findByData(data) ?: return null
        return converterParaResponse(chamada)
    }

    fun listarPorPeriodo(dataInicio: LocalDate, dataFim: LocalDate): List<ChamadaResponse> {
        return chamadaRepository.findByDataBetweenOrderByDataDesc(dataInicio, dataFim).map { chamada ->
            converterParaResponse(chamada)
        }
    }

    @Transactional
    fun salvar(chamadaRequest: ChamadaRequest): ChamadaResponse {
        // Verificar se já existe chamada para esta data
        val chamadaExistente = chamadaRepository.findByData(chamadaRequest.data)
        if (chamadaExistente != null) {
            throw IllegalArgumentException("Já existe uma chamada para a data ${chamadaRequest.data}")
        }

        // Criar a chamada
        val chamada = Chamada(
            data = chamadaRequest.data,
            descricao = chamadaRequest.descricao
        )

        val chamadaSalva = chamadaRepository.save(chamada)

        // Criar as presenças
        val presencas = chamadaRequest.presencas.map { presencaRequest ->
            val aluno = alunoRepository.findById(presencaRequest.alunoId).orElse(null)
                ?: throw IllegalArgumentException("Aluno com ID ${presencaRequest.alunoId} não encontrado")

            Presenca(
                chamada = chamadaSalva,
                aluno = aluno,
                presente = presencaRequest.presente
            )
        }

        presencaRepository.saveAll(presencas)

        return converterParaResponse(chamadaSalva)
    }

    @Transactional
    fun atualizar(id: Long, chamadaRequest: ChamadaRequest): ChamadaResponse? {
        val chamadaExistente = chamadaRepository.findById(id).orElse(null) ?: return null

        // Verificar se a nova data já existe em outra chamada
        if (chamadaExistente.data != chamadaRequest.data) {
            val chamadaComMesmaData = chamadaRepository.findByData(chamadaRequest.data)
            if (chamadaComMesmaData != null) {
                throw IllegalArgumentException("Já existe uma chamada para a data ${chamadaRequest.data}")
            }
        }

        // Atualizar a chamada
        val chamadaAtualizada = Chamada(
            id = id,
            data = chamadaRequest.data,
            descricao = chamadaRequest.descricao,
            dataCriacao = chamadaExistente.dataCriacao
        )

        val chamadaSalva = chamadaRepository.save(chamadaAtualizada)

        // Remover presenças antigas
        val presencasAntigas = presencaRepository.findByChamadaId(id)
        presencaRepository.deleteAll(presencasAntigas)

        // Criar novas presenças
        val novasPresencas = chamadaRequest.presencas.map { presencaRequest ->
            val aluno = alunoRepository.findById(presencaRequest.alunoId).orElse(null)
                ?: throw IllegalArgumentException("Aluno com ID ${presencaRequest.alunoId} não encontrado")

            Presenca(
                chamada = chamadaSalva,
                aluno = aluno,
                presente = presencaRequest.presente
            )
        }

        presencaRepository.saveAll(novasPresencas)

        return converterParaResponse(chamadaSalva)
    }

    fun excluir(id: Long): Boolean {
        return if (chamadaRepository.existsById(id)) {
            chamadaRepository.deleteById(id)
            true
        } else {
            false
        }
    }

    private fun converterParaResponse(chamada: Chamada): ChamadaResponse {
        val presencas = presencaRepository.findByChamadaId(chamada.id!!)
        
        val presencasResponse = presencas.map { presenca ->
            PresencaResponse(
                id = presenca.id,
                alunoId = presenca.aluno.id!!,
                alunoNome = presenca.aluno.nome,
                presente = presenca.presente,
                horaRegistro = presenca.horaRegistro
            )
        }

        val totalAlunos = presencas.size
        val totalPresentes = presencas.count { it.presente }
        val totalAusentes = totalAlunos - totalPresentes
        val percentualPresenca = if (totalAlunos > 0) {
            (totalPresentes.toDouble() / totalAlunos.toDouble()) * 100
        } else {
            0.0
        }

        return ChamadaResponse(
            id = chamada.id,
            data = chamada.data,
            descricao = chamada.descricao,
            dataCriacao = chamada.dataCriacao,
            presencas = presencasResponse,
            totalAlunos = totalAlunos,
            totalPresentes = totalPresentes,
            totalAusentes = totalAusentes,
            percentualPresenca = percentualPresenca
        )
    }
}
