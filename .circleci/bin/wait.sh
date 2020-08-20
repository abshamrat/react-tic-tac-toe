#!/bin/bash

if [ "$1" != "" ]
then
  i=0
  echo -ne "Waiting for a service port on $1 ."
  until wget -q http://localhost:$1$2
  do
    if [ $((++i)) -gt 180 ]; then
      echo "Timed out waiting for a server port on $1";
      exit 1;
    fi
    echo -ne "."
    sleep 2
  done
  printf "\n"
  echo "Service is running on port $1"
fi
