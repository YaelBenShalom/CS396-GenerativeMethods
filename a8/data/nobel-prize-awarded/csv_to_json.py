import csv
import json
import os


def make_json(csvfile, jsonfile):
    for row0 in csvfile:
        field_names_list = list(row0[:-1].split(","))
        break

    reader = csv.DictReader(csvfile, field_names_list)
    
    for row in reader:
        json.dump(row, jsonfile)
        jsonfile.write(',\n')
   


for file in os.listdir("."):
    if file.endswith(".csv"):
        print(file)

        file_name = file.split(".")[0]
        csvfile = open(file_name + '.csv', 'r', encoding='utf-8-sig')
        jsonfile = open(file_name + '.json', 'w', encoding='utf-8-sig')

        make_json(csvfile, jsonfile)

    else:
        continue