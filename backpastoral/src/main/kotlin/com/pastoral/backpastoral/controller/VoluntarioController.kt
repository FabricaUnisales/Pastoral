package com.pastoral.backpastoral.controller

import com.pastoral.backpastoral.dto.VoluntarioRequest
import com.pastoral.backpastoral.dto.VoluntarioResponse
import com.pastoral.backpastoral.service.VoluntarioService
import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.Parameter
import io.swagger.v3.oas.annotations.media.Content
import io.swagger.v3.oas.annotations.media.Schema
import io.swagger.v3.oas.annotations.responses.ApiResponse
import io.swagger.v3.oas.annotations.responses.ApiResponses
import io.swagger.v3.oas.annotations.tags.Tag
import jakarta.validation.Valid
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/voluntarios")
@Tag(name = "Voluntários", description = "Gerenciamento de voluntários")
class VoluntarioController(
    private val voluntarioService: VoluntarioService
) {

    @GetMapping
    @Operation(summary = "Listar todos os voluntários", description = "Retorna uma lista com todos os voluntários cadastrados")
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "Lista de voluntários retornada com sucesso")
    ])
    fun listarTodos(): ResponseEntity<List<VoluntarioResponse>> {
        val voluntarios = voluntarioService.listarTodos()
        return ResponseEntity.ok(voluntarios)
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar voluntário por ID", description = "Retorna um voluntário específico pelo seu ID")
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "Voluntário encontrado"),
        ApiResponse(responseCode = "404", description = "Voluntário não encontrado")
    ])
    fun buscarPorId(@Parameter(description = "ID do voluntário") @PathVariable id: Long): ResponseEntity<VoluntarioResponse> {
        val voluntario = voluntarioService.buscarPorId(id)
        return if (voluntario != null) {
            ResponseEntity.ok(voluntario)
        } else {
            ResponseEntity.notFound().build()
        }
    }

    @PostMapping
    @Operation(summary = "Criar novo voluntário", description = "Cadastra um novo voluntário no sistema")
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "Voluntário criado com sucesso"),
        ApiResponse(responseCode = "400", description = "Dados inválidos")
    ])
    fun criar(@Valid @RequestBody voluntarioRequest: VoluntarioRequest): ResponseEntity<VoluntarioResponse> {
        val voluntario = voluntarioService.salvar(voluntarioRequest)
        return ResponseEntity.ok(voluntario)
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar voluntário", description = "Atualiza os dados de um voluntário existente")
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "Voluntário atualizado com sucesso"),
        ApiResponse(responseCode = "400", description = "Dados inválidos"),
        ApiResponse(responseCode = "404", description = "Voluntário não encontrado")
    ])
    fun atualizar(@Parameter(description = "ID do voluntário") @PathVariable id: Long, @Valid @RequestBody voluntarioRequest: VoluntarioRequest): ResponseEntity<VoluntarioResponse> {
        val voluntario = voluntarioService.atualizar(id, voluntarioRequest)
        return if (voluntario != null) {
            ResponseEntity.ok(voluntario)
        } else {
            ResponseEntity.notFound().build()
        }
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Excluir voluntário", description = "Remove um voluntário do sistema")
    @ApiResponses(value = [
        ApiResponse(responseCode = "204", description = "Voluntário excluído com sucesso"),
        ApiResponse(responseCode = "404", description = "Voluntário não encontrado")
    ])
    fun excluir(@Parameter(description = "ID do voluntário") @PathVariable id: Long): ResponseEntity<Void> {
        return if (voluntarioService.excluir(id)) {
            ResponseEntity.noContent().build()
        } else {
            ResponseEntity.notFound().build()
        }
    }
} 