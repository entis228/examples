#!/bin/sh
cd Console;
./start.sh;
rm -r build;
cd ../Ant;
./start.sh;
rm -r build;
cd ../Maven;
./start.sh;
mvn clean
