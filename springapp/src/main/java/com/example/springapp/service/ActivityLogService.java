package com.example.springapp.service;

import com.example.springapp.dto.ActivityLogResponse;
import com.example.springapp.model.ActivityLog;
import com.example.springapp.model.Task;
import com.example.springapp.model.User;
import com.example.springapp.repository.ActivityLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ActivityLogService {

    private final ActivityLogRepository activityLogRepository;
    private final SecurityUtils securityUtils;

    public void log(User user, Task task, String action) {
        ActivityLog entry = new ActivityLog();
        entry.setUser(user);
        entry.setTask(task);
        entry.setOrganization(user.getOrganization()); // org isolation
        entry.setAction(action);
        activityLogRepository.save(entry);
    }

    @Transactional
    public void deleteLogsForTask(Long taskId) {
        activityLogRepository.deleteByTaskId(taskId);
    }

    public List<ActivityLogResponse> getLatestLogs() {
        User user = securityUtils.getCurrentUser();
        Long orgId = user.getOrganization().getId();
        return activityLogRepository
                .findTop10ByOrganizationIdOrderByCreatedAtDesc(orgId)
                .stream()
                .map(ActivityLogResponse::from)
                .toList();
    }
}
