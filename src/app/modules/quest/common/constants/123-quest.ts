import { BlockTypesEnum } from 'src/app/common/enums/block-types.enum';
import { ScreenTypesEnum } from 'src/app/common/enums/screen-types.enum';
import { Quest } from 'src/app/common/models/quest';
import { ScreenBlock } from 'src/app/common/models/screen-block';

export const QUEST_123: Quest = {
  _id: '123',
  link: 'nevskii-prospect',
  name: 'По Невскому проспекту',
  text: '',
  pictureLink: '',
  items: [
    {
      _id: '001',
      type: ScreenTypesEnum.INFO,
      name: 'Дворцовый мост',
      parameters: {
        blocks: [
          new ScreenBlock(BlockTypesEnum.TEXT, `В каких-то городах, я слышал, туристов разводят на деньги.
          Но в Санкт-Петербурге каждую ночь разводят мосты
          `),
          new ScreenBlock(BlockTypesEnum.TEXT, 'В 1909 году за постройку моста взялся Андрей Пшеницкий. Из-за первой мировой постройку завершили только в 1916.'),
          new ScreenBlock(BlockTypesEnum.TEXT, 'Инженер Пшеницкий ошибся при проектировании, из-за этого разведённый мост смотрится негармонично и закрывает собой культурные и исторические памятники.'),
        ],
        answers: [],
        help: '',
      },
    },
    {
      _id: '002',
      type: ScreenTypesEnum.QUESTION_FREE,
      name: '',
      parameters: {
        answers: [
          'Наверх',
          'В небо',
          'Небо',
          'Воздух',
          'Вверх',
        ],
        help: 'Представьте, что вы умеете ходить по вертикальным поверхностям и решили прогуляться по разведённому мосту. В каком направлении вы бы тогда двигались?',
        blocks: [
          new ScreenBlock(BlockTypesEnum.QUESTION, 'Дворцовый мост днём ведёт из Адмиралтейства на Васильевский остров. А куда он ведёт по ночам?', ''),
        ],
      },
    },
    {
      _id: '003',
      name: '',
      type: ScreenTypesEnum.WAY,
      parameters: {
        blocks: [
          new ScreenBlock(BlockTypesEnum.TEXT, 'А теперь давайте выйдем к саду возле адмиралтейства'),
          new ScreenBlock(BlockTypesEnum.PICTURE, '', ''),
          new ScreenBlock(BlockTypesEnum.FACT, 'Строительство Невского проспекта начали еще при Петре I, причем одновременно с двух сторон — от здания Адмиралтейства и от Александро-Невской Лавры. Встретились две команды строителей в районе нынешней площади Восстания. И тут выяснилось, что проспект оказался кривым — с изломом в месте встречи.'),
        ],
        answers: [],
        help: '',
      },
    },
    {
      _id: '004',
      type: ScreenTypesEnum.INFO,
      name: 'Адмиралтейство',
      parameters: {
        blocks: [
          new ScreenBlock(BlockTypesEnum.TEXT, 'Адмиралтейство -  это места для строительства и ремонта военных судов'),
          new ScreenBlock(BlockTypesEnum.TEXT, 'Построено в 1705-1706 годах по чертежам, утвержденных императором Петром I'),
          new ScreenBlock(BlockTypesEnum.TEXT, 'В 1711 году над зданием Адмиралтейства появился знаменитый шпиль, «адмиралтейская игла», увенчанный корабликом, который сегодня считается одним из главных символов Санкт-Петербурга. Первый кораблик установил голландский мастер, и он простоял до 1815 года, пока не был заменен на новый.'),
        ],
        answers: [],
        help: '',
      },
    },
    {
      _id: '005',
      type: ScreenTypesEnum.INFO,
      name: 'Адмиралтейство',
      parameters: {
        blocks: [
          new ScreenBlock(BlockTypesEnum.TEXT, 'Строительство кораблей на Адмиралтейской верфи продолжалось до 1844 года, позже здесь размещались Морское министерство, Главный морской штаб. После революции 1917 года в здании находились Центрофлот, Военно-морской революционный комитет, Высшее военно-морское училище имени Дзержинского, штаб Краснознаменной Ленинградской военно-морской базы и, наконец, с 2012 года — Главный штаб ВМФ России.'),
          new ScreenBlock(BlockTypesEnum.TEXT, 'Здание по прежнему венчает золочёный кораблик, который является символом города. Говорят, что в шаре под корабликом послание потомкам.'),
          new ScreenBlock(BlockTypesEnum.TEXT, 'Если Вы стоите лицом к Адмиралтейству, справа от Вас будет Дворцовая площадь, а слева — Исаакиевский собор'),
        ],
        answers: [],
        help: '',
      },
    },
    {
      _id: '006',
      type: ScreenTypesEnum.QUESTION_FREE,
      name: '',
      parameters: {
        answers: ['Игла'],
        help: 'Ответ кроется на одном из предыдущих экранов',
        blocks: [
          new ScreenBlock(BlockTypesEnum.QUESTION_IN_VERSE, `Пётр  учредил чертёж
          <br>
          Работа быстро к окончанию подошла
          <br>
          Поставить шпиль хотелось невтерпёж
          <br>
          Шпиль прозовут “адмиралтейская ...`),
        ],
      },
    },
    {
      _id: '007',
      name: '',
      type: ScreenTypesEnum.WAY,
      parameters: {
        blocks: [
          new ScreenBlock(BlockTypesEnum.TEXT, 'Направимся к набережной реки Мойки'),
          new ScreenBlock(BlockTypesEnum.PICTURE, '', ''),
          new ScreenBlock(BlockTypesEnum.FACT, 'Метро в Санкт-Петербурге – одно из самых глубоких в мире. Туннели пролегают на глубине 70–80 метров. Самой глубокой станцией в петербургском метрополитене является «Адмиралтейская», ее глубина составляет около 86 метров.'),
          new ScreenBlock(BlockTypesEnum.TEXT, 'Но местные жители не сильно рады глубине метро. И их можно понять. Не каждый захотел бы тратить по 5-10 минут в день, стоя на эскалаторе'),
        ],
        answers: [],
        help: '',
      },
    },
  ],
};
