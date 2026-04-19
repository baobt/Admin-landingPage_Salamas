<?php

/**
 * JWT Auth helpers.
 * Uses a pure-PHP HS256 implementation — no external library required.
 * Equivalent to: authMiddleware() + jwt.sign / jwt.verify in server.js
 */

require_once __DIR__ . '/env.php';

// ─── Tiny HS256 JWT (no composer dep) ────────────────────────────────────────

function base64url_encode(string $data): string {
    return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}

function base64url_decode(string $data): string {
    return base64_decode(strtr($data, '-_', '+/') . str_repeat('=', (4 - strlen($data) % 4) % 4));
}

/**
 * Sign a payload and return a JWT string.
 * expiresIn: seconds from now (default 86400 = 1 day).
 */
function jwtSign(array $payload, int $expiresIn = 86400): string {
    $secret = env('JWT_SECRET', 'secret');

    $header  = base64url_encode(json_encode(['alg' => 'HS256', 'typ' => 'JWT']));
    $payload['iat'] = time();
    $payload['exp'] = time() + $expiresIn;
    $body    = base64url_encode(json_encode($payload));

    $sig = base64url_encode(hash_hmac('sha256', "$header.$body", $secret, true));

    return "$header.$body.$sig";
}

/**
 * Verify a JWT string and return its payload array, or throw on failure.
 */
function jwtVerify(string $token): array {
    $secret = env('JWT_SECRET', 'secret');
    $parts  = explode('.', $token);

    if (count($parts) !== 3) {
        throw new RuntimeException('Invalid token structure');
    }

    [$header, $body, $sig] = $parts;

    $expected = base64url_encode(hash_hmac('sha256', "$header.$body", $secret, true));

    if (!hash_equals($expected, $sig)) {
        throw new RuntimeException('Invalid signature');
    }

    $payload = json_decode(base64url_decode($body), true);

    if (isset($payload['exp']) && $payload['exp'] < time()) {
        throw new RuntimeException('Token expired');
    }

    return $payload;
}

/**
 * Protect a route: reads Authorization: Bearer <token>, returns payload or
 * sends 401 and exits.
 */
function requireAuth(): array {
    $header = $_SERVER['HTTP_AUTHORIZATION'] ?? '';

    if ($header === '') {
        jsonResponse(['message' => 'No token'], 401);
    }

    $token = trim(str_replace('Bearer', '', $header));

    try {
        return jwtVerify($token);
    } catch (Throwable) {
        jsonResponse(['message' => 'Invalid token'], 401);
    }
}
