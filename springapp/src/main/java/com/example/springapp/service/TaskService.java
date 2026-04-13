package com.example.springapp.service;

import com.example.springapp.dto.TaskRequest;
import com.example.springapp.dto.TaskResponse;
import com.example.springapp.model.Role;
import com.example.springapp.model.Task;
import com.example.springapp.model.TaskStatus;
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
    private final ActivityLogService activityLogService;

    public TaskResponse createTask(TaskRequest request) {
        User user = securityUtils.getCurrentUser();

        Task task = new Task();
        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setStatus(request.getStatus());
        task.setPriority(request.getPriority());
        task.setCreatedBy(user);
        task.setOrganization(user.getOrganization());

        Task saved = taskRepository.save(task);

        activityLogService.log(user, saved,
                user.getName() + " created task '" + saved.getTitle() + "'");

        return TaskResponse.from(saved);
    }

    public List<TaskResponse> getAllTasks() {
        User user = securityUtils.getCurrentUser();
        Long orgId = user.getOrganization().getId();

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

        if (user.getRole() == Role.MEMBER && !task.getCreatedBy().getId().equals(user.getId())) {
            throw new RuntimeException("Access denied");
        }

        TaskStatus previousStatus = task.getStatus();

        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setStatus(request.getStatus());
        task.setPriority(request.getPriority());

        Task saved = taskRepository.save(task);

        // Log status change separately if status changed
        if (previousStatus != request.getStatus()) {
            activityLogService.log(user, saved,
                    user.getName() + " marked task '" + saved.getTitle() + "' as " + request.getStatus());
        } else {
            activityLogService.log(user, saved,
                    user.getName() + " updated task '" + saved.getTitle() + "'");
        }

        return TaskResponse.from(saved);
    }

    public void deleteTask(Long id) {
        User user = securityUtils.getCurrentUser();
        Long orgId = user.getOrganization().getId();

        Task task = taskRepository.findByIdAndOrganizationId(id, orgId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        if (user.getRole() == Role.MEMBER && !task.getCreatedBy().getId().equals(user.getId())) {
            throw new RuntimeException("Access denied");
        }

        taskRepository.delete(task);
    }
}
