init-app:
	yarn install
	yarn run build

start-server:
	docker run -p 3000:3000 --name=valstro-websocket-server clonardo/socketio-backend
