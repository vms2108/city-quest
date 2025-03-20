import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminModule } from './admin.module';
import { AdminQuestComponent } from './components/quest/admin-quest.component';
import { AdminScreenComponent } from './components/screen/admin-screen.component';
import { AdminBlockComponent } from './components/block/admin-block.component';
import { AdminCityComponent } from './components/city/admin-city.component';

export const routes: Routes = [
  {
    path: 'quests', // Список квестов
    component: AdminQuestComponent,
  },
  {
    path: 'quests/:id', // Редактирование конкретного квеста
    component: AdminQuestComponent,
  },
  {
    path: 'screens', // Список экранов
    component: AdminScreenComponent,
  },
  {
    path: 'screens/:id', // Редактирование конкретного экрана
    component: AdminScreenComponent,
  },
  {
    path: 'blocks', // Список блоков
    component: AdminBlockComponent,
  },
  {
    path: 'blocks/:id', // Редактирование конкретного блока
    component: AdminBlockComponent,
  },
  {
    path: 'cities', // Список городов
    component: AdminCityComponent,
  },
  {
    path: 'cities/:id', // Редактирование конкретного города
    component: AdminCityComponent,
  },
  {
    path: '', // По умолчанию перенаправляем на список квестов
    redirectTo: 'quests',
    pathMatch: 'full',
  },
  {
    path: '**', // Любые несуществующие пути перенаправляем на квесты
    redirectTo: 'quests',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    AdminModule, // Импортируем AdminModule
    RouterModule.forChild(routes), // Используем forChild для модульного роутинга
  ],
  exports: [RouterModule], // Экспортируем RouterModule для использования в AdminModule
})
export class AdminRoutingModule {}