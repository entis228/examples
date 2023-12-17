package com.entis.demo.service;

import com.entis.demo.dto.EventInformation;

public interface Consumer {

    void listen(EventInformation event);
}
