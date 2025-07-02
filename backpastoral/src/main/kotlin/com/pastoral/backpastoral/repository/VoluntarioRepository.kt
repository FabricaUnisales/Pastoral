package com.pastoral.backpastoral.repository

import com.pastoral.backpastoral.model.Voluntario
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface VoluntarioRepository : JpaRepository<Voluntario, Long> 