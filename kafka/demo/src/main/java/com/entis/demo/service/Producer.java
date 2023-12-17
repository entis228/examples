package com.entis.demo.service;

import com.entis.demo.dto.EventInformation;

public interface Producer {

    void sendEvent(String topic, EventInformation eventInformation);
}
