<?php
function sendContactMailWithPHPMail(array $data): bool|string {

    $to = "bienthaibao111@gmail.com";

    $name = $data['name'] ?? '';
    $email = $data['email'] ?? '';
    $phone = $data['phone'] ?? '';
    $service = $data['service'] ?? '';
    $messageText = $data['message'] ?? '';

    $subject = "Đăng ký dịch vụ từ website";

    $message = <<<EOD
Họ tên: {$name}
Email: {$email}
Số điện thoại: {$phone}
Dịch vụ: {$service}
Nội dung: {$messageText}
EOD;

    $headers = "From: Salamass <no-reply@salamass.com>\r\n";
    $headers .= "Reply-To: {$email}\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    if (mail($to, $subject, $message, $headers)) {
        return true;
    } else {
        return "Không gửi được email. Kiểm tra server mail.";
    }
}