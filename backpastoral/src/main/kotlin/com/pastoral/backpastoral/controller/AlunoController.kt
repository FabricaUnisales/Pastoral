package com.pastoral.backpastoral.controller

import com.pastoral.backpastoral.dto.AlunoRequest
import com.pastoral.backpastoral.dto.AlunoResponse
import com.pastoral.backpastoral.service.AlunoService
import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.Parameter
import io.swagger.v3.oas.annotations.responses.ApiResponse
import io.swagger.v3.oas.annotations.responses.ApiResponses
import io.swagger.v3.oas.annotations.tags.Tag
import jakarta.validation.Valid
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/alunos")
@Tag(name = "Alunos", description = "Gerenciamento de alunos")
class AlunoController(
    private val alunoService: AlunoService
) {

    @GetMapping
    @Operation(summary = "Listar todos os alunos", description = "Retorna uma lista com todos os alunos cadastrados")
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "Lista de alunos retornada com sucesso")
    ])
    fun listarTodos(): ResponseEntity<List<AlunoResponse>> {
        val alunos = alunoService.listarTodos()
        return ResponseEntity.ok(alunos)
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar aluno por ID", description = "Retorna um aluno específico pelo seu ID")
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "Aluno encontrado"),
        ApiResponse(responseCode = "404", description = "Aluno não encontrado")
    ])
    fun buscarPorId(@Parameter(description = "ID do aluno") @PathVariable id: Long): ResponseEntity<AlunoResponse> {
        val aluno = alunoService.buscarPorId(id)
        return if (aluno != null) {
            ResponseEntity.ok(aluno)
        } else {
            ResponseEntity.notFound().build()
        }
    }

    @GetMapping("/pai/{paiId}")
    @Operation(summary = "Listar alunos por pai", description = "Retorna uma lista de alunos de um responsável específico")
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "Lista de alunos retornada com sucesso")
    ])
    fun listarPorPai(@Parameter(description = "ID do pai/responsável") @PathVariable paiId: Long): ResponseEntity<List<AlunoResponse>> {
        val alunos = alunoService.listarPorPai(paiId)
        return ResponseEntity.ok(alunos)
    }

    @PostMapping
    @Operation(summary = "Criar novo aluno", description = "Cadastra um novo aluno no sistema")
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "Aluno criado com sucesso"),
        ApiResponse(responseCode = "400", description = "Dados inválidos ou pai não encontrado")
    ])
    fun criar(@Valid @RequestBody alunoRequest: AlunoRequest): ResponseEntity<AlunoResponse> {
        val aluno = alunoService.salvar(alunoRequest)
        return if (aluno != null) {
            ResponseEntity.ok(aluno)
        } else {
            ResponseEntity.badRequest().build()
        }
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar aluno", description = "Atualiza os dados de um aluno existente")
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "Aluno atualizado com sucesso"),
        ApiResponse(responseCode = "400", description = "Dados inválidos"),
        ApiResponse(responseCode = "404", description = "Aluno não encontrado")
    ])
    fun atualizar(@Parameter(description = "ID do aluno") @PathVariable id: Long, @Valid @RequestBody alunoRequest: AlunoRequest): ResponseEntity<AlunoResponse> {
        val aluno = alunoService.atualizar(id, alunoRequest)
        return if (aluno != null) {
            ResponseEntity.ok(aluno)
        } else {
            ResponseEntity.notFound().build()
        }
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Excluir aluno", description = "Remove um aluno do sistema")
    @ApiResponses(value = [
        ApiResponse(responseCode = "204", description = "Aluno excluído com sucesso"),
        ApiResponse(responseCode = "404", description = "Aluno não encontrado")
    ])
    fun excluir(@Parameter(description = "ID do aluno") @PathVariable id: Long): ResponseEntity<Void> {
        return if (alunoService.excluir(id)) {
            ResponseEntity.noContent().build()
        } else {
            ResponseEntity.notFound().build()
        }
    }
} 