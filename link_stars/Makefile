dkc := "docker-compose.yml"


build:
	docker-compose -f ${dkc} build

run: build
	docker-compose -f ${dkc} up

clean:
	docker-compose -f ${dkc} kill
	docker-compose -f ${dkc} stop
	docker-compose -f ${dkc} down --rmi local --volumes
	docker-compose -f ${dkc} rm -f