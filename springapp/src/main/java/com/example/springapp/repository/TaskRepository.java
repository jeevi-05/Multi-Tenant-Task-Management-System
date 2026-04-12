package com.example.springapp.repository;

import com.example.springapp.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByOrganizationId(Long organizationId);

    List<Task> findByCreatedById(Long userId);

    List<Task> findByCreatedByIdAndOrganizationId(Long userId, Long organizationId);

    Optional<Task> findByIdAndOrganizationId(Long id, Long organizationId);
}
