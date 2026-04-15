<?php
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowedOrigins = [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
];

if (in_array($origin, $allowedOrigins, true)) {
    header("Access-Control-Allow-Origin: {$origin}");
}

header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=UTF-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/send_mail.php';

$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'JSON không hợp lệ']);
    exit;
}

$requiredFields = ['name', 'email', 'phone', 'userType'];
$missing = array_filter($requiredFields, fn($f) => empty(trim($data[$f] ?? '')));

if ($missing) {
    http_response_code(422);
    echo json_encode([
        'success' => false,
        'message' => 'Thiếu thông tin: ' . implode(', ', $missing)
    ]);
    exit;
}

// Map userType to service
$userTypeMap = [
    'buyer' => 'Buyer',
    'seller' => 'Seller',
    'distributor' => 'Distributor'
];
$data['service'] = $userTypeMap[$data['userType']] ?? 'Unknown';

// Default message
$data['message'] = $data['message'] ?? 'Lead registration from Salamass website';

// validate email
if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode([
        'success' => false,
        'message' => 'Email không hợp lệ'
    ]);
    exit;
}

$result = sendContactMailWithPHPMail($data);

if ($result === true) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => $result]);
}
?>
