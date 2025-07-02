package com.pastoral.backpastoral.controller

import com.pastoral.backpastoral.dto.PaiRequest
import com.pastoral.backpastoral.dto.PaiResponse
import com.pastoral.backpastoral.service.PaiService
import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.Parameter
import io.swagger.v3.oas.annotations.responses.ApiResponse
import io.swagger.v3.oas.annotations.responses.ApiResponses
import io.swagger.v3.oas.annotations.tags.Tag
import jakarta.validation.Valid
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/pais")
@Tag(name = "Pais/Responsáveis", description = "Gerenciamento de pais e responsáveis")
class PaiController(
    private val paiService: PaiService
) {

    @GetMapping
    @Operation(summary = "Listar todos os pais", description = "Retorna uma lista com todos os pais/responsáveis cadastrados")
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "Lista de pais retornada com sucesso")
    ])
    fun listarTodos(): ResponseEntity<List<PaiResponse>> {
        val pais = paiService.listarTodos()
        return ResponseEntity.ok(pais)
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar pai por ID", description = "Retorna um pai/responsável específico pelo seu ID")
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "Pai encontrado"),
        ApiResponse(responseCode = "404", description = "Pai não encontrado")
    ])
    fun buscarPorId(@Parameter(description = "ID do pai") @PathVariable id: Long): ResponseEntity<PaiResponse> {
        val pai = paiService.buscarPorId(id)
        return if (pai != null) {
            ResponseEntity.ok(pai)
        } else {
            ResponseEntity.notFound().build()
        }
    }

    @PostMapping
    @Operation(summary = "Criar novo pai", description = "Cadastra um novo pai/responsável no sistema")
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "Pai criado com sucesso"),
        ApiResponse(responseCode = "400", description = "Dados inválidos")
    ])
    fun criar(@Valid @RequestBody paiRequest: PaiRequest): ResponseEntity<PaiResponse> {
        val pai = paiService.salvar(paiRequest)
        return ResponseEntity.ok(pai)
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar pai", description = "Atualiza os dados de um pai/responsável existente")
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "Pai atualizado com sucesso"),
        ApiResponse(responseCode = "400", description = "Dados inválidos"),
        ApiResponse(responseCode = "404", description = "Pai não encontrado")
    ])
    fun atualizar(@Parameter(description = "ID do pai") @PathVariable id: Long, @Valid @RequestBody paiRequest: PaiRequest): ResponseEntity<PaiResponse> {
        val pai = paiService.atualizar(id, paiRequest)
        return if (pai != null) {
            ResponseEntity.ok(pai)
        } else {
            ResponseEntity.notFound().build()
        }
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Excluir pai", description = "Remove um pai/responsável do sistema")
    @ApiResponses(value = [
        ApiResponse(responseCode = "204", description = "Pai excluído com sucesso"),
        ApiResponse(responseCode = "404", description = "Pai não encontrado")
    ])
    fun excluir(@Parameter(description = "ID do pai") @PathVariable id: Long): ResponseEntity<Void> {
        return if (paiService.excluir(id)) {
            ResponseEntity.noContent().build()
        } else {
            ResponseEntity.notFound().build()
        }
    }
} 