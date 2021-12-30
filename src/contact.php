<?php
  
if($_POST) {
    $name = "";
    $email = "";
    $message = "";
    $email_body = "<div>";
    $recipient = "taylor.g1823@gmail.com";
      
    if(isset($_POST['contact-name'])) {
        $name = filter_var($_POST['contact-name'], FILTER_SANITIZE_STRING);
        $email_body .= "<div>
                           <label><b>Name:</b></label>&nbsp;<span>".$name."</span>
                        </div>";
    }
 
    if(isset($_POST['contact-email'])) {
        $email = str_replace(array("\r", "\n", "%0a", "%0d"), '', $_POST['contact-email']);
        $email = filter_var($email, FILTER_VALIDATE_EMAIL);
        $email_body .= "<div>
                           <label><b>Email:</b></label>&nbsp;<span>".$email."</span>
                        </div>";
    }
      
    if(isset($_POST['contact-msg'])) {
        $message = htmlspecialchars($_POST['contact-msg']);
        $email_body .= "<div>
                           <label><b>Message:</b></label>
                           <div>".$message."</div>
                        </div>";
    }
      
    $email_body .= "</div>";
 
    $headers  = 'MIME-Version: 1.0' . "\r\n"
    .'Content-type: text/html; charset=utf-8' . "\r\n"
    .'From: ' . $email . "\r\n";
      
    if(mail($recipient, "A new message from your website!", $email_body, $headers)) {
        echo "<p>Thank you! Your message was received.</p>";
    } else {
        echo '<p>Something went wrong: your message could not be sent.</p>';
    }
} else {
    echo '<p>Something went wrong</p>';
}
?>