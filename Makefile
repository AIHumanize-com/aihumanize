migrate:
	python manage.py makemigrations
	python manage.py migrate
run:
	python manage.py runserver

push:
	git add .
	git commit -m "update"
	git push

redis:
	docker run -d -p 6379:6379 redis

celery:
	celery -A config worker -l info
