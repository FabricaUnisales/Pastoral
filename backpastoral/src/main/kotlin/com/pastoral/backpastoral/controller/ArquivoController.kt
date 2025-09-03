package com.pastoral.backpastoral.controller

import com.pastoral.backpastoral.service.DoacaoService
import org.springframework.core.io.ByteArrayResource
import org.springframework.http.HttpHeaders
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/arquivos")
class ArquivoController(
    private val doacaoService: DoacaoService
) {

    @GetMapping("/doacao/{id}")
    fun downloadArquivoDoacao(@PathVariable id: Long): ResponseEntity<ByteArrayResource> {
        val doacao = doacaoService.buscarPorId(id) ?: return ResponseEntity.notFound().build()
        
        if (doacao.nomeArquivo == null) {
            return ResponseEntity.notFound().build()
        }

        // Buscar o arquivo do banco
        val doacaoCompleta = doacaoService.buscarDoacaoCompleta(id) ?: return ResponseEntity.notFound().build()
        
        val arquivo = doacaoCompleta.arquivo ?: return ResponseEntity.notFound().build()
        
        val resource = ByteArrayResource(arquivo)
        
        return ResponseEntity.ok()
            .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"${doacao.nomeArquivo}\"")
            .contentType(MediaType.parseMediaType(doacao.tipoArquivo ?: "application/octet-stream"))
            .body(resource)
    }
}
