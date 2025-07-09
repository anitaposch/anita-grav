<?php
// fix_all_asset_links_final.php

$baseDir = __DIR__ . '/user/pages/04.blog/articles-other';

echo "Starting final asset link and casing correction script.\n";

// Function for case-insensitive file search within a specific directory
function find_file_case_insensitive($dir, $filename) {
    if (!is_dir($dir)) return null;
    $files = scandir($dir);
    foreach ($files as $file) {
        if (strcasecmp($file, $filename) == 0) {
            return $file; // Return the filename with its actual casing
        }
    }
    return null;
}

// Get all article subdirectories
$articleDirs = glob($baseDir . '/*', GLOB_ONLYDIR);

// Exclude the 'assets' directory itself from processing
$assetsDirRealPath = realpath($baseDir . '/assets');
if ($assetsDirRealPath) {
    $articleDirs = array_filter($articleDirs, function($dir) use ($assetsDirRealPath) {
        return realpath($dir) !== $assetsDirRealPath;
    });
}

foreach ($articleDirs as $articleDir) {
    // Find the markdown file in the directory
    $mdFiles = glob($articleDir . '/*.md');
    if (empty($mdFiles)) {
        continue;
    }

    $mdFile = $mdFiles[0];
    $content = file_get_contents($mdFile);
    $originalContent = $content;

    echo "\nProcessing file: " . basename($mdFile) . "\n";

    // Regex to find all links (markdown, html src, html href)
    // It captures the prefix, the optional 'assets/' path, and the filename
    preg_match_all('/(\(|(src|href)=["\'])(?:assets\/)?([^")]+)("|\))/', $content, $matches, PREG_SET_ORDER);

    $changesMade = false;
    foreach ($matches as $match) {
        $fullMatch = $match[0];      // e.g., [(assets/image.JPG)](cci:1://file:///home/ndeet/projects/anita-grav/fix_and_move_assets.php:8:0-17:1)
        $linkPrefix = $match[1];    // e.g., `(`
        $assetNameInLink = $match[3]; // e.g., `image.JPG`
        $linkSuffix = $match[4];    // e.g., `)`

        // Check if the linked file actually exists in the article's directory (case-insensitively)
        $actualAssetName = find_file_case_insensitive($articleDir, $assetNameInLink);

        if ($actualAssetName) {
            // If the casing in the link is wrong, or if the assets/ path is still there, we need to fix it.
            $newLink = $linkPrefix . $actualAssetName . $linkSuffix;
            if ($fullMatch !== $newLink) {
                $content = str_replace($fullMatch, $newLink, $content);
                echo "  Fixed link: from '$assetNameInLink' to '$actualAssetName'\n";
                $changesMade = true;
            }
        }
    }

    // Save changes to the markdown file only if content was modified
    if ($changesMade) {
        file_put_contents($mdFile, $content);
        echo "  Saved changes to " . basename($mdFile) . "\n";
    }
}

echo "\nScript finished.\n";