<?php

/**
 * Minimal .env loader (no external dependency needed).
 * Reads KEY=VALUE pairs from the .env file at project root.
 */

(function () {
    $envFile = dirname(__DIR__) . '/.env';

    if (!file_exists($envFile)) {
        return;
    }

    $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

    foreach ($lines as $line) {
        $line = trim($line);

        // Skip comments
        if ($line === '' || str_starts_with($line, '#')) {
            continue;
        }

        [$key, $value] = array_map('trim', explode('=', $line, 2));

        if ($key !== '' && !array_key_exists($key, $_ENV)) {
            $_ENV[$key] = $value;
            putenv("$key=$value");
        }
    }
})();

/**
 * Get an env variable (same as process.env.X in Node.js).
 */
function env(string $key, string $default = ''): string {
    return $_ENV[$key] ?? getenv($key) ?: $default;
}
