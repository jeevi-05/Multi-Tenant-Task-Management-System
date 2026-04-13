package com.example.springapp.dto;

import com.example.springapp.model.ActivityLog;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ActivityLogResponse {

    private Long id;
    private String action;
    private String userName;
    private String taskTitle;
    private LocalDateTime createdAt;

    public static ActivityLogResponse from(ActivityLog log) {
        ActivityLogResponse res = new ActivityLogResponse();
        res.setId(log.getId());
        res.setAction(log.getAction());
        res.setUserName(log.getUser().getName());
        res.setTaskTitle(log.getTask().getTitle());
        res.setCreatedAt(log.getCreatedAt());
        return res;
    }
}
