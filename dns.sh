#!/bin/bash

### Google Domains provides an API to update a DNS
### "Synthetic record". This script updates a record with 
### the script-runner's public IP address, as resolved using a DNS
### lookup.
###
### Google Dynamic DNS: https://support.google.com/domains/answer/6147083
### Synthetic Records: https://support.google.com/domains/answer/6069273

USERNAME="hRf7pX6BmeIjiPcS"
PASSWORD="2U5twpBkHHkvEIxA"
HOSTNAME="aaronchambers.net"

# Resolve current public IP
IP="70.171.35.149" 
# Update Google DNS Record
URL='https://${USERNAME}:${PASSWORD}@domains.google.com/nic/update?hostname=${HOSTNAME}&myip=${IP}'
curl $URL
