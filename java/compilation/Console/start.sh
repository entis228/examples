#!/bin/sh
javac -sourcepath ./src -d build/classes -cp ".:./libs/activation-1.1.jar:./libs/commons-lang3-3.11.jar" src/com/entis/app/Main.java src/com/entis/app/Worker.java
java -cp build/classes/:./libs/commons-lang3-3.11.jar:./libs/activation-1.1.jar:. com.entis.app.Main