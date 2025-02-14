<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        $totalPendingTasks = Task::where('status', 'pending')->count();
        $totalOngoingTasks = Task::where('status', 'ongoing')->count();
        $totalCompletedTasks = Task::where('status', 'completed')->count();
        $totalMyPendingTasks = Task::where('status', 'pending')->where('assigned_user', $user->id)->count();

        return inertia('Dashboard', [
            'generalCounts' => [
                'totalPendingTasks' => $totalPendingTasks,
                'totalOngoingTasks' => $totalOngoingTasks,
                'totalCompletedTasks' => $totalCompletedTasks,
                'totalMyPendingTasks' => $totalMyPendingTasks
            ]
        ]);
    }
}
