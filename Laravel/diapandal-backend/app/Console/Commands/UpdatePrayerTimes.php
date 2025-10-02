<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Services\PrayerTimeService;
use App\Models\PrayerTime;

class UpdatePrayerTimes extends Command
{
    protected $signature = 'prayer-times:update 
                            {city? : Ville pour les horaires (défaut: Touba)}
                            {--days=7 : Nombre de jours à mettre à jour}
                            {--force : Forcer la mise à jour même si existe déjà}
                            {--country=Senegal : Pays pour la recherche}';

    protected $description = 'Mettre à jour les horaires de prière dans la base de données';

    public function handle(PrayerTimeService $prayerTimeService)
    {
        $city = $this->argument('city') ?: 'Touba';
        $days = (int) $this->option('days');
        $force = $this->option('force');
        $country = $this->option('country');
        $method = 12; // Méthode UOIF

        $this->info("🕌 Mise à jour des horaires de prière pour {$city}, {$country} sur {$days} jours...");

        $bar = $this->output->createProgressBar($days);
        $bar->start();

        $updatedCount = 0;
        $skippedCount = 0;
        $errorCount = 0;

        for ($i = 0; $i < $days; $i++) {
            $date = now()->addDays($i)->format('Y-m-d');
            
            // Vérifier si l'entrée existe déjà (sauf si --force)
            if (!$force && PrayerTime::where('date', $date)->where('city', $city)->exists()) {
                $skippedCount++;
                $bar->advance();
                continue;
            }

            try {
                $prayerTimeData = $prayerTimeService->fetchPrayerTimeData($city, $country, $method, $date);
                
                if ($prayerTimeData) {
                    PrayerTime::updateOrCreate(
                        [
                            'date' => $date,
                            'city' => $city
                        ],
                        $prayerTimeData
                    );
                    $updatedCount++;
                    $this->line(" ✅ {$date} mis à jour");
                } else {
                    $errorCount++;
                    $this->error(" ❌ {$date} erreur de récupération");
                }
            } catch (\Exception $e) {
                $errorCount++;
                $this->error(" ❌ {$date}: " . $e->getMessage());
            }

            $bar->advance();
            
            // Petite pause pour ne pas surcharger l'API
            if ($i < $days - 1) {
                sleep(1);
            }
        }

        $bar->finish();
        $this->newLine();

        $this->info("✅ Mise à jour terminée !");
        $this->info("📊 Statistiques:");
        $this->info("   - Jours mis à jour: {$updatedCount}");
        $this->info("   - Jours ignorés: {$skippedCount}");
        $this->info("   - Erreurs: {$errorCount}");
        $this->info("   - Total traité: {$days} jours");
        
        if ($errorCount > 0) {
            $this->error("⚠️  Certaines dates ont eu des erreurs. Vérifiez les logs.");
        }
    }
}