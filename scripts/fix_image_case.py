import os
import re

def fix_image_references(root_dir):
    """
    Scans for Markdown files in a directory, finds image references in both
    the frontmatter (thumbnail) and the body, and corrects the case of the
    filenames if they are incorrect.
    """
    # Regex for markdown image links in the body
    image_link_regex = re.compile(r'!\[(.*?)\]\((?!https?://)(.*?)\)')
    # Regex for the thumbnail in YAML frontmatter
    thumbnail_regex = re.compile(r'^(thumbnail:\s*[\'"]?)(.*?)([\'"]?\s*)$', re.MULTILINE)

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

                new_content = content
                modified = False

                # --- 1. Process Frontmatter Thumbnail ---
                thumbnail_match = thumbnail_regex.search(new_content)
                if thumbnail_match:
                    prefix = thumbnail_match.group(1)
                    image_path = thumbnail_match.group(2).strip()
                    suffix = thumbnail_match.group(3)

                    if image_path: # Ensure we have a path
                        image_full_path = os.path.normpath(os.path.join(subdir, image_path))

                        if not os.path.exists(image_full_path):
                            path_parts = image_path.split('/')
                            img_filename_lower = path_parts[-1].lower()
                            path_parts[-1] = img_filename_lower
                            lowercase_image_path = "/".join(path_parts)
                            lowercase_image_full_path = os.path.normpath(os.path.join(subdir, lowercase_image_path))

                            if os.path.exists(lowercase_image_full_path):
                                original_line = thumbnail_match.group(0)
                                corrected_line = f"{prefix}{lowercase_image_path}{suffix}"
                                print(f"  - Fixing thumbnail in {md_file_path}: {image_path} -> {lowercase_image_path}")
                                new_content = new_content.replace(original_line, corrected_line)
                                modified = True

                # --- 2. Process Body Images ---
                # We need to re-run finditer on the potentially modified content
                # A better way is to collect changes and apply them once, but for simplicity:
                content_for_body_scan = new_content
                for match in image_link_regex.finditer(content_for_body_scan):
                    alt_text = match.group(1)
                    image_path = match.group(2)

                    if '?' in image_path:
                        continue

                    image_full_path = os.path.normpath(os.path.join(subdir, image_path))

                    if not os.path.exists(image_full_path):
                        path_parts = image_path.split('/')
                        img_filename_lower = path_parts[-1].lower()
                        path_parts[-1] = img_filename_lower
                        lowercase_image_path = "/".join(path_parts)
                        lowercase_image_full_path = os.path.normpath(os.path.join(subdir, lowercase_image_path))

                        if os.path.exists(lowercase_image_full_path):
                            original_link = f"![{alt_text}]({image_path})"
                            corrected_link = f"![{alt_text}]({lowercase_image_path})"
                            print(f"  - Fixing body image in {md_file_path}: {image_path} -> {lowercase_image_path}")
                            new_content = new_content.replace(original_link, corrected_link)
                            modified = True

                # --- 3. Write changes to file if modified ---
                if modified:
                    try:
                        with open(md_file_path, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                        print(f"Successfully updated {md_file_path}\n")
                    except Exception as e:
                        print(f"Error writing to {md_file_path}: {e}\n")

    print("Scan complete.")

if __name__ == '__main__':
    project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    pages_dir = os.path.join(project_root, 'user', 'pages')
    fix_image_references(pages_dir)