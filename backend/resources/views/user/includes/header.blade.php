@php
$auth = app(App\Http\Controllers\AuthController::class)->getDataUser();
@endphp

<div class="border-opacity-10 navbar navbar-dark navbar-expand-lg navbar-static border-bottom border-bottom-white">
    <div class="container-fluid">
        <div class="d-flex d-lg-none me-2">
            <button type="button" class="navbar-toggler sidebar-mobile-main-toggle rounded-pill">
                <i class="ph-list"></i>
            </button>
        </div>

        <div class="flex-1 navbar-brand flex-lg-0">
            <a href="{{ route('admin.dashboard') }}" class="d-inline-flex align-items-center">
                <img class="w-auto h-48px" src="{{ asset('assets/images/logo-admin.png') }}" alt="">
            </a>
        </div>

        <ul class="flex-row order-1 nav justify-content-end order-lg-2 align-items-center">
            @if (auth()->check())
            @if ($auth['role'] == \App\Enums\Role::SuperAdmin->value)
            <li class="ms-lg-2">
                <livewire:commons.faculty-selected />
            </li>
            @endif

            @can('viewAny', \App\Models\Post::class)
            <li class="ms-lg-2">
                <livewire:post.notifications />
            </li>
            @endcan
            <li class="nav-item nav-item-dropdown-lg dropdown ms-lg-2">
                <a href="#" class="p-1 navbar-nav-link align-items-center rounded-pill" data-bs-toggle="dropdown">
                    <div class="status-indicator-container">
                        <img src="{{ Avatar::create($auth['full_name'])->toBase64() }}" class="w-32px h-32px rounded-pill" alt="">
                    </div>
                    <span class="status-indicator bg-success"></span>
                    <span class="d-none d-lg-inline-block mx-lg-2">{{ $auth['full_name'] }}</span>
                </a>

                <div class="dropdown-menu dropdown-menu-end">
                    <a href="{{ config('auth.sso.uri') }}/profile" target="_blank" class="dropdown-item">
                        <i class="ph-gear me-2"></i>
                        Tài khoản
                    </a>
                    <div class="dropdown-divider"></div>

                    <form action="{{ route('handleLogout') }}" method="POST">
                        @csrf
                        <button type="submit" class="dropdown-item">
                            <i class="ph-sign-out me-2"></i>
                            Đăng xuất
                        </button>
                    </form>
                </div>
            </li>
            @endif
        </ul>
    </div>
</div>