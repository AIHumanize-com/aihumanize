from django import template

register = template.Library()

@register.filter
def first_eight_words(value):
    return ' '.join(value.split()[:8])


@register.filter(name='replace_underscores')
def replace_underscores(value):
    return value.replace('_', ' ')