package com.pastoral.backpastoral.controller

import com.pastoral.backpastoral.dto.DoacaoRequest
import com.pastoral.backpastoral.dto.DoacaoResponse
import com.pastoral.backpastoral.service.DoacaoService
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
@RequestMapping("/api/doacoes")
@Tag(name = "Doações", description = "Gerenciamento de doações")
class DoacaoController(
    private val doacaoService: DoacaoService
) {

    @GetMapping
    @Operation(summary = "Listar todas as doações", description = "Retorna uma lista com todas as doações cadastradas")
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "Lista de doações retornada com sucesso")
    ])
    fun listarTodas(): ResponseEntity<List<DoacaoResponse>> {
        val doacoes = doacaoService.listarTodas()
        return ResponseEntity.ok(doacoes)
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar doação por ID", description = "Retorna uma doação específica pelo seu ID")
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "Doação encontrada"),
        ApiResponse(responseCode = "404", description = "Doação não encontrada")
    ])
    fun buscarPorId(@Parameter(description = "ID da doação") @PathVariable id: Long): ResponseEntity<DoacaoResponse> {
        val doacao = doacaoService.buscarPorId(id)
        return if (doacao != null) {
            ResponseEntity.ok(doacao)
        } else {
            ResponseEntity.notFound().build()
        }
    }

    @GetMapping("/tipo/{tipo}")
    @Operation(summary = "Listar doações por tipo", description = "Retorna uma lista de doações filtradas por tipo")
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "Lista de doações retornada com sucesso")
    ])
    fun listarPorTipo(@Parameter(description = "Tipo da doação") @PathVariable tipo: String): ResponseEntity<List<DoacaoResponse>> {
        val doacoes = doacaoService.listarPorTipo(tipo)
        return ResponseEntity.ok(doacoes)
    }

    @GetMapping("/periodo")
    @Operation(summary = "Listar doações por período", description = "Retorna uma lista de doações filtradas por período de datas")
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "Lista de doações retornada com sucesso")
    ])
    fun listarPorPeriodo(
        @Parameter(description = "Data de início do período") @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) dataInicio: LocalDate,
        @Parameter(description = "Data de fim do período") @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) dataFim: LocalDate
    ): ResponseEntity<List<DoacaoResponse>> {
        val doacoes = doacaoService.listarPorPeriodo(dataInicio, dataFim)
        return ResponseEntity.ok(doacoes)
    }

    @PostMapping
    @Operation(summary = "Criar nova doação", description = "Cadastra uma nova doação no sistema")
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "Doação criada com sucesso"),
        ApiResponse(responseCode = "400", description = "Dados inválidos")
    ])
    fun criar(@Valid @RequestBody doacaoRequest: DoacaoRequest): ResponseEntity<DoacaoResponse> {
        val doacao = doacaoService.salvar(doacaoRequest)
        return ResponseEntity.ok(doacao)
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar doação", description = "Atualiza os dados de uma doação existente")
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "Doação atualizada com sucesso"),
        ApiResponse(responseCode = "400", description = "Dados inválidos"),
        ApiResponse(responseCode = "404", description = "Doação não encontrada")
    ])
    fun atualizar(@Parameter(description = "ID da doação") @PathVariable id: Long, @Valid @RequestBody doacaoRequest: DoacaoRequest): ResponseEntity<DoacaoResponse> {
        val doacao = doacaoService.atualizar(id, doacaoRequest)
        return if (doacao != null) {
            ResponseEntity.ok(doacao)
        } else {
            ResponseEntity.notFound().build()
        }
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Excluir doação", description = "Remove uma doação do sistema")
    @ApiResponses(value = [
        ApiResponse(responseCode = "204", description = "Doação excluída com sucesso"),
        ApiResponse(responseCode = "404", description = "Doação não encontrada")
    ])
    fun excluir(@Parameter(description = "ID da doação") @PathVariable id: Long): ResponseEntity<Void> {
        return if (doacaoService.excluir(id)) {
            ResponseEntity.noContent().build()
        } else {
            ResponseEntity.notFound().build()
        }
    }
} 