package com.entis.demo.controller;

import com.entis.demo.dto.EventInformation;
import com.entis.demo.service.Producer;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class DemoController {

    private Producer producer;

    @PostMapping("/send/{topicName}")
    public void sendMessage(@PathVariable String topicName, @RequestBody String message) {
        producer.sendEvent(topicName, new EventInformation(message));
    }

}
