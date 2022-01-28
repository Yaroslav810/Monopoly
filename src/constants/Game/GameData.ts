import {CardsType, MapFieldType, PropertyType, SpecialActionType} from "./types"

type PropertyMapField = {
    type: MapFieldType.PROPERTY
    payload: {
        type: PropertyType.STREET
    } | {
        type: PropertyType.RAILWAY_STATION
    } | {
        type: PropertyType.MUNICIPAL_SERVICE
    }
}

type CardsMapField = {
    type: MapFieldType.CARDS
    payload: {
        type: CardsType.PUBLIC_TREASURE
    } | {
        type: CardsType.CHANCE
    }
}

type SpecialActionMapField = {
    type: MapFieldType.SPECIAL_ACTION
    payload: {
        type: SpecialActionType.BEGINNING
    } | {
        type: SpecialActionType.EMPTINESS
    } | {
        type: SpecialActionType.MOVING_TO
        fieldId: number
    }
}

type TaxMapField = {
    type: MapFieldType.TAX
    amount: number
}

type PrisonMapField = {
    type: MapFieldType.PRISON
}

type PayloadMapField = PropertyMapField | CardsMapField | SpecialActionMapField | TaxMapField | PrisonMapField

type MapField = {
    id: number
    payload: PayloadMapField
}

type MunicipalServiceProperty = {
    type: PropertyType.MUNICIPAL_SERVICE
    rentBase: number
    rentImproved: number
}

type RailwayProperty = {
    type: PropertyType.RAILWAY_STATION
    rentFirstLevel: number
    rentSecondLevel: number
    rentThirdLevel: number
    rentFourthLevel: number
}

type StreetProperty = {
    type: PropertyType.STREET
    rentBase: number
    rentImproved: number
    rentFirstLevel: number
    rentSecondLevel: number
    rentThirdLevel: number
    rentFourthLevel: number
    rentFiveLevel: number
    priceHouse: number
    priceHotel: number
}

type PayloadProperty = StreetProperty | RailwayProperty | MunicipalServiceProperty

type Property = {
    id: number
    buy: number
    groupId: number
    deposit: number
    mapFieldId: number
    payload: PayloadProperty
}

export type ChanceCardType = {id: number}
export type PublicTreasureCardType = {id: number}

export class GameData {
    static readonly MIN_NUMBER_PLAYER = 2
    static readonly MAX_NUMBER_PLAYER = 6
    static readonly MAP: Array<MapField> = [
        // Старт
        {
            id: 1,
            payload: {
                type: MapFieldType.SPECIAL_ACTION,
                payload: {
                    type: SpecialActionType.BEGINNING
                }
            }
        },
        // Житная улица
        {
            id: 2,
            payload: {
                type: MapFieldType.PROPERTY,
                payload: {
                    type: PropertyType.STREET
                }
            }
        },
        // Общественная казна
        {
            id: 3,
            payload: {
                type: MapFieldType.CARDS,
                payload: {
                    type: CardsType.PUBLIC_TREASURE
                }
            }
        },
        // Нагатинская улица
        {
            id: 4,
            payload: {
                type: MapFieldType.PROPERTY,
                payload: {
                    type: PropertyType.STREET
                }
            }
        },
        // Налог
        {
            id: 5,
            payload: {
                type: MapFieldType.TAX,
                amount: 200
            }
        },
        // Рижская Железная Дорога
        {
            id: 6,
            payload: {
                type: MapFieldType.PROPERTY,
                payload: {
                    type: PropertyType.RAILWAY_STATION
                }
            }
        },
        // Варшавское шоссе
        {
            id: 7,
            payload: {
                type: MapFieldType.PROPERTY,
                payload: {
                    type: PropertyType.STREET
                }
            }
        },
        // Шанс
        {
            id: 8,
            payload: {
                type: MapFieldType.CARDS,
                payload: {
                    type: CardsType.CHANCE
                }
            }
        },
        // Улица Огарева
        {
            id: 9,
            payload: {
                type: MapFieldType.PROPERTY,
                payload: {
                    type: PropertyType.STREET
                }
            }
        },
        // Первая парковая улица
        {
            id: 10,
            payload: {
                type: MapFieldType.PROPERTY,
                payload: {
                    type: PropertyType.STREET
                }
            }
        },
        // Тюрьма
        {
            id: 11,
            payload: {
                type: MapFieldType.PRISON
            }
        },
        // Улица Полянка
        {
            id: 12,
            payload: {
                type: MapFieldType.PROPERTY,
                payload: {
                    type: PropertyType.STREET
                }
            }
        },
        // Электростанция
        {
            id: 13,
            payload: {
                type: MapFieldType.PROPERTY,
                payload: {
                    type: PropertyType.MUNICIPAL_SERVICE
                }
            }
        },
        // Улица Сретенка
        {
            id: 14,
            payload: {
                type: MapFieldType.PROPERTY,
                payload: {
                    type: PropertyType.STREET
                }
            }
        },
        // Ростовская набережная
        {
            id: 15,
            payload: {
                type: MapFieldType.PROPERTY,
                payload: {
                    type: PropertyType.STREET
                }
            }
        },
        // Курская Железная Дорога
        {
            id: 16,
            payload: {
                type: MapFieldType.PROPERTY,
                payload: {
                    type: PropertyType.RAILWAY_STATION
                }
            }
        },
        // Рязанский проспект
        {
            id: 17,
            payload: {
                type: MapFieldType.PROPERTY,
                payload: {
                    type: PropertyType.STREET
                }
            }
        },
        // Общественная казна
        {
            id: 18,
            payload: {
                type: MapFieldType.CARDS,
                payload: {
                    type: CardsType.PUBLIC_TREASURE
                }
            }
        },
        // Улица Вавилова
        {
            id: 19,
            payload: {
                type: MapFieldType.PROPERTY,
                payload: {
                    type: PropertyType.STREET
                }
            }
        },
        // Рублёвское шоссе
        {
            id: 20,
            payload: {
                type: MapFieldType.PROPERTY,
                payload: {
                    type: PropertyType.STREET
                }
            }
        },
        // Бесплатная стоянка
        {
            id: 21,
            payload: {
                type: MapFieldType.SPECIAL_ACTION,
                payload: {
                    type: SpecialActionType.EMPTINESS
                }
            }
        },
        // Улица Тверская
        {
            id: 22,
            payload: {
                type: MapFieldType.PROPERTY,
                payload: {
                    type: PropertyType.STREET
                }
            }
        },
        // Шанс
        {
            id: 23,
            payload: {
                type: MapFieldType.CARDS,
                payload: {
                    type: CardsType.CHANCE
                }
            }
        },
        // Пушкинская улица
        {
            id: 24,
            payload: {
                type: MapFieldType.PROPERTY,
                payload: {
                    type: PropertyType.STREET
                }
            }
        },
        // Площадь Маяковского
        {
            id: 25,
            payload: {
                type: MapFieldType.PROPERTY,
                payload: {
                    type: PropertyType.STREET
                }
            }
        },
        // Казанская Железная Дорога
        {
            id: 26,
            payload: {
                type: MapFieldType.PROPERTY,
                payload: {
                    type: PropertyType.RAILWAY_STATION
                }
            }
        },
        // Улица Грузинский Вал
        {
            id: 27,
            payload: {
                type: MapFieldType.PROPERTY,
                payload: {
                    type: PropertyType.STREET
                }
            }
        },
        // Улица Чайковского
        {
            id: 28,
            payload: {
                type: MapFieldType.PROPERTY,
                payload: {
                    type: PropertyType.STREET
                }
            }
        },
        // Водопровод
        {
            id: 29,
            payload: {
                type: MapFieldType.PROPERTY,
                payload: {
                    type: PropertyType.MUNICIPAL_SERVICE
                }
            }
        },
        // Смоленская площадь
        {
            id: 30,
            payload: {
                type: MapFieldType.PROPERTY,
                payload: {
                    type: PropertyType.STREET
                }
            }
        },
        // Отправление в тюрьму
        {
            id: 31,
            payload: {
                type: MapFieldType.SPECIAL_ACTION,
                payload: {
                    type: SpecialActionType.MOVING_TO,
                    fieldId: 11
                }
            }
        },
        // Улица Щусева
        {
            id: 32,
            payload: {
                type: MapFieldType.PROPERTY,
                payload: {
                    type: PropertyType.STREET
                }
            }
        },
        // Гоголевский бульвар
        {
            id: 33,
            payload: {
                type: MapFieldType.PROPERTY,
                payload: {
                    type: PropertyType.STREET
                }
            }
        },
        // Общественная казна
        {
            id: 34,
            payload: {
                type: MapFieldType.CARDS,
                payload: {
                    type: CardsType.PUBLIC_TREASURE
                }
            }
        },
        // Кутузовский проспект
        {
            id: 35,
            payload: {
                type: MapFieldType.PROPERTY,
                payload: {
                    type: PropertyType.STREET
                }
            }
        },
        // Ленинградская Железная Дорога
        {
            id: 36,
            payload: {
                type: MapFieldType.PROPERTY,
                payload: {
                    type: PropertyType.RAILWAY_STATION
                }
            }
        },
        // Шанс
        {
            id: 37,
            payload: {
                type: MapFieldType.CARDS,
                payload: {
                    type: CardsType.CHANCE
                }
            }
        },
        // Улица Малая Бронная
        {
            id: 38,
            payload: {
                type: MapFieldType.PROPERTY,
                payload: {
                    type: PropertyType.STREET
                }
            }
        },
        // Сверхналог
        {
            id: 39,
            payload: {
                type: MapFieldType.TAX,
                amount: 100
            }
        },
        // Улица Арбат
        {
            id: 40,
            payload: {
                type: MapFieldType.PROPERTY,
                payload: {
                    type: PropertyType.STREET
                }
            }
        }
    ]
    static readonly PROPERTY: Array<Property> = [
        // Житная улица
        {
            id: 1,
            buy: 60,
            groupId: 1,
            deposit: 30,
            mapFieldId: 2,
            payload: {
                type: PropertyType.STREET,
                rentBase: 2,
                rentImproved: 4,
                rentFirstLevel: 10,
                rentSecondLevel: 30,
                rentThirdLevel: 90,
                rentFourthLevel: 160,
                rentFiveLevel: 250,
                priceHouse: 50,
                priceHotel: 50
            }
        },
        // Нагатинская улица
        {
            id: 2,
            buy: 60,
            groupId: 1,
            deposit: 30,
            mapFieldId: 4,
            payload: {
                type: PropertyType.STREET,
                rentBase: 4,
                rentImproved: 8,
                rentFirstLevel: 20,
                rentSecondLevel: 60,
                rentThirdLevel: 180,
                rentFourthLevel: 320,
                rentFiveLevel: 450,
                priceHouse: 50,
                priceHotel: 50
            }
        },
        // Рижская Железная Дорога
        {
            id: 3,
            buy: 200,
            groupId: 2,
            deposit: 100,
            mapFieldId: 6,
            payload: {
                type: PropertyType.RAILWAY_STATION,
                rentFirstLevel: 25,
                rentSecondLevel: 50,
                rentThirdLevel: 100,
                rentFourthLevel: 200
            }
        },
        // Варшавское шоссе
        {
            id: 4,
            buy: 100,
            groupId: 3,
            deposit: 50,
            mapFieldId: 7,
            payload: {
                type: PropertyType.STREET,
                rentBase: 6,
                rentImproved: 12,
                rentFirstLevel: 30,
                rentSecondLevel: 90,
                rentThirdLevel: 270,
                rentFourthLevel: 400,
                rentFiveLevel: 550,
                priceHouse: 50,
                priceHotel: 50
            }
        },
        // Улица Огарева
        {
            id: 5,
            buy: 100,
            groupId: 3,
            deposit: 50,
            mapFieldId: 9,
            payload: {
                type: PropertyType.STREET,
                rentBase: 6,
                rentImproved: 12,
                rentFirstLevel: 30,
                rentSecondLevel: 90,
                rentThirdLevel: 270,
                rentFourthLevel: 400,
                rentFiveLevel: 550,
                priceHouse: 50,
                priceHotel: 50
            }
        },
        // Первая парковая улица
        {
            id: 6,
            buy: 120,
            groupId: 3,
            deposit: 60,
            mapFieldId: 10,
            payload: {
                type: PropertyType.STREET,
                rentBase: 8,
                rentImproved: 16,
                rentFirstLevel: 40,
                rentSecondLevel: 100,
                rentThirdLevel: 300,
                rentFourthLevel: 450,
                rentFiveLevel: 600,
                priceHouse: 50,
                priceHotel: 50
            }
        },
        // Улица Полянка
        {
            id: 7,
            buy: 140,
            groupId: 4,
            deposit: 70,
            mapFieldId: 12,
            payload: {
                type: PropertyType.STREET,
                rentBase: 10,
                rentImproved: 20,
                rentFirstLevel: 50,
                rentSecondLevel: 150,
                rentThirdLevel: 450,
                rentFourthLevel: 625,
                rentFiveLevel: 750,
                priceHouse: 100,
                priceHotel: 100
            }
        },
        // Электростанция
        {
            id: 8,
            buy: 150,
            groupId: 6,
            deposit: 75,
            mapFieldId: 13,
            payload: {
                type: PropertyType.MUNICIPAL_SERVICE,
                rentBase: 4,
                rentImproved: 10
            }
        },
        // Улица Сретенка
        {
            id: 9,
            buy: 140,
            groupId: 4,
            deposit: 70,
            mapFieldId: 14,
            payload: {
                type: PropertyType.STREET,
                rentBase: 10,
                rentImproved: 20,
                rentFirstLevel: 50,
                rentSecondLevel: 150,
                rentThirdLevel: 450,
                rentFourthLevel: 625,
                rentFiveLevel: 750,
                priceHouse: 100,
                priceHotel: 100
            }
        },
        // Ростовская набережная
        {
            id: 10,
            buy: 160,
            groupId: 4,
            deposit: 80,
            mapFieldId: 15,
            payload: {
                type: PropertyType.STREET,
                rentBase: 12,
                rentImproved: 24,
                rentFirstLevel: 60,
                rentSecondLevel: 180,
                rentThirdLevel: 500,
                rentFourthLevel: 700,
                rentFiveLevel: 900,
                priceHouse: 100,
                priceHotel: 100
            }
        },
        // Курская Железная Дорога
        {
            id: 11,
            buy: 200,
            groupId: 2,
            deposit: 100,
            mapFieldId: 16,
            payload: {
                type: PropertyType.RAILWAY_STATION,
                rentFirstLevel: 25,
                rentSecondLevel: 50,
                rentThirdLevel: 100,
                rentFourthLevel: 200
            }
        },
        // Рязанский проспект
        {
            id: 12,
            buy: 180,
            groupId: 5,
            deposit: 90,
            mapFieldId: 17,
            payload: {
                type: PropertyType.STREET,
                rentBase: 14,
                rentImproved: 28,
                rentFirstLevel: 70,
                rentSecondLevel: 200,
                rentThirdLevel: 550,
                rentFourthLevel: 750,
                rentFiveLevel: 950,
                priceHouse: 100,
                priceHotel: 100
            }
        },
        // Улица Вавилова
        {
            id: 13,
            buy: 180,
            groupId: 5,
            deposit: 90,
            mapFieldId: 19,
            payload: {
                type: PropertyType.STREET,
                rentBase: 14,
                rentImproved: 28,
                rentFirstLevel: 70,
                rentSecondLevel: 200,
                rentThirdLevel: 550,
                rentFourthLevel: 750,
                rentFiveLevel: 950,
                priceHouse: 100,
                priceHotel: 100
            }
        },
        // Рублёвское шоссе
        {
            id: 14,
            buy: 200,
            groupId: 5,
            deposit: 90,
            mapFieldId: 20,
            payload: {
                type: PropertyType.STREET,
                rentBase: 16,
                rentImproved: 32,
                rentFirstLevel: 80,
                rentSecondLevel: 220,
                rentThirdLevel: 600,
                rentFourthLevel: 800,
                rentFiveLevel: 1000,
                priceHouse: 100,
                priceHotel: 100
            }
        },
        // Улица Тверская
        {
            id: 15,
            buy: 220,
            groupId: 7,
            deposit: 110,
            mapFieldId: 22,
            payload: {
                type: PropertyType.STREET,
                rentBase: 18,
                rentImproved: 36,
                rentFirstLevel: 90,
                rentSecondLevel: 250,
                rentThirdLevel: 700,
                rentFourthLevel: 875,
                rentFiveLevel: 1050,
                priceHouse: 150,
                priceHotel: 150
            }
        },
        // Пушкинская улица
        {
            id: 16,
            buy: 220,
            groupId: 7,
            deposit: 110,
            mapFieldId: 24,
            payload: {
                type: PropertyType.STREET,
                rentBase: 18,
                rentImproved: 36,
                rentFirstLevel: 90,
                rentSecondLevel: 250,
                rentThirdLevel: 700,
                rentFourthLevel: 875,
                rentFiveLevel: 1050,
                priceHouse: 150,
                priceHotel: 150
            }
        },
        // Площадь Маяковского
        {
            id: 17,
            buy: 240,
            groupId: 7,
            deposit: 120,
            mapFieldId: 25,
            payload: {
                type: PropertyType.STREET,
                rentBase: 20,
                rentImproved: 40,
                rentFirstLevel: 100,
                rentSecondLevel: 300,
                rentThirdLevel: 750,
                rentFourthLevel: 925,
                rentFiveLevel: 1100,
                priceHouse: 150,
                priceHotel: 150
            }
        },
        // Казанская Железная Дорога
        {
            id: 18,
            buy: 200,
            groupId: 2,
            deposit: 100,
            mapFieldId: 26,
            payload: {
                type: PropertyType.RAILWAY_STATION,
                rentFirstLevel: 25,
                rentSecondLevel: 50,
                rentThirdLevel: 100,
                rentFourthLevel: 200
            }
        },
        // Улица Грузинский Вал
        {
            id: 19,
            buy: 260,
            groupId: 8,
            deposit: 130,
            mapFieldId: 27,
            payload: {
                type: PropertyType.STREET,
                rentBase: 22,
                rentImproved: 44,
                rentFirstLevel: 110,
                rentSecondLevel: 330,
                rentThirdLevel: 800,
                rentFourthLevel: 975,
                rentFiveLevel: 1150,
                priceHouse: 150,
                priceHotel: 150
            }
        },
        // Улица Чайковского
        {
            id: 20,
            buy: 260,
            groupId: 8,
            deposit: 130,
            mapFieldId: 28,
            payload: {
                type: PropertyType.STREET,
                rentBase: 22,
                rentImproved: 44,
                rentFirstLevel: 110,
                rentSecondLevel: 330,
                rentThirdLevel: 800,
                rentFourthLevel: 975,
                rentFiveLevel: 1150,
                priceHouse: 150,
                priceHotel: 150
            }
        },
        // Водопровод
        {
            id: 21,
            buy: 150,
            groupId: 6,
            deposit: 75,
            mapFieldId: 29,
            payload: {
                type: PropertyType.MUNICIPAL_SERVICE,
                rentBase: 4,
                rentImproved: 10
            }
        },
        // Смоленская площадь
        {
            id: 22,
            buy: 280,
            groupId: 8,
            deposit: 140,
            mapFieldId: 30,
            payload: {
                type: PropertyType.STREET,
                rentBase: 24,
                rentImproved: 48,
                rentFirstLevel: 120,
                rentSecondLevel: 360,
                rentThirdLevel: 850,
                rentFourthLevel: 1025,
                rentFiveLevel: 1200,
                priceHouse: 150,
                priceHotel: 150
            }
        },
        // Улица Щусева
        {
            id: 23,
            buy: 300,
            groupId: 9,
            deposit: 150,
            mapFieldId: 32,
            payload: {
                type: PropertyType.STREET,
                rentBase: 26,
                rentImproved: 52,
                rentFirstLevel: 130,
                rentSecondLevel: 390,
                rentThirdLevel: 900,
                rentFourthLevel: 1100,
                rentFiveLevel: 1275,
                priceHouse: 200,
                priceHotel: 200
            }
        },
        // Гоголевский бульвар
        {
            id: 24,
            buy: 300,
            groupId: 9,
            deposit: 150,
            mapFieldId: 33,
            payload: {
                type: PropertyType.STREET,
                rentBase: 26,
                rentImproved: 52,
                rentFirstLevel: 130,
                rentSecondLevel: 390,
                rentThirdLevel: 900,
                rentFourthLevel: 1100,
                rentFiveLevel: 1275,
                priceHouse: 200,
                priceHotel: 200
            }
        },
        // Кутузовский проспект
        {
            id: 25,
            buy: 320,
            groupId: 9,
            deposit: 160,
            mapFieldId: 35,
            payload: {
                type: PropertyType.STREET,
                rentBase: 28,
                rentImproved: 56,
                rentFirstLevel: 150,
                rentSecondLevel: 450,
                rentThirdLevel: 1000,
                rentFourthLevel: 1200,
                rentFiveLevel: 1400,
                priceHouse: 200,
                priceHotel: 200
            }
        },
        // Ленинградская Железная Дорога
        {
            id: 26,
            buy: 200,
            groupId: 2,
            deposit: 100,
            mapFieldId: 36,
            payload: {
                type: PropertyType.RAILWAY_STATION,
                rentFirstLevel: 25,
                rentSecondLevel: 50,
                rentThirdLevel: 100,
                rentFourthLevel: 200
            }
        },
        // Улица Малая Бронная
        {
            id: 27,
            buy: 350,
            groupId: 10,
            deposit: 175,
            mapFieldId: 38,
            payload: {
                type: PropertyType.STREET,
                rentBase: 35,
                rentImproved: 70,
                rentFirstLevel: 175,
                rentSecondLevel: 500,
                rentThirdLevel: 1100,
                rentFourthLevel: 1300,
                rentFiveLevel: 1500,
                priceHouse: 200,
                priceHotel: 200
            }
        },
        // Улица Арбат
        {
            id: 28,
            buy: 400,
            groupId: 10,
            deposit: 200,
            mapFieldId: 40,
            payload: {
                type: PropertyType.STREET,
                rentBase: 50,
                rentImproved: 100,
                rentFirstLevel: 200,
                rentSecondLevel: 600,
                rentThirdLevel: 1400,
                rentFourthLevel: 1700,
                rentFiveLevel: 2000,
                priceHouse: 200,
                priceHotel: 200
            }
        }
    ]
    static readonly CHANCE: Array<ChanceCardType> = [
        // Дивиденты банка в размере $50
        {
            id: 1
        },
        // Отправка в тюрьму без прохода Старта
        {
            id: 2
        },
        // Получение $150
        {
            id: 3
        },
        // Капитальный ремонт
        {
            id: 4
        },
        // Каждому по $50
        {
            id: 5
        },
        // Отправление до Рижской Железной дороги
        {
            id: 6
        },
        // Штраф $15
        {
            id: 7
        },
        // Бесплатное освобождение из тюрьмы
        {
            id: 8
        },
        // Отправление на ближайшее комунальное предприятие
        {
            id: 9
        },
        // Отправление на улицу Полянка
        {
            id: 10
        },
        // Отправление на ближайшую ЖД станцию
        {
            id: 11
        },
        // На поле вперёд
        {
            id: 12
        },
        // Отправление до Рижской Железной дороги
        {
            id: 13
        },
        // На три поля назад
        {
            id: 14
        },
        // На улицу Арбат
        {
            id: 15
        },
        // Бесплатное освобождение из тюрьмы
        {
            id: 16
        }
    ]
    static readonly PUBLIC_TREASURE: Array<PublicTreasureCardType> = [
        // Получение $100 по страхованию
        {
            id: 1
        },
        // Получение $100 по наследству
        {
            id: 2
        },
        // Получение $100 по отпускному фонду
        {
            id: 3
        },
        // Возмещение подоходного налога: получение $20
        {
            id: 4
        },
        // Банковская ошибка: получение $200
        {
            id: 5
        },
        // Уличные работы
        {
            id: 6
        },
        // В тюрьму без поля Вперёд
        {
            id: 7
        },
        // Бесплатное освобождение из тюрьмы
        {
            id: 8
        },
        // Отправление на поле Вперёд
        {
            id: 9
        },
        // Расходы $100 на госпитализацию
        {
            id: 10
        },
        // Визит к врачу $50
        {
            id: 11
        },
        // Оплата обучения $50
        {
            id: 12
        },
        // Второе место конкурс красоты $10
        {
            id: 13
        },
        // По $10 от каждого игрока
        {
            id: 14
        },
        // Получение $25 за консалтинговые услуги
        {
            id: 15
        },
        // Получение $100 в наследство
        {
            id: 16
        }
    ]
    static readonly INITIAL_AMOUNT_OF_PLAYERS = 15000
}
