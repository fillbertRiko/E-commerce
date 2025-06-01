<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ApiResource extends JsonResource
{
    private $status;
    private $message;

    public function __construct($resource, $status = 'success', $message = '')
    {
        parent::__construct($resource);
        $this->status = $status;
        $this->message = $message;
    }

    public function toArray($request)
    {
        return [
            'status' => $this->status,
            'message' => $this->message,
            'data' => parent::toArray($request)
        ];
    }
}
