#!/usr/bin/env bash

DIR="$(pwd)"

#echo "Current dir is: ${DIR}"

cd ${DIR}/../frontend
pm2 start "yarn dev" --name sport-events-frontend

cd ${DIR}/../backend
pm2 start "yarn dev" --name sport-events-backend
