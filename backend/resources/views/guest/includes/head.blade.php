<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="description" content="{{ config('app.description', 'E-commerce platform') }}">
    <meta name="author" content="{{ config('app.author', 'Your Company') }}">
    <meta name="theme-color" content="#ffffff">

    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="{{ asset('assets/images/login.svg') }}">
    <link rel="apple-touch-icon" href="{{ asset('assets/images/apple-touch-icon.png') }}">

    <!-- Title -->
    <title>{{ config('app.name', 'E-commerce') }} - @yield('title', 'Welcome')</title>

    <!-- Styles -->
    @include('guest.includes.style')
    @if(isset($custom_css))
    {!! $custom_css !!}
    @endif
    @if(isset($styles))
    {!! $styles !!}
    @endif


    <!-- Additional Meta Tags -->
    <meta property="og:title" content="{{ config('app.name', 'E-commerce') }}">
    <meta property="og:description" content="{{ config('app.description', 'E-commerce platform') }}">
    <meta property="og:image" content="{{ asset('assets/images/og-image.jpg') }}">
    <meta property="og:url" content="{{ url()->current() }}">

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>