import { Screen } from "../interfaces/screen.interface";

export const BEFORE_EMAIL: Screen = {
  id: '',
  title: '',
  button_text: 'Хочу продолжить',
  parameters: {
    title: 'Готовы разблокировать полный квест?',
    text: 'Сохраните прогресс и получите доступ к эксклюзивному контенту!',
    statement: 'Что внутри полного квеста? Вы прошли {free_screens_count} экранов. Вас ждёт ещё {paid_screens_count} экранов из {screens_count}. Впереди новые локации, музыка и загадки',
  },
  type: 'wyg',
};

export const SCREEN_EMAIL: Screen = {
    id: '',
    title: '',
    type: 'email',
    button_text: 'Вперёд',
    parameters: {
      title: 'Введите email',
    },
};

export const BEFORE_PAY: Screen = {
  id: '',
  title: '',
  button_text: 'Хочу продолжить',
  parameters: {
    title: 'Готовы разблокировать полный квест?',
    text: 'Сохраните прогресс и получите доступ к эксклюзивному контенту!',
    statement: 'Что внутри полного квеста? Вы прошли {free_screens_count} экранов. Вас ждёт ещё {paid_screens_count} экранов из {screens_count}. Впереди новые локации, музыка и загадки',
  },
  type: 'wyg',
};

export const SCREEN_PAY: Screen = {
  id: '',
  title: '',
  button_text: 'Получить сейчас',
  parameters: {
    title: 'Разблокируйте ещё <br> {paid_screens_count} экранов из {screens_count}',
    text: '',
  },
  type: 'pay',
};
