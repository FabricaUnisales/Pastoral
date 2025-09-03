package com.pastoral.backpastoral.controller

import com.pastoral.backpastoral.dto.ChamadaRequest
import com.pastoral.backpastoral.dto.ChamadaResponse
import com.pastoral.backpastoral.service.ChamadaService
import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.Parameter
import io.swagger.v3.oas.annotations.responses.ApiResponse
import io.swagger.v3.oas.annotations.responses.ApiResponses
import io.swagger.v3.oas.annotations.tags.Tag
import jakarta.validation.Valid
import org.springframework.format.annotation.DateTimeFormat
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.time.LocalDate

@RestController
@RequestMapping("/api/chamadas")
@Tag(name = "Chamadas", description = "Gerenciamento de chamadas e presenças")
class ChamadaController(
    private val chamadaService: ChamadaService
) {

    @GetMapping
    @Operation(summary = "Listar todas as chamadas", description = "Retorna uma lista com todas as chamadas realizadas")
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "Lista de chamadas retornada com sucesso")
    ])
    fun listarTodas(): ResponseEntity<List<ChamadaResponse>> {
        val chamadas = chamadaService.listarTodas()
        return ResponseEntity.ok(chamadas)
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar chamada por ID", description = "Retorna uma chamada específica pelo seu ID")
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "Chamada encontrada"),
        ApiResponse(responseCode = "404", description = "Chamada não encontrada")
    ])
    fun buscarPorId(@Parameter(description = "ID da chamada") @PathVariable id: Long): ResponseEntity<ChamadaResponse> {
        val chamada = chamadaService.buscarPorId(id)
        return if (chamada != null) {
            ResponseEntity.ok(chamada)
        } else {
            ResponseEntity.notFound().build()
        }
    }

    @GetMapping("/data/{data}")
    @Operation(summary = "Buscar chamada por data", description = "Retorna a chamada de uma data específica")
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "Chamada encontrada"),
        ApiResponse(responseCode = "404", description = "Chamada não encontrada")
    ])
    fun buscarPorData(
        @Parameter(description = "Data da chamada (formato: YYYY-MM-DD)")
        @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) data: LocalDate
    ): ResponseEntity<ChamadaResponse> {
        val chamada = chamadaService.buscarPorData(data)
        return if (chamada != null) {
            ResponseEntity.ok(chamada)
        } else {
            ResponseEntity.notFound().build()
        }
    }

    @GetMapping("/periodo")
    @Operation(summary = "Listar chamadas por período", description = "Retorna uma lista de chamadas filtradas por período de datas")
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "Lista de chamadas retornada com sucesso")
    ])
    fun listarPorPeriodo(
        @Parameter(description = "Data de início do período") @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) dataInicio: LocalDate,
        @Parameter(description = "Data de fim do período") @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) dataFim: LocalDate
    ): ResponseEntity<List<ChamadaResponse>> {
        val chamadas = chamadaService.listarPorPeriodo(dataInicio, dataFim)
        return ResponseEntity.ok(chamadas)
    }

    @PostMapping
    @Operation(summary = "Criar nova chamada", description = "Registra uma nova chamada no sistema")
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "Chamada criada com sucesso"),
        ApiResponse(responseCode = "400", description = "Dados inválidos ou chamada já existe para esta data")
    ])
    fun criar(@Valid @RequestBody chamadaRequest: ChamadaRequest): ResponseEntity<Any> {
        return try {
            val chamada = chamadaService.salvar(chamadaRequest)
            ResponseEntity.ok(chamada)
        } catch (e: IllegalArgumentException) {
            ResponseEntity.badRequest().body(mapOf("erro" to e.message))
        }
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar chamada", description = "Atualiza os dados de uma chamada existente")
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "Chamada atualizada com sucesso"),
        ApiResponse(responseCode = "400", description = "Dados inválidos"),
        ApiResponse(responseCode = "404", description = "Chamada não encontrada")
    ])
    fun atualizar(
        @Parameter(description = "ID da chamada") @PathVariable id: Long,
        @Valid @RequestBody chamadaRequest: ChamadaRequest
    ): ResponseEntity<Any> {
        return try {
            val chamada = chamadaService.atualizar(id, chamadaRequest)
            if (chamada != null) {
                ResponseEntity.ok(chamada)
            } else {
                ResponseEntity.notFound().build()
            }
        } catch (e: IllegalArgumentException) {
            ResponseEntity.badRequest().body(mapOf("erro" to e.message))
        }
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Excluir chamada", description = "Remove uma chamada do sistema")
    @ApiResponses(value = [
        ApiResponse(responseCode = "204", description = "Chamada excluída com sucesso"),
        ApiResponse(responseCode = "404", description = "Chamada não encontrada")
    ])
    fun excluir(@Parameter(description = "ID da chamada") @PathVariable id: Long): ResponseEntity<Void> {
        return if (chamadaService.excluir(id)) {
            ResponseEntity.noContent().build()
        } else {
            ResponseEntity.notFound().build()
        }
    }
}
