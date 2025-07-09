<?php
// fix_and_move_assets.php

$baseDir = __DIR__ . '/user/pages/04.blog/articles-other';
$assetsDir = $baseDir . '/assets';

echo "Starting asset fix and move script.\n";

// Function for case-insensitive file search
function find_file_case_insensitive($dir, $filename) {
    $files = scandir($dir);
    foreach ($files as $file) {
        if (strcasecmp($file, $filename) == 0) {
            return $file;
        }
    }
    return null;
}

// Get all article subdirectories
$articleDirs = glob($baseDir . '/*', GLOB_ONLYDIR);

foreach ($articleDirs as $articleDir) {
    if ($articleDir == $assetsDir) continue; // Skip the main assets dir

    // Find the markdown file in the directory
    $mdFiles = glob($articleDir . '/*.md');
    if (empty($mdFiles)) continue;

    $mdFile = $mdFiles[0];
    $content = file_get_contents($mdFile);
    $originalContent = $content;

    echo "\nProcessing directory: " . basename($articleDir) . "\n";

    // 1. Fix thumbnail link and move file
    if (preg_match('/^thumbnail: (.*)$/m', $content, $matches)) {
        $thumbnailName = basename(trim($matches[1]));
        $actualThumbnailName = find_file_case_insensitive($assetsDir, $thumbnailName);

        if ($actualThumbnailName) {
            $sourcePath = $assetsDir . '/' . $actualThumbnailName;
            $destPath = $articleDir . '/' . $actualThumbnailName;

            if (!file_exists($destPath)) {
                echo "  Moving thumbnail: $actualThumbnailName\n";
                rename($sourcePath, $destPath);
            }

            // Update frontmatter if casing is different
            if ($thumbnailName !== $actualThumbnailName) {
                echo "  Fixing thumbnail case in frontmatter.\n";
                $content = preg_replace('/^thumbnail: .*$/m', 'thumbnail: ' . $actualThumbnailName, $content);
            }
        } else {
             echo "  Warning: Thumbnail '$thumbnailName' not found in assets.\n";
        }
    }

    // 2. Find and move all other linked assets in content
    if (preg_match_all('/\(assets\/([^\)]+)\)/', $content, $matches)) {
        foreach ($matches[1] as $key => $assetName) {
            $actualAssetName = find_file_case_insensitive($assetsDir, $assetName);

            if ($actualAssetName) {
                $sourcePath = $assetsDir . '/' . $actualAssetName;
                $destPath = $articleDir . '/' . $actualAssetName;

                 if (!file_exists($destPath)) {
                    echo "  Moving content asset: $actualAssetName\n";
                    rename($sourcePath, $destPath);
                }

                // Update the link in the content
                $originalLink = $matches[0][$key];
                $newLink = '(' . $actualAssetName . ')';
                $content = str_replace($originalLink, $newLink, $content);
                echo "  Updated content link for $actualAssetName.\n";

            } else {
                echo "  Warning: Content asset '$assetName' not found.\n";
            }
        }
    }

    // Save changes to the markdown file if content was modified
    if ($content !== $originalContent) {
        file_put_contents($mdFile, $content);
        echo "  Saved changes to " . basename($mdFile) . "\n";
    }
}

echo "\nScript finished.\n";
