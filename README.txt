To add to the state export map:

1. Download the state export data
2. Open it up, and put an "e" in front of each year (the header)
2.5 Rename "Partner" to "name"
3. Open up "country_codes.csv", and use a VLOOKUP to match the "id" in that sheet to the countries in the data you just downloaded
4. At this point, you should have columns named id, name, e2005...e2012
5. Save this file as stateabbr_data.csv, so for example, wi_data.csv
	- Save it to the "data" folder in the project directory



If you ever want to permanently bind the data to the centroids as a topojson, do something like this:

topojson -o map_data_good.json -e wi_data.csv --id-property=+iso_n3 -p data_2005=+e2005 -p data_2006=+e2006 -p data_2007=+e2007 -p data_2008=+e2008 -p data_2009=+e2009 -p data_2010=+e2010 -p data_2011=+e2011 -p data_2012=+e2012 -- country_centroids.shp
