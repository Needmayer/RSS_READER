#!/usr/bin/env bash

apt-get update
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt-get install -y build-essential

sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | sudo tee /etc/apt/sources.list.d/mongodb.list
sudo apt-get update
sudo apt-get install -y mongodb-org

sudo service mongod status
sudo service mongod start


#wget http://download.redis.io/releases/redis-4.0.1.tar.gz
#tar xzf redis-4.0.1.tar.gz
#cd redis-4.0.1
#make
#src/redis-server