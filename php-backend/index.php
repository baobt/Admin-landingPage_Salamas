<?php

/**
 * index.php — Front controller
 *
 * Routes every /api/* request to the matching file under api/,
 * serves /uploads/* as static files,
 * and runs DB init + seeding on first request.
 *
 * With Apache mod_rewrite, point all requests here via .htaccess.
 * With PHP built-in server:  php -S 0.0.0.0:4000 index.php
 */

require_once __DIR__ . '/config/env.php';
require_once __DIR__ . '/config/helpers.php';
require_once __DIR__ . '/config/database.php';

// ─── One-time bootstrap ───────────────────────────────────────────────────────

initDatabase();
seedDefaultContent();
seedAdminAccount();

// ─── Route the request ────────────────────────────────────────────────────────

$uri  = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri  = '/' . ltrim($uri, '/');

// Serve uploaded files as static assets
if (str_starts_with($uri, '/uploads/')) {
    $file = __DIR__ . $uri;
    if (is_file($file)) {
        $mime = mime_content_type($file) ?: 'application/octet-stream';
        header("Content-Type: $mime");
        readfile($file);
        exit;
    }
    http_response_code(404);
    exit;
}

// Map URL → handler file
$routes = [
    '/api/health'       => __DIR__ . '/api/health.php',
    '/api/leads'        => __DIR__ . '/api/leads.php',
    '/api/login'        => __DIR__ . '/api/login.php',
    '/api/content'      => __DIR__ . '/api/content.php',
    '/api/upload-image' => __DIR__ . '/api/upload-image.php',
];

if (isset($routes[$uri])) {
    require $routes[$uri];
    exit;
}

// 404 fallback
handleCors();
jsonResponse(['success' => false, 'message' => 'Not found'], 404);

// ─── Seed functions ───────────────────────────────────────────────────────────

function seedDefaultContent(): void {
    $defaultContent = require __DIR__ . '/data/defaultContent.php';
    $items = flattenContent($defaultContent);

    withTransaction(function (PDO $pdo) use ($items) {
        $stmt = $pdo->prepare("
            INSERT INTO content_entries (language, content_key, content_value)
            VALUES (?, ?, ?)
            ON DUPLICATE KEY UPDATE content_value = VALUES(content_value)
        ");
        foreach ($items as $item) {
            $stmt->execute([$item['language'], $item['contentKey'], $item['contentValue']]);
        }
    });
}

function seedAdminAccount(): void {
    $email    = env('ADMIN_EMAIL');
    $password = env('ADMIN_PASSWORD');

    if (!$email || !$password) return;

    $rows = dbQuery('SELECT id FROM admin_accounts WHERE email = ?', [$email]);
    if (!empty($rows)) return; // already seeded

    $hash = password_hash($password, PASSWORD_BCRYPT, ['cost' => 10]);
    $id   = uuid4();

    dbExecute(
        'INSERT INTO admin_accounts (id, email, password_hash) VALUES (?, ?, ?)',
        [$id, $email, $hash]
    );
}
