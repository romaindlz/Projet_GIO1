import numpy as np
import json
import copy

def parse_file_to_dict(file_path):
    with open(file_path, 'r') as file:
        data = file.read()
        # Ajoute des crochets pour faire un tableau JSON valide
        data = '[' + data + ']'
        parsed_data = json.loads(data)
        return parsed_data


def write_dict_to_json(data, output_file):
    with open(output_file, 'w') as file:
        json.dump(data, file, indent=4)
        

file_path = 'GlobalTempData_init.json'
result_init = parse_file_to_dict(file_path)

result = copy.deepcopy(result_init)

for i in range(len(result[0])):
    if result[0][i]['City'] == 'Lausanne':
        result[0][i]['Latitude'] = '46.516'
        result[0][i]['Longitude'] = '6.63282'
        
    elif result[0][i]['City'] == 'Zurich':
        result[0][i]['Latitude'] = '47.36667'
        result[0][i]['Longitude'] = '8.55'
        
        
write_dict_to_json(result, 'GlobalTempData.json')