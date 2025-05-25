@extends('admin.layouts.app')

@section('title', 'Settings')

@section('content')
<div class="container mt-4">
    <h1>Settings</h1>
    <form action="{{ route('admin.settings.update') }}" method="POST">
        @csrf
        <!-- Example setting field -->
        <div class="mb-3">
            <label for="site_name" class="form-label">Site Name</label>
            <input type="text" class="form-control" id="site_name" name="site_name" value="{{ old('site_name', $settings->site_name ?? '') }}">
        </div>
        <!-- Add more settings fields as needed -->
        <button type="submit" class="btn btn-primary">Save Settings</button>
    </form>
</div>
@endsection