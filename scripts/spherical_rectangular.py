import math
import numpy
import pandas
import sqlite3
import sys


C = 299792.458
H0 = 73


spherical = pandas.read_csv(sys.argv[1])
spherical = spherical.reindex(numpy.random.permutation(spherical.index))


conn = sqlite3.connect(sys.argv[2])
c = conn.cursor()

c.execute("CREATE TABLE galaxies (id INTEGER PRIMARY KEY, x REAL, y REAL, z REAL)")
conn.commit()


results = []
index = 0
for _, row in spherical.iterrows():
    d = (math.pi * row['dec']) / 180.0
    a = (math.pi * row['ra']) / 180.0
    z = row['redshift']

    r = (z * C) / H0
    x = r * math.cos(d) * math.cos(a)
    y = r * math.cos(d) * math.sin(a)
    z = r * math.sin(d)

    c.execute("INSERT INTO galaxies VALUES({}, {}, {}, {})".format(index, x, y, z))

    if index % 10000 == 0:
        print(index)
        conn.commit()

    index += 1


conn.commit()
conn.close()
