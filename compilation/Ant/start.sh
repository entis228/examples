#!/bin/sh
. ./setantenv.sh;
ant clean;
ant compile;
ant jar;
java -jar ./build/jar/Office.jar
