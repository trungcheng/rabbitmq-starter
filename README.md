# Có 5 loại exchange trong rabbitmq:

1. direct: đẩy message đến hàng đợi dựa theo khóa định tuyến routing key

2. fanout: đẩy message đến toàn bộ hàng đợi gắn với nó (pub-sub)

3. topic: sẽ làm một wildcart để gắn routing key với một routing pattern khai báo trong binding. Consumer có thể đăng ký những topic mà nó quan tâm. Cú pháp được sử dụng ở đây là \* và #

4. headers: dùng các thuộc tính header của message để định tuyến. Khá giống với topic exchange nhưng định tuyến dựa trên các giá trị tiêu đề thay vì các khóa định tuyến

5. dead: nếu không tìm thấy hàng đợi phù hợp cho message, message sẽ tự động bị hủy, dead letter exchange cung cấp chức năng để chụp các tin nhắn không thể gửi được

# Development:

1. Khởi động server rabbitmq bằng docker:
   docker run -it —rm —name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3.10-management

2. cd to project folder

3. run `npm install`
