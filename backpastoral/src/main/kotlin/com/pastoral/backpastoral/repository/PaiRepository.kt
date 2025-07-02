package com.pastoral.backpastoral.repository

import com.pastoral.backpastoral.model.Pai
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface PaiRepository : JpaRepository<Pai, Long> 