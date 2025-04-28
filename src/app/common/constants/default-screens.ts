import { BlockTypeEnum } from "src/app/ui/constructor-distribution/enums/block-type.enum";
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

export const SCREEN_REVIEW: Screen = {
  id: '',
  title: '',
  button_text: 'Отправить',
  parameters: {
    title: 'Как вам прогулка?',
    text: '',
  },
  type: 'review',
};

export const SCREEN_FINISH: Screen = {
  id: '',
  title: '',
  button_text: 'До встречи!',
  parameters: {
    title: 'Спасибо!',
    text: '',
  },
  blocks: [
    {
      "id": "7869dbf0-5c8f-489c-b032-d5acc3253f52",
      "type": BlockTypeEnum.IMAGE,
      "content": "/uploads/images/1745402773152-final-spb.jpg",
      "created_at": "2025-04-23T10:06:13.000Z",
      "updated_at": "2025-04-23T10:06:13.000Z",
      "title": "final_spb"
    },
  ],
  type: 'start',
};
