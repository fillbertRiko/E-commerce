<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <title>{{ config('app.name', 'E-commerce') }}</title>
    <link rel="icon" type="image/x-icon" href="{{ asset('assets/images/login.svg') }}">
    @include('includes.style')
    {{ $custom_css ?? '' }}
    {{ $styles ?? '' }}
    @include('includes.script')
    {{ $custom_js ?? '' }}
</head>