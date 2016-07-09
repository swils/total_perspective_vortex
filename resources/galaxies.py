import sys
import types

from flask import request
from flask_restful import Resource
from total_perspective_vortex.db import get_db


class Galaxies(Resource):
    def get(self):
        conn = get_db()
        c = conn.cursor()
        return {
            'galaxies': list(c.execute("SELECT x, y, z FROM galaxies"))
        }
