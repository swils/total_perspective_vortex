from flask import Flask
from flask import g
from flask import render_template
from flask_restful import Api


def create():
    app = Flask(__name__)
    api = Api(app)
    #
    # # Communication with NORM.
    # from resources.norm_operations import NormOperations
    # api.add_resource(NormOperations, '/norm-operations')

    @app.teardown_appcontext
    def close_connection(exception):
        db = getattr(g, '_database', None)
        if db is not None:
            db.close()

    @app.route('/')
    def index():
        return render_template('index.html')

    from resources.galaxies import Galaxies
    api.add_resource(Galaxies, '/galaxies')

    return app


if __name__ == '__main__':
    app = create()
    host = app.config.get('HOST', '0.0.0.0')
    port = app.config.get('PORT', 5000)
    app.run(host=host, port=port, debug=True)
