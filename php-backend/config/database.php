<?php

/**
 * Database configuration & helpers
 * Equivalent to: data/mysql.js
 */

require_once __DIR__ . '/../config/env.php';

function getDb(): PDO {
    static $pdo = null;

    if ($pdo !== null) {
        return $pdo;
    }

    $host = env('DB_HOST', '127.0.0.1');
    $port = env('DB_PORT', '3306');
    $user = env('DB_USER', 'root');
    $pass = env('DB_PASSWORD', '');
    $name = env('DB_NAME', 'salamass');

    $dsn = "mysql:host=$host;port=$port;dbname=$name;charset=utf8mb4";

    $pdo = new PDO($dsn, $user, $pass, [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ]);

    return $pdo;
}

/**
 * Execute a query and return all rows.
 */
function dbQuery(string $sql, array $params = []): array {
    $stmt = getDb()->prepare($sql);
    $stmt->execute($params);
    return $stmt->fetchAll();
}

/**
 * Execute a query with no return (INSERT / UPDATE / DELETE).
 */
function dbExecute(string $sql, array $params = []): int {
    $stmt = getDb()->prepare($sql);
    $stmt->execute($params);
    return $stmt->rowCount();
}

/**
 * Run a callback inside a transaction.
 * Rolls back and re-throws on any exception.
 */
function withTransaction(callable $callback): mixed {
    $pdo = getDb();
    $pdo->beginTransaction();
    try {
        $result = $callback($pdo);
        $pdo->commit();
        return $result;
    } catch (Throwable $e) {
        $pdo->rollBack();
        throw $e;
    }
}

/**
 * Create all tables if they do not exist.
 * Equivalent to: initDatabase() in mysql.js
 */
function initDatabase(): void {
    $pdo = getDb();

    $pdo->exec("
        CREATE TABLE IF NOT EXISTS leads (
            id CHAR(36) PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            phone VARCHAR(50) NOT NULL,
            user_type VARCHAR(50) NOT NULL,
            plan VARCHAR(50) NOT NULL,
            created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    ");

    $pdo->exec("
        CREATE TABLE IF NOT EXISTS lead_files (
            id BIGINT AUTO_INCREMENT PRIMARY KEY,
            lead_id CHAR(36) NOT NULL,
            original_name VARCHAR(255) NOT NULL,
            file_url VARCHAR(500) NOT NULL,
            mime_type VARCHAR(100) NOT NULL,
            file_size INT NOT NULL,
            created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            CONSTRAINT fk_lead_files_lead FOREIGN KEY (lead_id)
                REFERENCES leads(id)
                ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    ");

    $pdo->exec("
        CREATE TABLE IF NOT EXISTS content_entries (
            id BIGINT AUTO_INCREMENT PRIMARY KEY,
            language VARCHAR(10) NOT NULL,
            content_key VARCHAR(100) NOT NULL,
            content_value TEXT NOT NULL,
            created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            UNIQUE KEY uniq_language_key (language, content_key)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    ");

    $pdo->exec("
        CREATE TABLE IF NOT EXISTS content_versions (
            id CHAR(36) PRIMARY KEY,
            snapshot_json LONGTEXT NOT NULL,
            created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    ");

    $pdo->exec("
        CREATE TABLE IF NOT EXISTS admin_accounts (
            id CHAR(36) PRIMARY KEY,
            email VARCHAR(255) NOT NULL UNIQUE,
            password_hash VARCHAR(255) NOT NULL,
            created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    ");
}
