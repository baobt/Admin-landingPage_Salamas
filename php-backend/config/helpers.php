<?php

/**
 * Response helpers & CORS.
 */

require_once __DIR__ . '/env.php';

// ─── CORS ─────────────────────────────────────────────────────────────────────

function handleCors(): void {
    $allowedOrigins = [
        'http://localhost:5173',
        'http://localhost:5174',
        env('CLIENT_URL'),
        env('ADMIN_URL'),
    ];

    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';

    if (in_array($origin, $allowedOrigins, true)) {
        header("Access-Control-Allow-Origin: $origin");
    }

    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');

    // Preflight
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(204);
        exit;
    }
}

// ─── JSON response ────────────────────────────────────────────────────────────

function jsonResponse(mixed $data, int $status = 200): never {
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

// ─── Request body helpers ─────────────────────────────────────────────────────

/**
 * Parse the JSON request body (equivalent to req.body in Express).
 */
function requestBody(): array {
    static $body = null;

    if ($body !== null) {
        return $body;
    }

    $raw  = file_get_contents('php://input');
    $body = json_decode($raw ?: '{}', true) ?? [];

    return $body;
}

/**
 * Get a value from the JSON body or $_POST.
 */
function input(string $key, mixed $default = null): mixed {
    $body = requestBody();
    return $body[$key] ?? $_POST[$key] ?? $default;
}

// ─── UUID v4 ──────────────────────────────────────────────────────────────────

function uuid4(): string {
    $data = random_bytes(16);
    $data[6] = chr((ord($data[6]) & 0x0f) | 0x40);
    $data[8] = chr((ord($data[8]) & 0x3f) | 0x80);
    return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
}

// ─── Content helpers ─────────────────────────────────────────────────────────

/**
 * Turn nested [language => [key => value]] into flat rows.
 * Equivalent to flattenContent() in server.js
 */
function flattenContent(array $map): array {
    $items = [];
    foreach ($map as $language => $entries) {
        foreach ($entries as $key => $value) {
            $items[] = ['language' => $language, 'contentKey' => $key, 'contentValue' => $value];
        }
    }
    return $items;
}

/**
 * Turn flat DB rows back into nested [language => [key => value]].
 * Equivalent to unflattenContent() in server.js
 */
function unflattenContent(array $rows): array {
    $result = [];
    foreach ($rows as $row) {
        $result[$row['language']][$row['content_key']] = $row['content_value'];
    }
    return $result;
}
