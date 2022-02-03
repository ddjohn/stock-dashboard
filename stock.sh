#!/bin/bash

while :
do
	ROW=$(nc -l -p 9999 | head -1 | awk '{print $2}')
	echo "=== ${ROW} ==="
	firefox http://localhost:3000/${ROW}
done
