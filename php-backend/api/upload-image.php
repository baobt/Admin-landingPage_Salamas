<?php

/**
 * POST /api/upload-image  (protected)
 * Equivalent to: POST /api/upload-image in server.js
 */

require_once __DIR__ . '/../config/env.php';
require_once __DIR__ . '/../config/helpers.php';
require_once __DIR__ . '/../config/auth.php';

handleCors();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(['success' => false, 'message' => 'Method not allowed'], 405);
}

requireAuth();

if (empty($_FILES['file'])) {
    jsonResponse(['success' => false, 'message' => 'No file uploaded'], 400);
}

$file = $_FILES['file'];

if ($file['error'] !== UPLOAD_ERR_OK) {
    jsonResponse(['success' => false, 'message' => 'Upload error'], 400);
}

// Validate image MIME type
if (!str_starts_with($file['type'], 'image/')) {
    jsonResponse(['success' => false, 'message' => 'Only image files allowed'], 400);
}

// 3 MB limit
if ($file['size'] > 3 * 1024 * 1024) {
    jsonResponse(['success' => false, 'message' => 'File too large (max 3 MB)'], 400);
}

$uploadsDir = dirname(__DIR__) . '/uploads';
if (!is_dir($uploadsDir)) {
    mkdir($uploadsDir, 0755, true);
}

$ext      = pathinfo($file['name'], PATHINFO_EXTENSION);
$filename = 'img-' . round(microtime(true) * 1000) . '.' . $ext;
$dest     = $uploadsDir . '/' . $filename;

if (!move_uploaded_file($file['tmp_name'], $dest)) {
    jsonResponse(['success' => false, 'message' => 'Failed to save file'], 500);
}

jsonResponse(['success' => true, 'url' => '/uploads/' . $filename]);
