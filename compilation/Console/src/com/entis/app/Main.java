package com.entis;

import org.apache.commons.mail.EmailException;

import java.io.IOException;

public class Main{
    public static void main(String[] args) throws IOException, EmailException {
        Worker worker = new Worker();
        java.io.BufferedReader reader = new java.io.BufferedReader(new java.io.InputStreamReader(System.in));
        System.out.println("Enter info about Worker");
        System.out.print("Age: ");worker.setAge(Integer.parseInt(reader.readLine()));
        System.out.print("\nName: ");worker.setName(reader.readLine());
        System.out.print("\nRank: ");worker.setRank(reader.readLine());
        System.out.println("\nYour worker is:\n"+worker);
        System.out.println("Would you like to notificate him? yes/no");
        if(reader.readLine().equals("yes")){
            System.out.println("Write email");
            String email = reader.readLine();
            EmailSender.SendHello(email);
            System.out.println("Email was sent");
        }else {
            System.out.println("Thank you");
        }
        System.out.println("Good bye");
        reader.readLine();
    }
}