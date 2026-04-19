<?php

/**
 * POST /api/login
 * Equivalent to: POST /api/login in server.js
 */

require_once __DIR__ . '/../config/env.php';
require_once __DIR__ . '/../config/helpers.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/auth.php';

handleCors();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(['success' => false, 'message' => 'Method not allowed'], 405);
}

$body     = requestBody();
$email    = $body['email']    ?? '';
$password = $body['password'] ?? '';

if (!$email || !$password) {
    jsonResponse(['success' => false, 'message' => 'Email and password are required'], 400);
}

$rows  = dbQuery('SELECT * FROM admin_accounts WHERE email = ?', [$email]);
$admin = $rows[0] ?? null;

if (!$admin) {
    jsonResponse(['success' => false, 'message' => 'Invalid credentials'], 401);
}

// password_hash column was created with bcrypt via bcrypt.hash() in Node.js
// PHP's password_verify() is compatible with bcrypt $2b$ hashes.
if (!password_verify($password, $admin['password_hash'])) {
    jsonResponse(['success' => false, 'message' => 'Invalid credentials'], 401);
}

$token = jwtSign([
    'adminId' => $admin['id'],
    'email'   => $admin['email'],
]);

jsonResponse(['success' => true, 'token' => $token]);
