<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\UserResource;
use App\Http\Resources\ProjectResource;
use Illuminate\Support\Facades\Storage;

class TaskResource extends JsonResource
{
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'image_path' => $this->image_path ? Storage::url($this->image_path) : null,
            'status' => $this->status,
            'priority' => $this->priority,
            'due_date' => (new Carbon($this->due_date))->format('M. d, Y'),
            'project_id' =>  new ProjectResource($this->projectId),
            'assigned_user' => new UserResource($this->assignedUser),
            'created_at' => (new Carbon($this->created_at))->format('M. d, Y'),
            'created_by' => new UserResource($this->createdBy),
            'updated_by' => new UserResource($this->updatedBy)
        ];
    }
}
