#!/bin/sh
. ./setantenv.sh;
ant clean;
ant compile;
ant jar;
#ant run;
java -jar ./build/jar/Office.jar
