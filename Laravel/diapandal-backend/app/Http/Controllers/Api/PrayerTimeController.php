<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\PrayerTimeService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class PrayerTimeController extends Controller
{
    private $prayerTimeService;

    public function __construct(PrayerTimeService $prayerTimeService)
    {
        $this->prayerTimeService = $prayerTimeService;
    }

    /**
     * @OA\Get(
     *     path="/api/prayer-times/today",
     *     summary="Horaires de prière du jour",
     *     tags={"Prayer Times"},
     *     @OA\Parameter(
     *         name="city",
     *         in="query",
     *         required=false,
     *         @OA\Schema(type="string", default="Paris")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Succès"
     *     )
     * )
     */
    public function today(Request $request)
    {
        $city = $request->get('city', 'Touba');
        
        $prayerTimes = Cache::remember("prayer_times_{$city}_today", 3600, function () use ($city) {
            return $this->prayerTimeService->getTodayPrayerTimes($city);
        });

        if (!$prayerTimes) {
            return response()->json([
                'error' => 'Impossible de récupérer les horaires de prière'
            ], 500);
        }

        return response()->json($prayerTimes);
    }

    /**
     * @OA\Get(
     *     path="/api/prayer-times/weekly",
     *     summary="Horaires de prière de la semaine",
     *     tags={"Prayer Times"},
     *     @OA\Parameter(
     *         name="city",
     *         in="query",
     *         required=false,
     *         @OA\Schema(type="string", default="Paris")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Succès"
     *     )
     * )
     */
    public function weekly(Request $request)
    {
        $city = $request->get('city', 'Touba');
        
        $prayerTimes = Cache::remember("prayer_times_{$city}_weekly", 86400, function () use ($city) {
            return $this->prayerTimeService->getWeeklyPrayerTimes($city);
        });

        return response()->json($prayerTimes);
    }

    /**
     * @OA\Get(
     *     path="/api/prayer-times/current",
     *     summary="Information sur la prière actuelle",
     *     tags={"Prayer Times"},
     *     @OA\Parameter(
     *         name="city",
     *         in="query",
     *         required=false,
     *         @OA\Schema(type="string", default="Paris")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Succès"
     *     )
     * )
     */
    public function current(Request $request)
    {
        $city = $request->get('city', 'Touba');
        
        $currentInfo = Cache::remember("prayer_times_{$city}_current", 60, function () use ($city) {
            return $this->prayerTimeService->getCurrentPrayerInfo($city);
        });

        if (!$currentInfo) {
            return response()->json([
                'error' => 'Impossible de récupérer les informations actuelles'
            ], 500);
        }

        return response()->json($currentInfo);
    }

    /**
     * @OA\Get(
     *     path="/api/prayer-times/cities",
     *     summary="Liste des villes disponibles",
     *     tags={"Prayer Times"},
     *     @OA\Response(
     *         response=200,
     *         description="Succès"
     *     )
     * )
     */
    public function cities()
    {
        $cities = [
            'Touba', 'Dakar', 'Diourbel', 'Saint Louis', 'Thies', 
            'Matam', 'Bambey', 'Rufisque', 'Ziguinchor', 'Louga'
        ];

        return response()->json($cities);
    }
}