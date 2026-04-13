package com.example.springapp.service;

import com.example.springapp.dto.TaskRequest;
import com.example.springapp.dto.TaskResponse;
import com.example.springapp.model.Role;
import com.example.springapp.model.Task;
import com.example.springapp.model.User;
import com.example.springapp.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final SecurityUtils securityUtils;

    public TaskResponse createTask(TaskRequest request) {
        User user = securityUtils.getCurrentUser();

        Task task = new Task();
        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setStatus(request.getStatus());
        task.setPriority(request.getPriority());
        task.setCreatedBy(user);
        task.setOrganization(user.getOrganization());

        return TaskResponse.from(taskRepository.save(task));
    }

    public List<TaskResponse> getAllTasks() {
        User user = securityUtils.getCurrentUser();
        Long orgId = user.getOrganization().getId();

        // ADMIN sees all tasks in org, MEMBER sees only their own
        if (user.getRole() == Role.ADMIN) {
            return taskRepository.findByOrganizationId(orgId)
                    .stream().map(TaskResponse::from).toList();
        }
        return taskRepository.findByCreatedByIdAndOrganizationId(user.getId(), orgId)
                .stream().map(TaskResponse::from).toList();
    }

    public List<TaskResponse> getMyTasks() {
        User user = securityUtils.getCurrentUser();
        return taskRepository.findByCreatedByIdAndOrganizationId(user.getId(), user.getOrganization().getId())
                .stream().map(TaskResponse::from).toList();
    }

    public TaskResponse updateTask(Long id, TaskRequest request) {
        User user = securityUtils.getCurrentUser();
        Long orgId = user.getOrganization().getId();

        Task task = taskRepository.findByIdAndOrganizationId(id, orgId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        // MEMBER can only update their own tasks
        if (user.getRole() == Role.MEMBER && !task.getCreatedBy().getId().equals(user.getId())) {
            throw new RuntimeException("Access denied");
        }

        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setStatus(request.getStatus());
        task.setPriority(request.getPriority());

        return TaskResponse.from(taskRepository.save(task));
    }

    public void deleteTask(Long id) {
        User user = securityUtils.getCurrentUser();
        Long orgId = user.getOrganization().getId();

        Task task = taskRepository.findByIdAndOrganizationId(id, orgId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        // MEMBER can only delete their own tasks
        if (user.getRole() == Role.MEMBER && !task.getCreatedBy().getId().equals(user.getId())) {
            throw new RuntimeException("Access denied");
        }

        taskRepository.delete(task);
    }
}
