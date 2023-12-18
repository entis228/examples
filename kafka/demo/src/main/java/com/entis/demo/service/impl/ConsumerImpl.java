package com.entis.demo.service.impl;

import com.entis.demo.dto.EventInformation;
import com.entis.demo.service.Consumer;
import java.io.PrintWriter;
import java.io.StringWriter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class ConsumerImpl implements Consumer {

    @Override
    @KafkaListener(topics = "${spring.kafka.consumer.topic}", groupId = "${spring.kafka.consumer.group-id}")
    public void listen(EventInformation event) {
        try {
            log.info("Get message: {}", event);
        } catch (Exception ex) {
            StringWriter stringWriter = new StringWriter();
            ex.printStackTrace(new PrintWriter(stringWriter));
            log.error(stringWriter.toString());
        }
    }
}
