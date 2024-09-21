<?php

namespace App\Exceptions;

use Dotenv\Exception\ValidationException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    public function render($request, Throwable $exception)
    {
        // Default status code for exceptions
        $statusCode = 500;

        // Handle different types of exceptions and their status codes
        if ($exception instanceof HttpException) {
            // Get status code from HttpException (e.g., 404, 403)
            $statusCode = $exception->getStatusCode();
        } elseif ($exception instanceof ValidationException) {
            // Handle validation errors (usually 422 Unprocessable Entity)
            $statusCode = 422;
        } elseif ($exception instanceof AuthenticationException) {
            // Handle authentication errors (usually 401 Unauthorized)
            $statusCode = 401;
        }

        // Check if request expects JSON or if it's an API route
        if ($request->expectsJson() || $request->is('api/*')) {
            return response()->json([
                'message' => $exception->getMessage(),
                'status' => $statusCode,
            ], $statusCode);
        }

        // Default rendering for non-API requests (HTML)
        return parent::render($request, $exception);
    }
}
