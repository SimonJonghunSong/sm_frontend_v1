fuser -k 3000/tcp || true
pkill -f "npm start" || true
sleep 2
nohup npm start > output.log 2>&1 &

