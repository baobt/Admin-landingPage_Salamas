<?php

/**
 * /api/leads
 *   GET  – list all leads (protected)
 *   POST – submit a new lead (public, with optional PDF uploads)
 *
 * Equivalent to: GET /api/leads  &  POST /api/leads  in server.js
 */

require_once __DIR__ . '/../config/env.php';
require_once __DIR__ . '/../config/helpers.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/auth.php';

handleCors();

$method = $_SERVER['REQUEST_METHOD'];

// ─── GET /api/leads ───────────────────────────────────────────────────────────

if ($method === 'GET') {
    requireAuth();

    $rows = dbQuery("
        SELECT
            l.id,
            l.name,
            l.email,
            l.phone,
            l.user_type AS userType,
            l.plan,
            DATE_FORMAT(l.created_at, '%Y-%m-%dT%H:%i:%sZ') AS createdAt,
            lf.file_url  AS fileUrl,
            lf.original_name AS fileName,
            lf.mime_type AS mimeType,
            lf.file_size AS fileSize
        FROM leads l
        LEFT JOIN lead_files lf ON lf.lead_id = l.id
        ORDER BY l.created_at DESC
    ");

    // Group files under their lead (same as the Map logic in server.js)
    $leads = [];
    foreach ($rows as $row) {
        $id = $row['id'];
        if (!isset($leads[$id])) {
            $leads[$id] = [
                'id'        => $row['id'],
                'name'      => $row['name'],
                'email'     => $row['email'],
                'phone'     => $row['phone'],
                'userType'  => $row['userType'],
                'plan'      => $row['plan'],
                'createdAt' => $row['createdAt'],
                'files'     => [],
            ];
        }
        if ($row['fileUrl']) {
            $leads[$id]['files'][] = [
                'url'      => $row['fileUrl'],
                'name'     => $row['fileName'],
                'mimetype' => $row['mimeType'],
                'size'     => (int) $row['fileSize'],
            ];
        }
    }

    jsonResponse(['success' => true, 'data' => array_values($leads)]);
}

// ─── POST /api/leads ──────────────────────────────────────────────────────────

if ($method === 'POST') {
    $name     = $_POST['name']     ?? '';
    $email    = $_POST['email']    ?? '';
    $phone    = $_POST['phone']    ?? '';
    $userType = $_POST['userType'] ?? '';
    $plan     = $_POST['plan']     ?? '';

    if (!$name || !$email || !$phone || !$userType || !$plan) {
        jsonResponse(['success' => false, 'message' => 'Missing required fields'], 400);
    }

    // ── Handle uploaded PDF files ──────────────────────────────────────────────
    $uploadsDir = dirname(__DIR__) . '/uploads';
    if (!is_dir($uploadsDir)) {
        mkdir($uploadsDir, 0755, true);
    }

    $uploadedFiles = [];

    if (!empty($_FILES['files'])) {
        $files = $_FILES['files'];

        // Normalize to array even when only 1 file is sent
        $count = is_array($files['name']) ? count($files['name']) : 1;
        if (!is_array($files['name'])) {
            foreach ($files as $k => $v) {
                $files[$k] = [$v];
            }
        }

        if ($count > 3) {
            jsonResponse(['success' => false, 'message' => 'Maximum 3 files allowed'], 400);
        }

        foreach (range(0, $count - 1) as $i) {
            $error    = $files['error'][$i];
            $tmpName  = $files['tmp_name'][$i];
            $origName = $files['name'][$i];
            $size     = $files['size'][$i];
            $mime     = $files['type'][$i];

            if ($error !== UPLOAD_ERR_OK) continue;

            // Validate PDF only
            if ($mime !== 'application/pdf') {
                jsonResponse(['success' => false, 'message' => 'Only PDF files are allowed'], 400);
            }

            // 5 MB limit
            if ($size > 5 * 1024 * 1024) {
                jsonResponse(['success' => false, 'message' => 'File too large (max 5 MB)'], 400);
            }

            $safeName = preg_replace('/\s+/', '-', $origName);
            $filename = time() . mt_rand(100, 999) . '-' . $safeName;
            $dest     = $uploadsDir . '/' . $filename;

            if (!move_uploaded_file($tmpName, $dest)) {
                jsonResponse(['success' => false, 'message' => 'Failed to save file'], 500);
            }

            $uploadedFiles[] = [
                'name'     => $origName,
                'url'      => '/uploads/' . $filename,
                'mimetype' => $mime,
                'size'     => $size,
            ];
        }
    }

    // ── Persist in DB ──────────────────────────────────────────────────────────
    $leadId = uuid4();

    withTransaction(function (PDO $pdo) use ($leadId, $name, $email, $phone, $userType, $plan, $uploadedFiles) {
        $stmt = $pdo->prepare(
            'INSERT INTO leads (id, name, email, phone, user_type, plan) VALUES (?, ?, ?, ?, ?, ?)'
        );
        $stmt->execute([$leadId, $name, $email, $phone, $userType, $plan]);

        foreach ($uploadedFiles as $file) {
            $stmt = $pdo->prepare(
                'INSERT INTO lead_files (lead_id, original_name, file_url, mime_type, file_size)
                 VALUES (?, ?, ?, ?, ?)'
            );
            $stmt->execute([$leadId, $file['name'], $file['url'], $file['mimetype'], $file['size']]);
        }
    });

    jsonResponse([
        'success' => true,
        'data' => [
            'id'       => $leadId,
            'name'     => $name,
            'email'    => $email,
            'phone'    => $phone,
            'userType' => $userType,
            'plan'     => $plan,
            'files'    => $uploadedFiles,
        ],
    ], 201);
}

// ─── Method not allowed ───────────────────────────────────────────────────────
jsonResponse(['success' => false, 'message' => 'Method not allowed'], 405);
