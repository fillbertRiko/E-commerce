<!DOCTYPE html>
<html>

<head>
    <title>My React App</title>
    <!-- Load Vite assets -->
    @vite(['resources/css/app.css', 'resources/js/main.jsx'])
</head>

<body>
    <!-- Phần tử root phải tồn tại -->
    <div id="root"></div>

    <!-- Debug: Kiểm tra xem JS đã load -->
    <script>
        console.log("HTML loaded");
        document.addEventListener('DOMContentLoaded', () => {
            console.log("DOM fully loaded and parsed");
        });
    </script>
</body>

</html>
