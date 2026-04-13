package com.example.springapp.repository;

import com.example.springapp.model.ActivityLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ActivityLogRepository extends JpaRepository<ActivityLog, Long> {
    List<ActivityLog> findTop10ByOrganizationIdOrderByCreatedAtDesc(Long organizationId);
}
