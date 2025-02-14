<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\TaskResource;
use App\Models\User;
use Illuminate\Support\Facades\Storage;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Task::query();

        $sortField = request("sort_field", "name");
        $sortDirection = request("sort_direction", "asc");

        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }

        if (request("status")) {
            if (request("status") !== "all") {
                $query->where("status", request("status"));
            }
        }

        $tasks = $query->orderBy($sortField, $sortDirection)->paginate(15)->onEachSide(1);

        return inertia("Task/Index", [
            "tasks" => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?: null,
            "message" => session("message"),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $users = User::query()->orderBy("name")->get();

        return inertia("Task/Create", [
            "users" => $users,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {

        $data = $request->validated();
        $data["created_by"] = auth()->id();
        $data["updated_by"] = auth()->id();

        $task = Task::create($data);

        return redirect()->route("task.index")->with("message", "Task created successfully.");
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        return inertia("Task/Show", [
            'task' => new TaskResource($task),
            "queryParams" => request()->query() ?: null,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        $users = User::query()->orderBy("name")->get();

        return inertia("Task/Edit", [
            "task" => new TaskResource($task),
            "users" => $users,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $data = $request->validated();
        $data["updated_by"] = auth()->id();
        $data["updated_by"] = auth()->id();

        $task->update($data);
        return redirect()->route("task.index")->with("message", "Task updated successfully.");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $task->delete();

        return redirect()->route("task.index")->with("message", "Task deleted successfully.");
    }
}
