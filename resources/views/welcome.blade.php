<!DOCTYPE html>
<html lang="en">

<head>
    @include('components.head')
</head>

<body>
    @include('components.header')

    <div class="container">
        @include('components.sidebar')

        <main>
            @yield('content')
        </main>
    </div>

    @include('components.footer')
</body>

</html>