local:
	docker compose -f docker-compose.debug.yml up  

test:
	docker compose  -f docker-compose.debug.yml run --rm django sh -c "python manage.py test"

localdown:
	docker compose -f docker-compose.debug.yml down

app:
	docker compose  -f docker-compose.debug.yml run --rm django sh -c "python manage.py startapp ${appname}"
	
migrate:
	docker compose  -f docker-compose.debug.yml run --rm django sh -c "python manage.py makemigrations && python manage.py migrate"
clear:
	docker-compose -f docker-compose.debug.yml down --rmi all --volumes

super:
	docker compose  -f docker-compose.debug.yml run --rm django sh -c "python manage.py createsuperuser"

push:
	git add .
	git commit -m 'update'
	git push

createsuperuser:
	docker compose  -f docker-compose.debug.yml run --rm django sh -c "python manage.py createsuperuser"
