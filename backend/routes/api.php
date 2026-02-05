<?php
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClientProfileController;
use App\Http\Controllers\FreelancerProfileController;
use App\Http\Controllers\FreelancerLanguageController;
use App\Http\Controllers\FreelancerExperienceController;
use App\Http\Controllers\FreelancerEducationController;
use App\Http\Controllers\FreelancerSkillController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\ProposalController;
use App\Http\Controllers\ProjectController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\ProjectFileController;
use App\Http\Controllers\ActivityController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\FreelancerDashboardController;
use App\Http\Controllers\WithdrawalController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\ClientDashboardController;
use App\Http\Controllers\ClientProjectController;
use App\Http\Controllers\ClientBillingController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\ClientReportController;
use App\Http\Controllers\ClientSettingsController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me',      [AuthController::class, 'me']);

    Route::post('/client/profile', [ClientProfileController::class, 'store']);

    Route::post('/freelancer/profile', [FreelancerProfileController::class, 'update']);

    Route::post('/freelancer/language', [FreelancerLanguageController::class, 'store']);

    Route::post('/freelancer/experience', [FreelancerExperienceController::class, 'store']);
    Route::delete('/freelancer/experience/{id}', [FreelancerExperienceController::class, 'destroy']);

    Route::post('/freelancer/education', [FreelancerEducationController::class, 'store']);
    Route::delete('/freelancer/education/{id}', [FreelancerEducationController::class, 'destroy']);

    Route::post('/freelancer/skills/add', [FreelancerSkillController::class, 'addSkill']);
    Route::delete('/freelancer/skills/remove/{skill_id}', [FreelancerSkillController::class, 'removeSkill']);

    Route::post('/jobs', [JobController::class, 'store']);
    Route::get('/jobs', [JobController::class, 'index']);
    Route::get('/jobs/{id}', [JobController::class, 'show']);

    Route::post('/jobs/{id}/apply', [ProposalController::class, 'apply']);

    Route::get('/client/jobs/{id}/proposals', [ProposalController::class, 'listForJob']);
    Route::post('/proposals/{id}/accept', [ProposalController::class, 'accept']);


    // Client
    Route::get('/client/projects', [ProjectController::class, 'clientProjects']);
    Route::post('/projects/{id}/status', [ProjectController::class, 'updateStatus']);

    // Freelancer
    Route::get('/freelancer/projects', [ProjectController::class, 'freelancerProjects']);
    Route::post('/projects/{id}/progress', [ProjectController::class, 'updateProgress']);

    // Common
    Route::get('/projects/{id}', [ProjectController::class, 'show']);

    
    //messages 
    Route::post('/messages/send', [MessageController::class, 'send']);
    Route::get('/messages/{projectId}', [MessageController::class, 'messages']);
    Route::get('/messages/unread/count', [MessageController::class, 'unreadCount']);

    //project files
     Route::post('/projects/{id}/files', [ProjectFileController::class, 'upload']);
    Route::get('/projects/{id}/files', [ProjectFileController::class, 'list']);
    Route::get('/files/{id}/download', [ProjectFileController::class, 'download']);

    Route::get('/activities', [ActivityController::class, 'index']);
    
    //client
    Route::post('/projects/{id}/pay', [PaymentController::class, 'pay']);
    Route::get('/client/payments', [PaymentController::class, 'clientPayments']);

    // freelancer
    Route::get('/freelancer/payments', [PaymentController::class, 'freelancerPayments']);

    //freelancer dashboard
    Route::get('/freelancer/dashboard', [FreelancerDashboardController::class, 'overview']);

    
    // Earnings
    Route::get('/freelancer/earnings', [PaymentController::class, 'earnings']);
    Route::get('/freelancer/earnings/total', [PaymentController::class, 'totalEarnings']);

    // Withdrawals
   Route::post('/freelancer/withdraw', [WithdrawalController::class, 'withdraw']);
    Route::get('/freelancer/withdrawals', [WithdrawalController::class, 'history']);

    // Transactions
    Route::get('/freelancer/transactions', [TransactionController::class, 'index']);
    Route::get('/freelancer/transactions/summary', [TransactionController::class, 'summary']);


    // Client dashboard
    Route::get('/client/dashboard', [ClientDashboardController::class, 'index']);
     Route::get('/client/projects', [ClientProjectController::class, 'index']);
    Route::get('/client/projects/{id}', [ClientProjectController::class, 'show']);
     Route::get('/client/billing/overview', [ClientBillingController::class, 'overview']);
    Route::get('/client/payments', [ClientBillingController::class, 'payments']);
    Route::get('/client/invoices', [InvoiceController::class, 'index']);
    Route::get('/client/invoices/{id}', [InvoiceController::class, 'show']);
    Route::get('/client/reports/summary', [ClientReportController::class, 'summary']);
    Route::get('/client/reports/analytics', [ClientReportController::class, 'analytics']);
    Route::get('/client/activity-log', [ActivityController::class, 'index']);

    Route::get('/client/settings', [ClientSettingsController::class, 'show']);
    Route::put('/client/profile', [ClientSettingsController::class, 'updateProfile']);
    Route::put('/client/settings', [ClientSettingsController::class, 'updateSettings']);
    Route::put('/client/password', [ClientSettingsController::class, 'updatePassword']);
});