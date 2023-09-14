#!/bin/bash

# Specify the path to the Git objects directory
objects_dir=".git/objects"

# Function to iterate through the subfolders and display content
process_objects() {
  local parent="$1"
  local full_dir="$objects_dir/$parent"
  
  # Check if the directory exists
  if [ -d "$full_dir" ]; then
    # Loop through the files in the directory
    for file in "$full_dir"/*; do
      # Combine the parent and child folder names to form the object ID
      object_id="$parent$dir$(basename "$file")"
      
      # Display the object ID and its content using git cat-file
      echo "Object ID: $object_id"
      git cat-file -t "$object_id"
      git cat-file -p "$object_id"
      echo ""
    done
  fi
}

# Main loop to process subfolders in the "objects" directory
for parent_dir in $(find "$objects_dir" -type d); do
  # Extract the parent folder name (e.g., "2a", "3a")
  parent=$(basename "$parent_dir")
  
  # Loop through the child folders
  for child_dir in "$parent_dir"/*; do    
    # Call the function to process the objects in the subfolder
    process_objects "$parent"
  done
done
