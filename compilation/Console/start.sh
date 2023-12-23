#!/bin/sh
javac -sourcepath ./src -d build/classes -cp ".:./libs/mail-1.4.jar:./libs/commons-email-1.5.jar:./libs/activation-1.1.jar:./libs/commons-lang3-3.11.jar" src/com/entis/app/Main.java src/com/entis/app/Worker.java src/com/entis/app/EmailSender.java;
java -cp build/classes/:./libs/commons-lang3-3.11.jar:./libs/activation-1.1.jar:./libs/commons-email-1.5.jar:./libs/mail-1.4.jar:. com.entis.Main
