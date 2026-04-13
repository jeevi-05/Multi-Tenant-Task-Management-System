package com.example.springapp.controller;

import com.example.springapp.dto.ActivityLogResponse;
import com.example.springapp.service.ActivityLogService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/activity")
@RequiredArgsConstructor
public class ActivityLogController {

    private final ActivityLogService activityLogService;

    @GetMapping
    public ResponseEntity<List<ActivityLogResponse>> getLatestActivity() {
        return ResponseEntity.ok(activityLogService.getLatestLogs());
    }
}
