package com.entis;

import org.apache.commons.lang3.*;

public class Worker{
    private int age;
    private String name;
    private String rank;

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRank() {
        return rank;
    }

    public void setRank(String rank) {
        this.rank = rank;
    }

    @Override
    public String toString() {
        return "Name: "+name+"\nAge: "+age+"\nRank: "+StringUtils.upperCase(rank)+"\n";
    }
}