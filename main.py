import os
import json

# Path to the images folder
images_folder = './images/'

# Get the names of all the image files in the folder
image_files = [f for f in os.listdir(images_folder) if os.path.isfile(os.path.join(images_folder, f))]

# Create a dictionary to store the image names
image_data = {'images': image_files}

# Path to the JSON file
json_file = './data.json'

# Write the image data to the JSON file
with open(json_file, 'w') as f:
    json.dump(image_data, f)