<?php
// GET /api/health

require_once __DIR__ . '/../config/helpers.php';

handleCors();
jsonResponse(['ok' => true]);
