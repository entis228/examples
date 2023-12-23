package com.entis.app;

import java.io.IOException;
import org.apache.commons.lang3.StringUtils;

public class Main{
    public static void main(String[] args) throws IOException {
        Worker worker = new Worker();
        java.io.BufferedReader reader = new java.io.BufferedReader(new java.io.InputStreamReader(System.in));
        System.out.println("Enter info about Worker");
        System.out.print("Age: ");worker.setAge(Integer.parseInt(reader.readLine()));
        System.out.print("\nName: ");worker.setName(reader.readLine());
        System.out.print("\nRank: ");worker.setRank(reader.readLine());
        System.out.println("\nYour worker is:\n"+worker);
        System.out.println("Good bye");
        reader.readLine();
    }
}