import math
import numpy
import pandas
import sys

C = 299792.458
H0 = 73

spherical = pandas.read_csv(sys.argv[1])

spherical = spherical.reindex(numpy.random.permutation(spherical.index))
spherical = spherical[0:100000]

results = []
for _, row in spherical.iterrows():
    d = (math.pi * row['dec']) / 180.0
    a = (math.pi * row['ra']) / 180.0
    z = row['redshift']

    r = (z * C) / H0
    x = r * math.cos(d) * math.cos(a)
    y = r * math.cos(d) * math.sin(a)
    z = r * math.sin(d)

    results.append('{{x:{0:6g},y:{1:6g},z:{2:6g}}}'.format(x, y, z))

print("module.exports = [")
print(','.join(results))
print("];")
