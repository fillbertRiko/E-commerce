<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class Handler extends ExceptionHandler
{
    protected $dontReport = [
        //
    ];

    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    public function render($request, Throwable $exception)
    {
        if ($request->expectsJson()) {
            if ($exception instanceof ValidationException) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Validation failed',
                    'errors' => $exception->errors()
                ], 422);
            }

            if ($exception instanceof AuthenticationException) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Unauthenticated',
                ], 401);
            }

            if ($exception instanceof NotFoundHttpException) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Not Found',
                ], 404);
            }

            return response()->json([
                'status' => 'error',
                'message' => $exception->getMessage(),
            ], 500);
        }

        return parent::render($request, $exception);
    }
}
