<!DOCTYPE html>
<html lang="en">

<head>
    @include('admin.components.head')
</head>

<body>
    @include('admin.components.header')

    <div class="container">
        @include('admin.components.sidebar')

        <main>
            @yield('content')
        </main>
    </div>

    @include('admin.components.footer')
</body>

</html>