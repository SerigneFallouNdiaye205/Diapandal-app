<?php

namespace App\Services;

use App\Models\PrayerTime;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use Carbon\Carbon;

class PrayerTimeService
{
    private $apiUrl = 'http://api.aladhan.com/v1/timingsByAddress';

    public function getTodayPrayerTimes($city = 'Touba', $country = 'Senegal', $method = 12)
    {
        $today = now()->format('Y-m-d');
        
        // Vérifier si les horaires sont déjà en base
        $existingPrayerTime = PrayerTime::forCity($city)
            ->forDate($today)
            ->first();

        if ($existingPrayerTime) {
            return $existingPrayerTime;
        }

        // Sinon, récupérer via l'API
        $apiData = $this->fetchFromAPI($city, $country, $method, $today);
        
        if ($apiData) {
            return PrayerTime::create($apiData);
        }

        return null;
    }

    public function getWeeklyPrayerTimes($city = 'Touba', $country = 'Senegal', $method = 12)
    {
        $weeklyTimes = [];
        
        for ($i = 0; $i < 7; $i++) {
            $date = now()->addDays($i)->format('Y-m-d');
            
            $prayerTime = PrayerTime::forCity($city)
                ->forDate($date)
                ->first();

            if (!$prayerTime) {
                $apiData = $this->fetchFromAPI($city, $country, $method, $date);
                if ($apiData) {
                    $prayerTime = PrayerTime::create($apiData);
                }
            }

            if ($prayerTime) {
                $weeklyTimes[] = $prayerTime;
            }
        }

        return $weeklyTimes;
    }

    public function fetchFromAPI($city, $country, $method, $date)
    {
        $apiDate = Carbon::parse($date)->format('d-m-Y');
        
        $response = Http::timeout(30)->get($this->apiUrl, [
            'address' => $city . ',' . $country,
            'method' => $method,
            'date' => $apiDate
        ]);

        if ($response->successful()) {
            $data = $response->json();
            $timings = $data['data']['timings'];
            
            return [
                'date' => $date,
                'hijri_date' => $data['data']['date']['hijri']['date'],
                'fajr' => $this->cleanTime($timings['Fajr']),
                'sunrise' => $this->cleanTime($timings['Sunrise']),
                'dhuhr' => $this->cleanTime($timings['Dhuhr']),
                'asr' => $this->cleanTime($timings['Asr']),
                'maghrib' => $this->cleanTime($timings['Maghrib']),
                'isha' => $this->cleanTime($timings['Isha']),
                'city' => $city,
                'calculation_method' => 'UOIF'
            ];
        }

        throw new \Exception("Erreur API pour la date: {$date} - Ville: {$city}");
    }

    /**
     * Méthode spéciale pour la commande qui gère mieux les erreurs
     */
    public function fetchPrayerTimeData($city, $country, $method, $date)
    {
        try {
            return $this->fetchFromAPI($city, $country, $method, $date);
        } catch (\Exception $e) {
            // Log l'erreur mais ne bloque pas l'exécution
            logger()->error("Erreur récupération horaires: " . $e->getMessage());
            return null;
        }
    }

    private function cleanTime($time)
    {
        return substr($time, 0, 5); // Retirer la partie timezone
    }

    public function getCurrentPrayerInfo($city = 'Touba')
    {
        $todayPrayerTime = $this->getTodayPrayerTimes($city);
        
        if (!$todayPrayerTime) {
            return null;
        }

        $currentTime = now()->format('H:i');
        
        $prayers = [
            'Fajr' => $todayPrayerTime->fajr,
            'Sunrise' => $todayPrayerTime->sunrise,
            'Dhuhr' => $todayPrayerTime->dhuhr,
            'Asr' => $todayPrayerTime->asr,
            'Maghrib' => $todayPrayerTime->maghrib,
            'Isha' => $todayPrayerTime->isha,
        ];

        return $this->calculateCurrentPrayer($prayers, $currentTime, $todayPrayerTime);
    }

    private function calculateCurrentPrayer($prayers, $currentTime, $todayPrayerTime)
    {
        $currentPrayer = null;
        $nextPrayer = null;
        
        foreach ($prayers as $name => $time) {
            if ($currentTime < $time) {
                $nextPrayer = [
                    'name' => $name,
                    'time' => $time,
                    'remaining' => $this->calculateTimeDifference($currentTime, $time)
                ];
                break;
            }
            $currentPrayer = $name;
        }

        // Si pas de prochaine prière trouvée, c'est que la prochaine est Fajr du lendemain
        if (!$nextPrayer) {
            $tomorrowPrayerTime = $this->getTodayPrayerTimes(
                $todayPrayerTime->city, 
                'Senegal', 
                12, 
                now()->addDay()->format('Y-m-d')
            );
            
            if ($tomorrowPrayerTime) {
                $nextPrayer = [
                    'name' => 'Fajr',
                    'time' => $tomorrowPrayerTime->fajr,
                    'remaining' => $this->calculateTimeDifference($currentTime, $tomorrowPrayerTime->fajr, true)
                ];
            }
        }

        return [
            'current_time' => $currentTime,
            'today' => $todayPrayerTime,
            'current_prayer' => $currentPrayer,
            'next_prayer' => $nextPrayer
        ];
    }

    private function calculateTimeDifference($current, $prayerTime, $nextDay = false)
    {
        $current = Carbon::parse( $current);
        $prayer = Carbon::parse($prayerTime);
        
        if ($nextDay || $prayer->lessThan($current)) {
            $prayer->addDay();
        }
        
        $diff = $current->diff($prayer);
        return sprintf('%02d:%02d', $diff->h, $diff->i);
    }
}