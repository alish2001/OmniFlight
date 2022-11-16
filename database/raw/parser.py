import csv

def removeFieldsFromDataFileAirports(fpath, fieldnames, removefields):
    airports = set()
    newfieldnames = [x for x in fieldnames if x not in removefields]
    with open(fpath, 'r') as infile, open(f'{fpath}.parsed', 'w') as outfile:
        reader = csv.DictReader(infile, fieldnames=fieldnames)
        writer = csv.DictWriter(outfile, fieldnames=newfieldnames)
        for row in reader:
            for field in removefields: row.pop(field)
            airports.add(row['airportid'])
            writer.writerow(row)
    return airports

def removeFieldsFromDataFileRoutes(fpath, fieldnames, removefields, activeAirlines, validAirports):
    airlines = set()
    airports = set()
    routePlanes = {}
    count = 1
    newfieldnames = [x for x in fieldnames if x not in removefields]
    with open(fpath, 'r') as infile, open(f'{fpath}.parsed', 'w') as outfile:
        reader = csv.DictReader(infile, fieldnames=fieldnames)
        writer = csv.DictWriter(outfile, fieldnames=newfieldnames)
        for row in reader:
            if not row['airlineid'] in activeAirlines or not row['sourceairportid'] in validAirports or not row['destinationairportid'] in validAirports: continue
            routePlanes[count] = list(set(row['equipment'].split()));
            count += 1
            for field in removefields: row.pop(field)
            writer.writerow(row)
            airports.add(row['sourceairportid'])
            airports.add(row['destinationairportid'])
            airlines.add(row['airlineid'])
    return airlines, routePlanes, airports

def removeFieldsFromDataAirlines(fpath, fieldnames, removefields):
    airlines = set()
    newfieldnames = [x for x in fieldnames if x not in removefields]
    with open(fpath, 'r') as infile, open(f'{fpath}.parsed', 'w') as outfile:
        reader = csv.DictReader(infile, fieldnames=fieldnames)
        writer = csv.DictWriter(outfile, fieldnames=newfieldnames)
        for row in reader:
            if row['active'] == 'N': continue
            for field in removefields: row.pop(field)
            #writer.writerow(row)
            airlines.add(row['airlineid'])
    return airlines

def removeFieldsFromDataPlanes(fpath, fieldnames, removefields):
    planeIDs = {}
    id = 1
    newfieldnames = [x for x in fieldnames if x not in removefields]
    with open(fpath, 'r') as infile, open(f'{fpath}.parsed', 'w') as outfile:
        reader = csv.DictReader(infile, fieldnames=fieldnames)
        writer = csv.DictWriter(outfile, fieldnames=newfieldnames)
        for row in reader:
                if row['iata'] == '\\N': continue
                planeIDs[row['iata']] = id
                id += 1
                for field in removefields: row.pop(field)
                writer.writerow(row)
    return planeIDs

## Airports
fpath = 'airports.dat'
fieldnames = ['airportid', 'name', 'city', 'country', 'iata', 'icao', 'latitude', 'longitude', 'altitude', 'timezone', 'dst', 'tz', 'type', 'source']
removefields = ['icao', 'dst', 'tz', 'type', 'source']

airports = removeFieldsFromDataFileAirports(fpath, fieldnames, removefields)


## Airlines
fpath = 'airlines.dat'
fieldnames = ['airlineid', 'name', 'alias', 'iata', 'icao', 'callsign', 'country', 'active']
removefields = ['alias', 'iata', 'icao', 'callsign', 'active']
# removefields = ['name', 'alias', 'iata', 'icao', 'callsign', 'country', 'active']

activeAirlines = removeFieldsFromDataAirlines(fpath, fieldnames, removefields)

## Routes
fpath = 'routes.dat'
fieldnames = ['airline', 'airlineid', 'sourceairport', 'sourceairportid', 'destinationairport', 'destinationairportid', 'codeshare', 'stops', 'equipment']
removefields = ['airline', 'sourceairport', 'destinationairport', 'equipment']
# removefields = ['airline', 'sourceairport', 'sourceairportid', 'destinationairport', 'destinationairportid', 'codeshare', 'stops', 'equipment']

routes, routePlanes, airportsInRoutes = removeFieldsFromDataFileRoutes(fpath, fieldnames, removefields, activeAirlines, airports)

## Planes
fpath = 'planes.dat'
fieldnames = ['name', 'iata', 'icao']
removefields = ['iata', 'icao']
planeIDs = removeFieldsFromDataPlanes(fpath, fieldnames, removefields)

planesonroutes = []
troublesomeplanes = set()
for route, planes in routePlanes.items():
    for plane in planes:
        if plane in planeIDs:
            planesonroutes.append((planeIDs[plane], route))
        else:
            print("ERROR")
            # return
            # troublesomeplanes.add(plane)

with open("planesonroutes.dat", 'w') as f:
    writer = csv.writer(f)
    writer.writerows(planesonroutes)
          
# print(troublesomeplanes)
# print(len(troublesomeplanes))


# print('\\N' in activeAirlines)
# print(len(activeAirlines))
# print(len(routes))
# # print(routes.intersection(activeAirlines))
# print(routes.difference(activeAirlines))

# print(len(airports))
# print(len(airportsInRoutes))
# # print(routes.intersection(activeAirlines))
# print(airportsInRoutes.difference(airports))

# print([[ (r,plane) for plane in p] for r,p in routePlanes.items()])
# for r,p in routePlanes.items():
#     if len(p) > 1:
#         print(f'{r} {p}')

print('Parsing complete')




