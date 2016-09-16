from flask import request
from flask_restful import Resource
from total_perspective_vortex.db import get_db


class Galaxies(Resource):

    def get(self):
        first = int(request.args['first'])
        last = first + int(request.args['size']) - 1

        conn = get_db()
        c = conn.cursor()

        query = "SELECT x, y, z FROM galaxies WHERE id >= {} AND id <= {}".format(first, last)
        galaxies = list(c.execute(query))

        return {'galaxies': galaxies}
