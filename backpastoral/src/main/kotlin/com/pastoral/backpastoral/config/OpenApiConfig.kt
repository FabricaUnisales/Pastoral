package com.pastoral.backpastoral.config

import io.swagger.v3.oas.models.OpenAPI
import io.swagger.v3.oas.models.info.Contact
import io.swagger.v3.oas.models.info.Info
import io.swagger.v3.oas.models.info.License
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.CorsConfigurationSource
import org.springframework.web.cors.UrlBasedCorsConfigurationSource
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer

@Configuration
class OpenApiConfig : WebMvcConfigurer {

    @Bean
    fun customOpenAPI(): OpenAPI {
        return OpenAPI()
            .info(
                Info()
                    .title("API Pastoral")
                    .version("1.0.0")
                    .description("Sistema de gerenciamento pastoral com CRUDs de voluntários, alunos, pais e doações")
                    .contact(
                        Contact()
                            .name("Equipe Pastoral")
                            .email("contato@pastoral.com")
                    )
                    .license(
                        License()
                            .name("MIT License")
                            .url("https://opensource.org/licenses/MIT")
                    )
            )
    }

    override fun addCorsMappings(registry: CorsRegistry) {
        registry.addMapping("/**")
            .allowedOrigins("http://localhost:5173", "http://127.0.0.1:5173")
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
            .allowedHeaders("*")
            .allowCredentials(true)
    }

    @Bean
    fun corsConfigurationSource(): CorsConfigurationSource {
        val configuracao = CorsConfiguration()
        configuracao.allowedOrigins = listOf("http://localhost:5173", "http://127.0.0.1:5173")
        configuracao.allowedMethods = listOf("GET", "POST", "PUT", "DELETE", "OPTIONS")
        configuracao.allowedHeaders = listOf("*")
        configuracao.allowCredentials = true
        
        val fonte = UrlBasedCorsConfigurationSource()
        fonte.registerCorsConfiguration("/**", configuracao)
        return fonte
    }
} 