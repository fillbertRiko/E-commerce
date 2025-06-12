<div class="sidebar sidebar-dark sidebar-main sidebar-expand-lg">

    <!-- Sidebar content -->
    <div class="sidebar-content">

        <!-- Sidebar header -->
        <div class="sidebar-section">
            <div class="sidebar-section-body d-flex justify-content-center">
                <h5 class="my-auto sidebar-resize-hide flex-grow-1">E-commerce</h5>

                <div>
                    <button type="button"
                        class="border-transparent btn btn-flat-white btn-icon btn-sm rounded-pill sidebar-control sidebar-main-resize d-none d-lg-inline-flex">
                        <i class="ph-arrows-left-right"></i>
                    </button>

                    <button type="button"
                        class="border-transparent btn btn-flat-white btn-icon btn-sm rounded-pill sidebar-mobile-main-toggle d-lg-none">
                        <i class="ph-x"></i>
                    </button>
                </div>
            </div>
        </div>
        <!-- /sidebar header -->


        <!-- Main navigation -->
        <div class="sidebar-section">
            <ul class="nav nav-sidebar" data-nav-type="accordion">
                <li class="nav-item-header">
                    <i class="ph-dots-three sidebar-resize-show"></i>
                </li>
                @if(!Auth::user()->isStudent())
                <li class="nav-item">
                    <a href="{{ route('dashboard') }}"
                        class="nav-link {{ request()->routeIs('dashboard') ? 'active' : '' }}">
                        <i class="ph-house"></i>
                        <span>Bảng điều khiển</span>
                    </a>
                </li>
                @endif

                @if(Auth::user()->can('viewAny', \App\Models\ClassGenerate::class) || Auth::user()->can('manageTeacher', \App\Models\ClassGenerate::class) || Auth::user()->can('manageSubTeacher', \App\Models\ClassGenerate::class))
                <li class="nav-item-header">
                    <div class="opacity-50 text-uppercase fs-sm lh-sm sidebar-resize-hide">Lớp học</div>
                    <i class="ph-dots-three sidebar-resize-show"></i>
                </li>
                @endif

                @can('viewAny', \App\Models\ClassGenerate::class)
                <li class="nav-item">
                    <a href="{{ route('classes.index') }}"
                        class="nav-link {{ request()->routeIs('classes.index') || request()->routeIs('classes.create') || request()->routeIs('classes.edit') || request()->routeIs('classes.show') ? 'active' : '' }}">
                        <i class="ph-books"></i>
                        <span>Danh sách lớp học</span>
                    </a>
                </li>
                @endcan

                @can('manageTeacher', \App\Models\ClassGenerate::class)
                <li class="nav-item">
                    <a href="{{ route('classes-teacher') }}"
                        class="nav-link {{ request()->routeIs('classes-teacher') ? 'active' : '' }}">
                        <i class="ph-address-book"></i>
                        <span>Giáo viên chủ nhiệm</span>
                    </a>
                </li>
                @endcan


                @if(Auth::user()->can('viewAny', \App\Models\Student::class))
                <li class="nav-item-header">
                    <div class="opacity-50 text-uppercase fs-sm lh-sm sidebar-resize-hide">Sinh viên</div>
                    <i class="ph-dots-three sidebar-resize-show"></i>
                </li>
                @endif

                @can('viewAny', \App\Models\Student::class)
                <li class="nav-item">
                    <a href="{{ route('students.index') }}"
                        class="nav-link {{ request()->routeIs('students.index') || request()->routeIs('students.show') || request()->routeIs('students.edit') || request()->routeIs('students.edit-detail') || request()->routeIs('students.import') ? 'active' : '' }}">
                        <i class="ph-users-four"></i>
                        <span>Khóa sinh viên</span>
                    </a>
                </li>
                @endcan

                @if(Auth::user()->can('viewAny', \App\Models\StudentUpdate::class) || Auth::user()->can('approveAsClassMonitor', \App\Models\StudentUpdate::class) || Auth::user()->can('approveAsTeacher', \App\Models\StudentUpdate::class) || Auth::user()->can('approveAsAdmin', \App\Models\StudentUpdate::class) || Auth::user()->isStudent())
                <li class="nav-item">
                    <a href="{{ route('student-updates.index') }}"
                        class="nav-link {{ request()->routeIs('student-updates.*') ? 'active' : '' }}">
                        <i class="ph-clipboard-text"></i>
                        <span>Yêu cầu chỉnh sửa thông tin</span>
                    </a>
                </li>
                @endif

                @can('viewAny', \App\Models\GraduationCeremony::class)
                <li class="nav-item">
                    <a href="{{ route('graduation.index') }}"
                        class="nav-link {{ request()->routeIs('graduation.*') ? 'active' : '' }}">
                        <i class="ph-graduation-cap"></i>
                        <span>Quản lý tốt nghiệp</span>
                    </a>
                </li>
                @endcan

                @can('viewAny', \App\Models\Warning::class)
                <li class="nav-item">
                    <a href="{{ route('warnings.index') }}"
                        class="nav-link {{ request()->routeIs('warnings.*') ? 'active' : '' }}">
                        <i class="ph-warning"></i>
                        <span>Quản lý cảnh báo</span>
                    </a>
                </li>
                @endcan

                @can('viewAny', \App\Models\Quit::class)
                <li class="nav-item">
                    <a href="{{ route('quits.index') }}"
                        class="nav-link {{ request()->routeIs('quits.*') ? 'active' : '' }}">
                        <i class="ph-prohibit"></i>
                        <span>Quản lý thôi học</span>
                    </a>
                </li>
                @endcan



                @if(Auth::user()->can('viewAny', \App\Models\Post::class) || Auth::user()->can('viewAny', \App\Models\Feedback::class))
                <li class="nav-item-header">
                    <div class="opacity-50 text-uppercase fs-sm lh-sm sidebar-resize-hide">Thông báo</div>
                    <i class="ph-dots-three sidebar-resize-show"></i>
                </li>
                @endif

                @can('viewAny', \App\Models\Post::class)
                <li class="nav-item">
                    <a href="{{ route('posts.index') }}"
                        class="nav-link {{ request()->routeIs('posts.*') ? 'active' : '' }}">
                        <i class="ph-note"></i>
                        <span>Bài viết</span>
                    </a>
                </li>
                @endcan

                @can('viewAny', \App\Models\Feedback::class)
                <li class="nav-item">
                    <a href="{{ route('feedbacks.index') }}"
                        class="nav-link {{ request()->routeIs('feedbacks.*') ? 'active' : '' }}">
                        <i class="ph-chat-text"></i>
                        <span>Bình luận</span>
                    </a>
                </li>
                @endcan

                @if (Auth::user()->can('viewAny', \App\Models\User::class) || Auth::user()->can('viewAny', \App\Models\Role::class))
                <li class="nav-item-header">
                    <div class="opacity-50 text-uppercase fs-sm lh-sm sidebar-resize-hide">Hệ thống</div>
                    <i class="ph-dots-three sidebar-resize-show"></i>
                </li>
                @endif


                @can('viewAny', \App\Models\User::class)
                <li class="nav-item">
                    <a href="{{ route('users.index') }}"
                        class="nav-link {{ request()->routeIs('users.*') ? 'active' : '' }}">
                        <i class="ph-user"></i>
                        <span>Người dùng</span>
                    </a>
                </li>
                @endcan
                @can('viewAny', \App\Models\Role::class)
                <li class="nav-item">
                    <a href="{{ route('roles.index') }}"
                        class="nav-link {{ request()->routeIs('roles.*') ? 'active' : '' }}">
                        <i class="ph-shield"></i>
                        <span>Vai trò</span>
                    </a>
                </li>
                @endcan

                @if(Auth::user()->isAdmin() || Auth::user()->hasPermission('activity.index'))
                <li class="nav-item">
                    <a href="{{ route('activities.index') }}"
                        class="nav-link {{ request()->routeIs('activities.*') ? 'active' : '' }}">
                        <i class="ph-activity"></i>
                        <span>Theo dõi hoạt động</span>
                    </a>
                </li>
                @endif

                {{-- Sidebar for student --}}
                @if(Auth::user()->isStudent())
                <li class="nav-item-header">
                    <div class="opacity-50 text-uppercase fs-sm lh-sm sidebar-resize-hide">Thông tin sinh viên</div>
                    <i class="ph-dots-three sidebar-resize-show"></i>
                </li>
                <li class="nav-item">
                    <a href="{{ route('student.profile') }}"
                        class="nav-link {{ request()->routeIs('student.profile') ? 'active' : '' }}">
                        <i class="ph-user-circle"></i>
                        <span>Thông tin cá nhân</span>
                    </a>
                </li>
                @endif

            </ul>
        </div>
        <!-- /main navigation -->

    </div>
    <!-- /sidebar content -->

</div>