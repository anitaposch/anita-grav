import os
import re

def fix_image_references(root_dir):
    """
    Scans for Markdown files in a directory, finds image references,
    and corrects the case of the filenames if they are incorrect.
    """
    # Regex to find local markdown image links, excluding remote URLs
    image_link_regex = re.compile(r'!\[(.*?)\]\((?!https?://)(.*?)\)')

    print(f"Starting scan in {root_dir}...")

    for subdir, _, files in os.walk(root_dir):
        for filename in files:
            if filename.endswith('.md'):
                md_file_path = os.path.join(subdir, filename)
                try:
                    with open(md_file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                except Exception as e:
                    print(f"Error reading {md_file_path}: {e}")
                    continue

                original_content = content
                modified = False

                # Use a new variable for modifications to avoid issues with finditer
                new_content = content

                for match in image_link_regex.finditer(content):
                    alt_text = match.group(1)
                    image_path = match.group(2)

                    # Skip if it has query params for Grav media actions
                    if '?' in image_path:
                        continue

                    # Construct the absolute path to the image
                    image_full_path = os.path.normpath(os.path.join(subdir, image_path))

                    if not os.path.exists(image_full_path):
                        # File not found, let's try lowercase
                        # We only lowercase the filename, not the directory path
                        path_parts = image_path.split('/')
                        img_filename_lower = path_parts[-1].lower()
                        path_parts[-1] = img_filename_lower
                        lowercase_image_path = "/".join(path_parts)
                        
                        lowercase_image_full_path = os.path.normpath(os.path.join(subdir, lowercase_image_path))

                        if os.path.exists(lowercase_image_full_path):
                            original_link = f"![{alt_text}]({image_path})"
                            corrected_link = f"![{alt_text}]({lowercase_image_path})"
                            print(f"  - Fixing in {md_file_path}: {image_path} -> {lowercase_image_path}")
                            new_content = new_content.replace(original_link, corrected_link)
                            modified = True

                if modified:
                    try:
                        with open(md_file_path, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                        print(f"Successfully updated {md_file_path}")
                    except Exception as e:
                        print(f"Error writing to {md_file_path}: {e}")

    print("Scan complete.")

if __name__ == '__main__':
    # The script is in /scripts, so we go up one level to the project root
    # and then into user/pages.
    project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    pages_dir = os.path.join(project_root, 'user', 'pages')
    fix_image_references(pages_dir)
