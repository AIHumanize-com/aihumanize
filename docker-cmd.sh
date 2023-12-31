#!/bin/sh
# vim:sw=4:ts=4:et

su-exec "$USER" python manage.py collectstatic --noinput

# Creating the first user in the system
USER_EXISTS="from django.contrib.auth import get_user_model; User = get_user_model(); exit(User.objects.exists())"
su-exec "$USER" python manage.py shell -c "$USER_EXISTS" && su-exec "$USER" python manage.py createsuperuser --noinput

if [ "$1" = "--debug" ]; then
  # Django development server
  su-exec "$USER" python manage.py runserver "0.0.0.0:$DJANGO_DEV_SERVER_PORT"
else
  # Gunicorn
  su-exec "$USER" gunicorn "config.wsgi:application" \
    --bind "0.0.0.0:8000" \
    --workers "5" \
    --timeout "$GUNICORN_TIMEOUT" \
    --log-level "$GUNICORN_LOG_LEVEL" \
    --threads "4"
fi