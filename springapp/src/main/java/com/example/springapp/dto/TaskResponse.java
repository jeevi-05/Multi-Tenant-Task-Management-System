package com.example.springapp.dto;

import com.example.springapp.model.Task;
import com.example.springapp.model.TaskStatus;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class TaskResponse {

    private Long id;
    private String title;
    private String description;
    private TaskStatus status;
    private String createdByName;
    private String createdByEmail;
    private String organizationName;
    private LocalDateTime createdAt;

    public static TaskResponse from(Task task) {
        TaskResponse res = new TaskResponse();
        res.setId(task.getId());
        res.setTitle(task.getTitle());
        res.setDescription(task.getDescription());
        res.setStatus(task.getStatus());
        res.setCreatedByName(task.getCreatedBy().getName());
        res.setCreatedByEmail(task.getCreatedBy().getEmail());
        res.setOrganizationName(task.getOrganization().getName());
        res.setCreatedAt(task.getCreatedAt());
        return res;
    }
}
