package com.entis.demo.service.impl;

import com.entis.demo.dto.EventInformation;
import com.entis.demo.service.Producer;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class ProducerImpl implements Producer {

    private final KafkaTemplate<String, EventInformation> template;


    @Override
    public void sendEvent(String topic, EventInformation eventInformation) {
        try {
            template.send(topic, eventInformation);
            log.info("Produced message to broker, topic is {}, message is {}", topic,
                eventInformation);
        } catch (Exception ex) {
            log.error("Get exception: {}", ex.getMessage());
        }
    }
}
