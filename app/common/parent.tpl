<!doctype html>
<html>
    <head>
        <meta charset="utf-8" />
        <title>{% block title %}{% endblock %}</title>
        {% block styles %}
        <link rel="stylesheet" href="/styles/{@appname@}.css" type="text/css" media="screen" />
        {% endblock %}
        <base href="/{@appname@}/" />
        <script type="text/javascript" src="/scripts/global.js"></script>
        {% block scripts %}
        <script type="text/javascript" src="/scripts/{@appname@}.js"></script>
        {% endblock %}
    </head>
    <body>
        {% block content %}

        {% endblock %}
    </body>
</html>

